module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			dist: {
				options: {
					// separator: '\n',
					banner: '/**\n' +
						' * <%= pkg.name %>\n' +
						' * Version: <%= pkg.version %>\n' +
						' * URI: <%= pkg.uri %>\n' +
						' * Date: <%= grunt.template.today("yyyy-mm-dd") %>\n' +
						' **/'
				},
				src: [
					
				],
				dest: 'dist/jquery.<%= pkg.name %>.pkgd.js',
			}
		},

		uglify: {
			options: {
				banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= pkg.uri %>' +
						' - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			my_target: {
				files: {
					'dist/jquery.<%= pkg.name %>.min.js': ['dist/jquery.<%= pkg.name %>.pkgd.js']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['concat', 'uglify']);
};
