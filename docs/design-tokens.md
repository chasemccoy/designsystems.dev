---
title: Design tokens
---

In the [taxonomy of design systems](/taxonomy), design tokens are fundamental elements—the subatomic particles that make up further atoms, molecules, organisms, etc. Design tokens are often represented as literal values representing styles like colors, type size, border radius, space, etc. 

Design tokens can be represented in nearly any format, but the important thing to remember is that the stable foundation of a design system relies on a single source of truth for design tokens. No matter how you choose to represent them, store them, interact with them, or exchange them, just make sure it's in all done in one place (like Github, for instance).

Lots of folks choose to store them in some common data format like JSON, TOML, YAML, etc. This is useful because lots of tools can digest files like these. You might also choose to store your source of truth in a design tool like Figma, which has an API and makes them consumable in code (hooray for APIs and data sharing!)

## Recommended reading 

- designtokens.org
- [Nathan Curtis: Tokens in Design Systems](https://medium.com/eightshapes-llc/tokens-in-design-systems-25dd82d58421)