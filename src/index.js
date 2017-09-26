const _ = require("lodash")
const path = require("path")
const Chunk = require("webpack/lib/Chunk")
const config = require("./config")
const Fontello = require("./Fontello")
const Css = require("./Css")

// https://github.com/jantimon/html-webpack-plugin/blob/master/index.js#L98
function getPublicPath(compilation) {
	let publicPath = compilation.mainTemplate.getPublicPath({ hash: compilation.hash }) || ""
	if(publicPath && publicPath.substr(-1) !== "/") {
		publicPath += "/"
	}
	return publicPath
}

class FontelloPlugin {
	constructor(options) {
		this.options = config(options)
		this.chunk = new Chunk(this.options.name)
		this.chunk.ids = []
		this.chunk.name = this.options.name
	}

	apply(compiler) {
		const { output } = this.options
		const chunk = this.chunk
		const fontello = new Fontello(this.options)

        compiler.plugin('emit', (compilation, callback) => {
        fontello.assets()
            .then(sources => {
                new Css(this.options, cssRelativePath)
                for(const ext in sources) {
                    fontFile(ext)
                }
            })
            .then(() => callback())
        })
	}
}

FontelloPlugin.Css = Css

FontelloPlugin.Fontello = Fontello

module.exports = FontelloPlugin
