# a cat lives here

The static site for **alvinmhng.com**: one cosy illustrated room with one round cat in it. There's nothing useful to do there, and that's on purpose.

- **pet** the cat (wiggle the cursor over it, or drag a finger) to get happy eyes, hearts and a purr
- **boop** the nose and it'll tell you what it's thinking
- **fling** the yarn, and the cat swats it back if it rolls close
- **treat time** drops a fish
- **another cat** brings in a new coat and a new name
- **tap the window** to swap between day and night (the room starts on your real clock)
- leave it alone and it falls asleep

The 404 page uses the same room, with the cat asleep on the keyboard.

## How it's built

Plain HTML, CSS and one JavaScript module. No build step, no dependencies, no analytics. The whole room is a single inline SVG (`assets/js/room.js`). The pet counter is kept in the visitor's own `localStorage`. Fonts are Fredoka and Gaegu from Google Fonts.

To run it locally, serve the repo root over HTTP (the script is an ES module):

```bash
npx --yes http-server . -p 4173 -c-1
```


