module.exports = function ( grunt ) {
	// Project configuration.
	grunt.initConfig( {
		pkg: grunt.file.readJSON( 'package.json' ),

		copy: {
			main: {
				options: {
					mode: true,
				},
				src: [
					'**',
					'!.git/**',
					'!.gitignore',
					'!.gitattributes',
					'!*.sh',
					'!*.zip',
					'!eslintrc.json',
					'!README.md',
					'!Gruntfile.js',
					'!package.json',
					'!package-lock.json',
					'!composer.json',
					'!composer.lock',
					'!phpcs.xml',
					'!phpcs.xml.dist',
					'!phpunit.xml.dist',
					'!node_modules/**',
					'!vendor/**',
					'!tests/**',
					'!scripts/**',
					'!config/**',
					'!tests/**',
					'!bin/**',
				],
				dest: 'zip-ai/',
			},
		},
		compress: {
			main: {
				options: {
					archive: 'zip-ai-<%= pkg.version %>.zip',
					mode: 'zip',
				},
				files: [
					{
						src: [ './zip-ai/**' ],
					},
				],
			},
		},
		clean: {
			main: [ 'zip-ai' ],
			zip: [ '*.zip' ],
		},
		bumpup: {
			options: {
				updateProps: {
					pkg: 'package.json',
				},
			},
			file: 'package.json',
		},
		replace: {
			plugin_const: {
				src: [ 'loader.php' ],
				overwrite: true,
				replacements: [
					{
						from: /ZIP_AI_VERSION', '.*?'/g,
						to: "ZIP_AI_VERSION', '<%= pkg.version %>'",
					},
				],
			},
			plugin_function_comment: {
				src: [
					'*.php',
					'**/*.php',
					'!node_modules/**',
					'!vendor/**',
					'!php-tests/**',
					'!bin/**',
					'!tests/**',
				],
				overwrite: true,
				replacements: [
					{
						from: /x.x.x/ig,
						to: '<%=pkg.version %>',
					},
				],
			},
			plugin_main: {
				src: [ 'zip-ai.php' ],
				overwrite: true,
				replacements: [
					{
						from: /Version: \bv?(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-[\da-z-A-Z-]+(?:\.[\da-z-A-Z-]+)*)?(?:\+[\da-z-A-Z-]+(?:\.[\da-z-A-Z-]+)*)?\b/g,
						to: 'Version: <%= pkg.version %>',
					},
				],
			},
			version_update: {
				src: [ 'version.json' ],
				overwrite: true,
				replacements: [
					{
						from: /"zip-ai": ".*?"/g,
						to: '"zip-ai": "<%= pkg.version %>"',
					},
				],
			},
		},
	} );

	/* Load Tasks */
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-compress' );
	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-wp-i18n' );
	grunt.loadNpmTasks( 'grunt-text-replace' );

	/* Version Bump Task */
	grunt.loadNpmTasks( 'grunt-bumpup' );

	/* Register task started */
	grunt.registerTask( 'release', [
		'clean:zip',
		'copy',
		'compress',
		'clean:main',
	] );

	grunt.registerTask( 'release-deploy', [
		'clean:zip',
		'copy',
		'compress',
	] );
	// Version Bump `grunt bump-version --ver=<version-number>`
	grunt.registerTask( 'bump-version', function () {
		let newVersion = grunt.option( 'ver' );

		if ( newVersion ) {
			newVersion = newVersion ? newVersion : 'patch';

			grunt.task.run( 'bumpup:' + newVersion );
			grunt.task.run( 'replace' );
		}
	} );
};
