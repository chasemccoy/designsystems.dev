var app = (function(exports) {
  'use strict';

  function noop() {}
  function add_location(element, file, line, column, char) {
    element.__svelte_meta = {
      loc: { file, line, column, char },
    };
  }
  function run(fn) {
    return fn();
  }
  function blank_object() {
    return Object.create(null);
  }
  function run_all(fns) {
    fns.forEach(run);
  }
  function is_function(thing) {
    return typeof thing === 'function';
  }
  function safe_not_equal(a, b) {
    return a != a
      ? b == b
      : a !== b || (a && typeof a === 'object') || typeof a === 'function';
  }

  function append(target, node) {
    target.appendChild(node);
  }
  function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
  }
  function detach(node) {
    node.parentNode.removeChild(node);
  }
  function element(name) {
    return document.createElement(name);
  }
  function text(data) {
    return document.createTextNode(data);
  }
  function space() {
    return text(' ');
  }
  function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
  }
  function children(element) {
    return Array.from(element.childNodes);
  }
  function custom_event(type, detail) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, false, false, detail);
    return e;
  }

  let current_component;
  function set_current_component(component) {
    current_component = component;
  }

  const dirty_components = [];
  const binding_callbacks = [];
  const render_callbacks = [];
  const flush_callbacks = [];
  const resolved_promise = Promise.resolve();
  let update_scheduled = false;
  function schedule_update() {
    if (!update_scheduled) {
      update_scheduled = true;
      resolved_promise.then(flush);
    }
  }
  function add_render_callback(fn) {
    render_callbacks.push(fn);
  }
  let flushing = false;
  const seen_callbacks = new Set();
  function flush() {
    if (flushing) return;
    flushing = true;
    do {
      // first, call beforeUpdate functions
      // and update components
      for (let i = 0; i < dirty_components.length; i += 1) {
        const component = dirty_components[i];
        set_current_component(component);
        update(component.$$);
      }
      dirty_components.length = 0;
      while (binding_callbacks.length) binding_callbacks.pop()();
      // then, once components are updated, call
      // afterUpdate functions. This may cause
      // subsequent updates...
      for (let i = 0; i < render_callbacks.length; i += 1) {
        const callback = render_callbacks[i];
        if (!seen_callbacks.has(callback)) {
          // ...so guard against infinite loops
          seen_callbacks.add(callback);
          callback();
        }
      }
      render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
      flush_callbacks.pop()();
    }
    update_scheduled = false;
    flushing = false;
    seen_callbacks.clear();
  }
  function update($$) {
    if ($$.fragment !== null) {
      $$.update();
      run_all($$.before_update);
      const dirty = $$.dirty;
      $$.dirty = [-1];
      $$.fragment && $$.fragment.p($$.ctx, dirty);
      $$.after_update.forEach(add_render_callback);
    }
  }
  const outroing = new Set();
  function transition_in(block, local) {
    if (block && block.i) {
      outroing.delete(block);
      block.i(local);
    }
  }
  function mount_component(component, target, anchor) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    // onMount happens before the initial afterUpdate
    add_render_callback(() => {
      const new_on_destroy = on_mount.map(run).filter(is_function);
      if (on_destroy) {
        on_destroy.push(...new_on_destroy);
      } else {
        // Edge case - component was destroyed immediately,
        // most likely as a result of a binding initialising
        run_all(new_on_destroy);
      }
      component.$$.on_mount = [];
    });
    after_update.forEach(add_render_callback);
  }
  function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
      run_all($$.on_destroy);
      $$.fragment && $$.fragment.d(detaching);
      // TODO null out other refs, including component.$$ (but need to
      // preserve final state?)
      $$.on_destroy = $$.fragment = null;
      $$.ctx = [];
    }
  }
  function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
      dirty_components.push(component);
      schedule_update();
      component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= 1 << i % 31;
  }
  function init(
    component,
    options,
    instance,
    create_fragment,
    not_equal,
    props,
    dirty = [-1]
  ) {
    const parent_component = current_component;
    set_current_component(component);
    const prop_values = options.props || {};
    const $$ = (component.$$ = {
      fragment: null,
      ctx: null,
      // state
      props,
      update: noop,
      not_equal,
      bound: blank_object(),
      // lifecycle
      on_mount: [],
      on_destroy: [],
      before_update: [],
      after_update: [],
      context: new Map(parent_component ? parent_component.$$.context : []),
      // everything else
      callbacks: blank_object(),
      dirty,
    });
    let ready = false;
    $$.ctx = instance
      ? instance(component, prop_values, (i, ret, ...rest) => {
          const value = rest.length ? rest[0] : ret;
          if ($$.ctx && not_equal($$.ctx[i], ($$.ctx[i] = value))) {
            if ($$.bound[i]) $$.bound[i](value);
            if (ready) make_dirty(component, i);
          }
          return ret;
        })
      : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
      if (options.hydrate) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        $$.fragment && $$.fragment.l(children(options.target));
      } else {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        $$.fragment && $$.fragment.c();
      }
      if (options.intro) transition_in(component.$$.fragment);
      mount_component(component, options.target, options.anchor);
      flush();
    }
    set_current_component(parent_component);
  }
  let SvelteElement;
  if (typeof HTMLElement === 'function') {
    SvelteElement = class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
      }
      connectedCallback() {
        // @ts-ignore todo: improve typings
        for (const key in this.$$.slotted) {
          // @ts-ignore todo: improve typings
          this.appendChild(this.$$.slotted[key]);
        }
      }
      attributeChangedCallback(attr, _oldValue, newValue) {
        this[attr] = newValue;
      }
      $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
      }
      $on(type, callback) {
        // TODO should this delegate to addEventListener?
        const callbacks =
          this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
        callbacks.push(callback);
        return () => {
          const index = callbacks.indexOf(callback);
          if (index !== -1) callbacks.splice(index, 1);
        };
      }
      $set() {
        // overridden by instance, if it has props
      }
    };
  }

  function dispatch_dev(type, detail) {
    document.dispatchEvent(
      custom_event(type, Object.assign({ version: '3.18.2' }, detail))
    );
  }
  function append_dev(target, node) {
    dispatch_dev('SvelteDOMInsert', { target, node });
    append(target, node);
  }
  function insert_dev(target, node, anchor) {
    dispatch_dev('SvelteDOMInsert', { target, node, anchor });
    insert(target, node, anchor);
  }
  function detach_dev(node) {
    dispatch_dev('SvelteDOMRemove', { node });
    detach(node);
  }
  function listen_dev(
    node,
    event,
    handler,
    options,
    has_prevent_default,
    has_stop_propagation
  ) {
    const modifiers =
      options === true
        ? ['capture']
        : options
        ? Array.from(Object.keys(options))
        : [];
    if (has_prevent_default) modifiers.push('preventDefault');
    if (has_stop_propagation) modifiers.push('stopPropagation');
    dispatch_dev('SvelteDOMAddEventListener', {
      node,
      event,
      handler,
      modifiers,
    });
    const dispose = listen(node, event, handler, options);
    return () => {
      dispatch_dev('SvelteDOMRemoveEventListener', {
        node,
        event,
        handler,
        modifiers,
      });
      dispose();
    };
  }
  function set_data_dev(text, data) {
    data = '' + data;
    if (text.data === data) return;
    dispatch_dev('SvelteDOMSetData', { node: text, data });
    text.data = data;
  }

  /* src/components/App.svelte generated by Svelte v3.18.2 */

  const file = 'src/components/App.svelte';

  function create_fragment(ctx) {
    let main;
    let button;
    let t0;
    let t1;
    let t2;
    let hr;
    let t3;
    let p0;
    let t4;
    let t5;
    let t6;
    let t7;
    let p1;
    let t8;
    let t9;
    let t10;
    let dispose;

    const block = {
      c: function create() {
        main = element('main');
        button = element('button');
        t0 = text('Count: ');
        t1 = text(/*count*/ ctx[0]);
        t2 = space();
        hr = element('hr');
        t3 = space();
        p0 = element('p');
        t4 = text(/*count*/ ctx[0]);
        t5 = text(' * 2 = ');
        t6 = text(/*doubled*/ ctx[1]);
        t7 = space();
        p1 = element('p');
        t8 = text(/*doubled*/ ctx[1]);
        t9 = text(' * 2 = ');
        t10 = text(/*quadrupled*/ ctx[2]);
        this.c = noop;
        add_location(button, file, 15, 2, 245);
        add_location(hr, file, 17, 2, 305);
        add_location(p0, file, 19, 2, 315);
        add_location(p1, file, 20, 2, 348);
        add_location(main, file, 14, 0, 236);
      },
      l: function claim(nodes) {
        throw new Error(
          'options.hydrate only works if the component was compiled with the `hydratable: true` option'
        );
      },
      m: function mount(target, anchor) {
        insert_dev(target, main, anchor);
        append_dev(main, button);
        append_dev(button, t0);
        append_dev(button, t1);
        append_dev(main, t2);
        append_dev(main, hr);
        append_dev(main, t3);
        append_dev(main, p0);
        append_dev(p0, t4);
        append_dev(p0, t5);
        append_dev(p0, t6);
        append_dev(main, t7);
        append_dev(main, p1);
        append_dev(p1, t8);
        append_dev(p1, t9);
        append_dev(p1, t10);
        dispose = listen_dev(
          button,
          'click',
          /*handleClick*/ ctx[3],
          false,
          false,
          false
        );
      },
      p: function update(ctx, [dirty]) {
        if (dirty & /*count*/ 1) set_data_dev(t1, /*count*/ ctx[0]);
        if (dirty & /*count*/ 1) set_data_dev(t4, /*count*/ ctx[0]);
        if (dirty & /*doubled*/ 2) set_data_dev(t6, /*doubled*/ ctx[1]);
        if (dirty & /*doubled*/ 2) set_data_dev(t8, /*doubled*/ ctx[1]);
        if (dirty & /*quadrupled*/ 4) set_data_dev(t10, /*quadrupled*/ ctx[2]);
      },
      i: noop,
      o: noop,
      d: function destroy(detaching) {
        if (detaching) detach_dev(main);
        dispose();
      },
    };

    dispatch_dev('SvelteRegisterBlock', {
      block,
      id: create_fragment.name,
      type: 'component',
      source: '',
      ctx,
    });

    return block;
  }

  function instance($$self, $$props, $$invalidate) {
    let count = 1;

    const handleClick = () => {
      $$invalidate(0, (count += 1));
    };

    $$self.$capture_state = () => {
      return {};
    };

    $$self.$inject_state = $$props => {
      if ('count' in $$props) $$invalidate(0, (count = $$props.count));
      if ('doubled' in $$props) $$invalidate(1, (doubled = $$props.doubled));
      if ('quadrupled' in $$props)
        $$invalidate(2, (quadrupled = $$props.quadrupled));
    };

    let doubled;
    let quadrupled;

    $$self.$$.update = () => {
      if ($$self.$$.dirty & /*count*/ 1) {
        // the `$:` means 're-run whenever these values change'
        $$invalidate(1, (doubled = count * 2));
      }

      if ($$self.$$.dirty & /*doubled*/ 2) {
        $$invalidate(2, (quadrupled = doubled * 2));
      }
    };

    return [count, doubled, quadrupled, handleClick];
  }

  class App extends SvelteElement {
    constructor(options) {
      super();
      init(
        this,
        { target: this.shadowRoot },
        instance,
        create_fragment,
        safe_not_equal,
        {}
      );

      if (options) {
        if (options.target) {
          insert_dev(options.target, this, options.anchor);
        }
      }
    }
  }

  customElements.define('my-app', App);

  exports.App = App;

  return exports;
})({});
//# sourceMappingURL=components.js.map
