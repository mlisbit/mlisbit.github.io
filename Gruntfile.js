module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		less: {
			development: {
				options: {
					paths: ["assets/css"],
					cleancss: true
				},
				files: {
					"styles/css/style.css": "styles/less/app.less"
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');

	grunt.registerTask('default', ['less']);

};
