// Fetch the font data once at the start and keep it in memory
// Idea is to load the font once so its ready in memory to be
// resolved by the time req arrives
export const aeonikFontDataPromise = fetch(
  new URL("../../public/fonts/AeonikTRIAL-Bold.otf", import.meta.url)
).then((res) => res.arrayBuffer());


export const benzinFontDataPromise = fetch(
  new URL("../../public/fonts/Benzin-ExtraBold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());