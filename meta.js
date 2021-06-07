const path = require('path');
const { pathToFileURL } = require('url');
const pkg = require('./package.json');

const production = !process.env.ROLLUP_WATCH;
const baseUrl = !production
	? path.join(__dirname, 'dist')
	: `https://example.com/dist`;

let meta = {
    "name": production ? pkg.name : pkg.name + '-dev',
    "version": pkg.version,
    "description": pkg.description,
	"homepage": pkg.homepage,
	"author": pkg.author,
    "namespace": "https://github.com",
    "resource": {
		css: pathToFileURL(path.join(baseUrl, 'bundle.css'))
	},
    "match": [
        "https://*.github.com/*"
    ],
    "grant": [
        "GM_addStyle",
        "GM_getResourceText",
        "GM_xmlhttpRequest"
    ],
    "connect": [
        "github.com"
    ],
    "run-at": "document-idle"
}

if(!production){
	meta.require= [
        pathToFileURL(path.join(baseUrl, 'bundle.js'))
    ];
}

if(production) {
	meta.downloadURL = pathToFileURL(path.join(baseUrl, 'bundle.js'));
	meta.updateURL = pathToFileURL(path.join(baseUrl, 'bundle.js'));
}

module.exports = meta;