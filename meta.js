const path = require("path");
const { pathToFileURL, URL } = require("url");
const pkg = require("./package.json");

const distURLBase = `https://example.com/dist`;
const packageName = pkg.name;

const production = !process.env.ROLLUP_WATCH;
const baseUrl = path.join(__dirname, "dist");

let meta = {
  name: production ? packageName : packageName + " -> dev",
  version: pkg.version,
  description: pkg.description,
  homepage: pkg.homepage,
  author: pkg.author,
  namespace: "https://github.com",
  resource: {
    css: pathToFileURL(path.join(baseUrl, "bundle.css")),
  },
  match: ["https://*.github.com/*"],
  grant: ["GM_addStyle", "GM_getResourceText", "GM_xmlhttpRequest"],
  connect: ["github.com"],
  "run-at": "document-idle",
};

if (!production) {
  meta.require = [pathToFileURL(path.join(baseUrl, "bundle.js"))];
}

if (production) {
  meta.downloadURL = new URL("bundle.js", distURLBase);
  meta.updateURL = new URL("bundle.js", distURLBase);
  meta.resource.css = new URL("bundle.css", distURLBase);
}

module.exports = meta;
