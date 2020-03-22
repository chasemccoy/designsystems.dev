---
title: Design tokens
excerpt: The subatomic particles that make up further atoms, molecules, organisms, etc. in a design system.
---

In the [taxonomy of design systems](/taxonomy), design tokens are fundamental elements—the subatomic particles that make up further atoms, molecules, organisms, etc. Design tokens are often represented as literal values representing styles like colors, type size, border radius, space, etc. 

Design tokens can be represented in nearly any format, but the important thing to remember is that the stable foundation of a design system relies on a single source of truth for design tokens. No matter how you choose to represent them, store them, interact with them, or exchange them, just make sure it's in all done in one place (like Github, for instance).

Lots of folks choose to store them in some common data format like JSON, TOML, YAML, etc. This is useful because lots of tools can digest files like these. You might also choose to store your source of truth in a design tool like Figma, which has an API and makes them consumable in code (hooray for APIs and data sharing!)

No matter how you store them, you're going to also want some system in place to transform the core values into formats that are consumable by every platform, language, tool, etc. that your design system supports. 

## Establishing design tokens

Unless you're creating a brand/company/product from scratch, your system's design tokens most likely already exist. Our job is simply to discover them, study them, and catalog their existence.

Take a look at your product — what color are the buttons? What about the logo? How many type sizes do you have? The answers to these questions will form a large pool of values from which your design token can be selected. Now might be a good time to decide as a team that you all want to reduce the total number of values, or introduce some new ones. 

Try not to have too many design tokens. For every token that you add to the system, you're adding to a tree of decision making that the users of your system will have to traverse whenever they use a token. 

## Tooling 

## Introducing semantics 

You'll often hear that the best part about design tokens is that they make re-skinning UI easier because the design values are all pulled from one source of truth. Makes sense, all the buttons in my app use the `Blue 500` token, if anyone ever wants to change that we can just change the value of the token!

And then someone comes along and asks you to change all the buttons to purple. 

Your have two options. The first is to change the `Blue 500` token to be purple, but that breaks the point of having well-names tokens. The second is to go through your entire application and replace the `Blue 500` token with the `Purple 500` token. Maybe that's not too hard in your app, but it's certainly risky. 

## Recommended reading 

- designtokens.org
- [Nathan Curtis: Tokens in Design Systems](https://medium.com/eightshapes-llc/tokens-in-design-systems-25dd82d58421)
- [Official Design Tokens W3C community group](https://github.com/design-tokens/community-group)