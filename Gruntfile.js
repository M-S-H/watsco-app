module.exports = function(grunt){

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
	grunt.loadNpmTasks('grunt-ember-templates');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		cssc: {
			build: {
				options: {
					consolidateViaDeclarations:	true,
					consolidateViaSelectors:	true,
					consolidateMediaQueries:	true
				},
				files: {
					'www/build/css/master.css': 'www/build/css/master.css'
				}
			}
		},

		cssmin: {
			build: {
				src: 'www/build/css/master.css',
				dest: 'www/build/css/master.css'
			}
		},

		sass: {
			build: {
				files: {
					'www/build/css/master.css': 'assets/sass/master.scss'
				}
			}
		},

		uglify: {
            build: {
                files: {
                    'www/build/js/app.min.js': ['app/**/*.js']
                }
            }
        },

		emberTemplates: {
			compile: {
				options: {
					templateBasePath: /app\/templates\//
				},

				files: {
					"www/build/js/templates.js": "app/templates/*.hbs"
				}
			}
		},

		watch: {
			css: {
				files: ['assets/sass/*.scss'],
				tasks: ['buildcss']
			},
			js: {
                files: ['app/**/*.js'],
                tasks: ['uglify']
            },
            emberTemplates: {
            	files: ["app/templates/*.hbs"],
            	tasks: ["emberTemplates"]
            }
		}
	});


	grunt.registerTask('default', []);
	grunt.registerTask('buildcss',  ['sass', 'cssc', 'cssmin']);
	grunt.loadNpmTasks('grunt-ember-templates');

};