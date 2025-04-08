# Personnal portfolio

My personnal portfolio, **configure it with a single json file** and have a stunning minimal portfolio with a markdown blog!

## Usage

First clone and cd to the project.

Then, to install dependencies:

```bash
bun install
```

Finally, to run the dev server:

```bash
bun run dev
```

> This project was created using [Bun](https://bun.sh) and [Tanstack Start](https://tanstack.com/start/latest).

## Content

Configure the entire portfolio within `app/content.json`.

The list elements (eg. _projects_ and _articles_) must follow this type:

```typescript
type ListElem = {
  date: string;
  title: string;
  url: string; // (default to "#")
  external: bool; // (default to false)
};
```
