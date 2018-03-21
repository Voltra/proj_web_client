/**************************************************************************\
	IMPORTS
\**************************************************************************/
const path = require("path");
const webpack = { ProvidePlugin } = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");



/**************************************************************************\
	BASE DEFINITIONS
\**************************************************************************/
const dev = (process.env["NODE_ENV"] === "dev");
const thisPath = __dirname;
const config = {};
	config.resolve = {};
		config.resolve.alias = {};
		config.resolve.extensions = [];
	config.entry = {};
	config.output = {};
    config.plugins = [];
	config.module = {};
		config.module.rules = [];
	


/**************************************************************************\
	TARGET
\**************************************************************************/
config.target = "web";



/**************************************************************************\
	ALIASES
\**************************************************************************/
config.resolve.alias["@js"] = path.resolve(thisPath, "dev/js/");

config.resolve.extensions.push(".js");
config.resolve.extensions.push(".esm");
config.resolve.extensions.push(".es6");
config.resolve.extensions.push(".css");



/**************************************************************************\
	ENTRIES
\**************************************************************************/
config.entry["index"] = "@js/index.js";



/**************************************************************************\
	OUTPUTS
\**************************************************************************/
config.output["path"] = path.resolve(thisPath, "public_html/assets");
config.output["filename"] = "js/[name].bundle.js"; //.[chunkhash:8]
config.output["publicPath"] = "assets/"



/**************************************************************************\
	DEV TOOLS
\**************************************************************************/
//config.devtool = dev ? "cheap-module-eval-source-map" : false;



/**************************************************************************\
	MODULES/LOADERS
\**************************************************************************/
const libsRegex = /(node_modules|bower_components)/g
config.module.rules.push({
	test: /\.(js|es6|esm)$/,
	exclude: libsRegex,
	use: [
		"babel-loader"
	]
});

config.module.rules.push({
	test: /\.(jpe?g|png|gif|svg)$/i,
	loader: "file-loader",
	query: {
		name: "[name].[ext]",
		outputPath: "images/"
	}
});

const styleLoaders = ["style-loader", "css-loader"];
config.module.rules.push({
    test: /\.css$/,
    use: styleLoaders
});



/**************************************************************************\
	MODULES/LOADERS
\**************************************************************************/
const jquerys = ["$", "jQuery", "window.$", "window.jQuery"]
.map(name => ({[name]: "jquery"}))
.reduce((acc, elem)=>Object.assign({}, acc, elem));

//config.plugins.push(new ProvidePlugin(jquerys));
config.plugins.push(new CleanWebpackPlugin(["assets/js"], {
	root: path.resolve(thisPath, "public_html"),
	verbose: true,
	dry: false,
	exclude: ["globals", "globals/*", "globals/*.*"]
}));
//config.plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));



/**************************************************************************\
	EXPORT
\**************************************************************************/
module.exports = config;