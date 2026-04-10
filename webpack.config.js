// Load the default @wordpress/scripts config object
const path = require( 'path' );
const fs = require( 'fs' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

/**
 * Webpack plugin to prepend ABSPATH guard to generated .asset.php files.
 * WordPress.org requires all PHP files to prevent direct access.
 */
class AbsPathGuardPlugin {
	apply( compiler ) {
		compiler.hooks.afterEmit.tap( 'AbsPathGuardPlugin', ( compilation ) => {
			const outputPath = compilation.outputOptions.path;
			const assetFiles = fs.readdirSync( outputPath ).filter( ( f ) => f.endsWith( '.asset.php' ) );
			assetFiles.forEach( ( file ) => {
				const filePath = path.join( outputPath, file );
				const content = fs.readFileSync( filePath, 'utf8' );
				if ( ! content.includes( 'ABSPATH' ) ) {
					fs.writeFileSync( filePath, content.replace( '<?php', '<?php if ( ! defined( \'ABSPATH\' ) ) { exit; } ' ) );
				}
			} );
		} );
	}
}

// Use the defaultConfig but add the common aliases, modules and plugins.
const commonConfig = {
	...defaultConfig,
	resolve: {
		alias: {
			...defaultConfig.resolve.alias,
			'@Scripts': path.resolve( __dirname, 'scripts/' ),
			'@DashboardApp': path.resolve( __dirname, 'admin/dashboard-app/src/' ),
			'@Sidebar': path.resolve( __dirname, 'sidebar/src/' ),
		},
	},
	module: {
		rules: [
			...defaultConfig.module.rules,
			{
				test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
				use: [
					'file-loader',
				],
			},
		],
	},
	plugins: [
		...defaultConfig.plugins.filter( function ( plugin ) {
			if ( plugin.constructor.name === 'LiveReloadPlugin' ) {
				return false;
			}

			return true;
		} ),
		new AbsPathGuardPlugin(),
	],
};

// Now using the commonConfig that inherits the defaultConfig, replace the entry and output properties for each app.

// Config for the Zip AI Dashboard App.
const dashboardConfig = Object.assign( {}, commonConfig, {
	name: 'zip-dashboard-app',
	entry: {
		'dashboard-app': path.resolve(
			__dirname,
			'admin/dashboard-app/src/DashboardApp.js'
		),
	},
	output: {
		filename: '[name].js',
		path: path.resolve( __dirname, 'admin/dashboard-app/build' ),
	},
} );

// Config for the Zip AI Sidebar App.
const sidebarConfig = Object.assign( {}, commonConfig, {
	name: 'zip-sidebar-app',
	entry: {
		'sidebar-app': path.resolve(
			__dirname,
			'sidebar/src/index.js'
		),
	},
	output: {
		filename: '[name].js',
		path: path.resolve( __dirname, 'sidebar/build' ),
	},
} );

// Export all the configs.
module.exports = [
	dashboardConfig,
	sidebarConfig,
];
