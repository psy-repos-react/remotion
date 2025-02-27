---
image: /generated/articles-docs-contributing-index.png
title: Contributing to Remotion
sidebar_label: General information
crumb: How to be awesome
---

Issues and pull requests of all sorts are welcome!

For bigger projects, please coordinate with Jonny Burger (<a href="mailto:jonny@remotion.dev">jonny@remotion.dev</a>, <a href="https://remotion.dev/discord">Discord</a>: <code>@jonnyburger</code>) to make sure your changes get merged.

Please note that since we charge for Remotion when companies are using it, this is a **commercial project**.  
By sending pull requests, you agree that we can use your code changes in a commercial context.

Furthermore, also note that you **cannot redistribute** this project. Please see [LICENSE.md](https://remotion.dev/license) for what's allowed and what's not.

This project is released with a [Contributor Code of Conduct](https://remotion.dev/coc). By participating in this project you agree to abide by its terms.

## Setup

<Step>1</Step> Remotion uses <a href="https://pnpm.io/"><code>pnpm</code></a> as the package manager for development in this repository. We recommend using Corepack so you get the same version of pnpm as we have. <br/><br/>

```sh
corepack enable
```

If you don't have `corepack`, install pnpm manually:

```sh
npm i -g pnpm@8.10.2
```

Prefix with `sudo` if necessary.

<Step>2</Step> Clone the Remotion repository:<br/>

```sh
git clone --depth=1 https://github.com/remotion-dev/remotion.git && cd remotion
```

:::note
The full Git history of Remotion is large. To save time and disk space, we recommend adding `--depth=1` to only clone the most recent `main` branch.
:::

<Step>3</Step> Install all dependencies:<br/>

```sh
pnpm i
```

<Step>4</Step> Build the project initially:<br/>

```sh
pnpm build
```

<Step>5</Step> Rebuild whenever a file changes:

```sh
pnpm watch
```

<Step>6</Step> You can start making changes!

## Note about browser packages

Some packages need `pnpm build` in order for their changes to apply.

Packages that are imported in the browser, like `remotion`, `@remotion/player`, `@remotion/gif` have ESM versions. In the Remotion Studio and Next.js, ES Modules are preferred, and they need to build separately. If you don't see changes applied, run:

```sh
cd packages/core && pnpm build
```

## Testing your changes

You can start the Testbed using

```sh
cd packages/example
pnpm start
```

You can render a test video using

```sh
cd packages/example
pnpm render
```

You can run tests using

```sh
pnpm test
```

in either a subpackage to run tests for that package or in the root to run all tests.

## Running the `@remotion/player` testbed

You can test changes to [@remotion/player](https://remotion.dev/docs/player) by starting the Player testbed:

```sh
cd packages/player-example
pnpm start
```

For information about testing, please consult [TESTING.md](https://github.com/remotion-dev/remotion/blob/main/TESTING.md). Issues and pull requests of all sorts are welcome!

## Running documentation

You can run the Docusaurus server that powers our docs using:

```sh
cd packages/docs
pnpm start
```

## Running the CLI

You can test changes to the CLI by moving to `packages/examples` directory and using `pnpm exec` to execute the CLI:

```sh
cd packages/examples
# Example - Get available compositions
pnpm exec remotion compositions
# Example - Render command
pnpm exec remotion render ten-frame-tester --output ../../out/video.mp4
```

## Troubleshooting

If your `pnpm build` throws errors, oftentimes it is because of caching issues. You can resolve many of these errors by running

```ts
pnpm run clean
```

in the root directory. Make sure to beforehand kill any `pnpm watch` commands, as those might regenerate files as you clean them!

## Developing Rust parts

To develop the Rust parts of Remotion, see the README in [packages/renderer/README.md](https://github.com/remotion-dev/remotion/blob/main/packages/renderer/README.md)

## See also

- [Implementing a new feature](/docs/contributing/feature)
- [Implementing a new option](/docs/contributing/option)
- [Writing documentation](/docs/contributing/docs)
- [How to take a bounty issue](/docs/contributing/bounty)
- [Formatting guidelines](/docs/contributing/formatting)
- [Authoring Remotion libraries](/docs/authoring-packages)
