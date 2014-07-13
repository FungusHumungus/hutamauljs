module.exports = function(grunt) {
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            js: {
                files: ['public/js/**'],
                tasks: ['jasmine_node'],
            },
            specs: {
                files: ['spec/**/*.js'],
                tasks: ['jasmine_node'],
            }
        },
        jshint: {
            grunt: ['gruntfile.js'],
            client: ['lib/**/*.js'],
            
        },
        jasmine_node: {
            options: {
                specFolders:['./spec/'],
                specNameMatcher: "spec",
                match: ".",
                requirejs: false,
                forceExit: false,
                verbose: true,
                jUnit: {
                    report: false,
                    savePath : "./build/reports/jasmine/",
                    useDotNotation: true,
                    consolidate: true
                }
            }
        },
    });

    // Load NPM tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jasmine-node');

    // Default task(s).
    grunt.registerTask('default', ['test']);
    grunt.registerTask('test', ['jshint:grunt', 'jasmine_node']);
};
