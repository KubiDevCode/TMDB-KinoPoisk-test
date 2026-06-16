# Movie Explorer

React + TypeScript + Vite application for browsing TMDB movies.

## Features

- Popular, top rated, upcoming and now playing movie categories.
- Search by movie title with pagination and URL query state.
- Discover page with genre, rating and sort filters.
- Local favorites stored in the browser.
- Typed RTK Query API layer and reusable movie card/grid components.

## Setup

1. Create `.env.local` in the project root.
2. Copy values from `.env.example`.
3. Put your TMDB API Read Access Token into `VITE_TMDB_ACCESS_TOKEN`.

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Structure

- `src/app` - providers, router, store and global styles.
- `src/pages` - route-level pages.
- `src/widgets` - layout sections such as header, footer and welcome banner.
- `src/features` - user actions such as search and navigation buttons.
- `src/entities/movie` - movie types, mappers and reusable movie UI.
- `src/shared` - API, hooks, config and generic UI.
