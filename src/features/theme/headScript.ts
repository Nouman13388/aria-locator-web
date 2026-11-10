import { themes } from "./themes";
import { announcementStorageKey } from "../../data/site";
// Literal script text stays identical in the server and browser builds.
export const themeScript = `(() => {
  const ids = ${JSON.stringify(themes.map((theme) => theme.id))};
  let stored = null;
  try { stored = localStorage.getItem("keenest-theme"); } catch {}
  document.documentElement.dataset.theme = ids.includes(stored) ? stored : ids[0];
  try {
    if (sessionStorage.getItem(${JSON.stringify(announcementStorageKey)}) === "1")
      document.documentElement.dataset.demoNotice = "dismissed";
  } catch {}
})();`;
