Happy Store React Application
============================

# 1. Overview
## 1-1. Structure
You can see the file structure like below.

      happystore
        ├── README.md
        ├── node_modules
        ├── package.json
        ├── .gitignore
        ├── .babelrc
        ├── .eslintrc
        ├── .webpack.dev.config.js
        ├── .webpack.prod.config.js
        ├── data.json
        └── src
            └── app
                └── App.js
                └── App.scss
            └── product
                └── ProductItem.js
                └── ProductModal.js
                └── ProductList.js
                └── ProductAction.js
                └── ProductApi.js
                └── ProductReducer.js
                └── ProductWatcher.js
                └── product.scss
            └── category
                └── Category.js
                └── CategoryAction.js
                └── CategoryApi.js
                └── CategoryReducer.js
                └── CategoryWatcher.js
                └── category.scss
            └── priceline
                └── PriceLine.js
                └── PriceLineAction.js
                └── PriceLineApi.js
                └── PriceLineReducer.js
                └── PriceLineWatcher.js
                └── priceline.scss
            └── pagination
                └── Pagination.js
            └── sale
                └── SaleButton.js
            └── search
                └── SearchAction.js
                └── SearchReducer.js
            └── libs
                └── ActionHelper.js
                └── KeyMirror.js
            └── reducers.js
            └── sagas.js
            └── index.js
            └── index.html
            └── index.scss

### Component
This is the folder that contains all file related to domain.
I referred to the two postings below.

<https://reactjs.org/docs/faq-structure.html>

<https://marmelab.com/blog/2015/12/17/react-directory-structure.html>

By following above postings, I tried to remove complicated nesting structure and to keep the structure based on domain.

# 2. Addition

## 2-1. Tree Shaking

Tree shaking means that unused modules will not be included in the bundle during the build process.
if we make an unused option be true with UglifyJS plugin in webpack, we can do it.

Tree shaking works on ES6 module syntax so you have to change babel settings.
Because babel will complie ES6 modules to CommonJS modules.
So you have to change preset settings.

	presets: [['env', { modules: false }]]

## 2-2. Code Seperation

SPA loads all resources at once so it has the advantage of very fast page movement after initial loading.
But if the project size is getting larger, initial loading is getting slower.(Also, this project does not matter)
For later, I set this up.

**only for production**
write this options in webpack config file:

	output: {
    	// for entry
      	filename: '[name].[hash].js',
      	// for each page
      	chunkFilename: '[name].[chunkhash].chunk.js',
      	path: dist,
    },
    
    plugins: [
      	// to seperate my own codes and thrid party codes
      	new webpack.optimize.CommonsChunkPlugin({
         	name: 'vendor',
         	minChunks: module => module.context && 				module.context.indexOf('node_modules') !== -1,
         	fileName: '[name].[chunkhash]',
      	}),
      	// create entry point and inject js/css
      	// if without this plugin, no html file in dist.
      	new HtmlWebpackPlugin({
         	template: path.resolve(__dirname, './src/index.html'),
         	filename: 'index.html',
         	inject: 'body',
         	minify: {
            	collapseWhitespace: true,
            	keepClosingSlash: true,
            	removeComments: true,
         	},
         	xhtml: true,
       	})
    ],

# 3. Environment

## 3-1. Set-up | Run

After extraction compressed file, you cannot see the node_modules folder. So first you have to create node_modules.
To create node_modules, run this command:

	npm install


you need to run the project on dev-server for check.
To check in dev-server, run this command:

	npm run dev


After check, if you want to build and deploy, run this command:

	npm run build
	
And then, you can see the dist folder created automatically. When you deploy this project, you just use files such as index.html and index.js in the folder.
