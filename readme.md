# Website

The source code of my [blog](https://jamiequigley.com).

It's a [React](https://react.dev/) single-page app built with [Vite](https://vite.dev/), using [React Router](https://reactrouter.com/) for routing. Pages are written in markdown under `content/` and rendered with [react-markdown](https://github.com/remarkjs/react-markdown). The styling is a port of the [terminal](https://github.com/panr/hugo-theme-terminal) Hugo theme.

- `npm run dev` — start a dev server
- `npm run build` — build into `dist/`
- `nix build` — build into `result/` (update `npmDepsHash` in `flake.nix` when dependencies change)

---

The original theme is available [here](https://github.com/panr/hugo-theme-terminal), under the MIT licence.

The code of this website (the theme, styling, etc) is available under the terms of version 2.0 of the Mozilla Public License.

Everything else in this repo is available under the [CC BY-NC-SA 4.0 licence](https://creativecommons.org/licenses/by-nc-sa/4.0/)
