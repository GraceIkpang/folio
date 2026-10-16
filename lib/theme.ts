/** Where the visitor's light/dark choice is saved. */
export const THEME_STORAGE_KEY = "theme";

/** Runs in <head> before the first paint: a saved choice, else the device setting. */
export const themeScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
