module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            files: ['**/*.js'],
            tasks: ['jasmine', 'jshint']
        },

        nugetpack: {
            dist: {
                src: 'nuget/bootstrap-listbuilder.nuspec',
                dest: 'nuget/',
                options: {
                    version: '<%= pkg.version %>'
                }
            }
        },

        nugetpush: {
            dist: {
                src: 'nuget/*.nupkg'
            }
        },

        jasmine: {
            src: 'src/*.js',
            options: {
                specs: 'spec/*.js',
                template: require('grunt-template-jasmine-requirejs'),
                templateOptions: {
                    requireConfig: {
                        baseUrl: 'src/',
                        paths: {
                            'jquery': '../node_modules/jquery/dist/jquery.min',
                            'bootstrap-listbuilder': '../src/bootstrap-listbuilder'
                        }
                    }
                }
            }
        },

        jshint: {
            all: ['Gruntfile.js', 'src/**/*.js', 'spec/**/*.js']
        },

        clean: ['nuget/*.nupkg'],

        // pushes to npm
        release: {
            options: {
                // we'll use grunt-bump to increment the version as it
                // supports reloading the pkg config var which we need
                // as it is referenced when the nuget tasks are run
                bump: false,
                commitMessage: 'Release <%= version %>'
                /*github: { 
                    repo: 'linn/lawgr'
                }*/
            }
        },

        bump: {
            options: {
                // reload pkg config var after bump
                updateConfigs: ['pkg'],
                commit: false,
                createTag: false,
                push: false
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-nuget');
    grunt.loadNpmTasks('grunt-release');

    grunt.registerTask('test', ['jshint', 'jasmine']);
    grunt.registerTask('default', ['test']);
    grunt.registerTask('publish', ['publish:patch']);
    grunt.registerTask('publish:patch', ['clean', 'bump:patch', 'release', 'nugetpack', 'nugetpush']);
    grunt.registerTask('publish:minor', ['clean', 'bump:minor', 'release', 'nugetpack', 'nugetpush']);
    grunt.registerTask('publish:major', ['clean', 'bump:major', 'release', 'nugetpack', 'nugetpush']);
};
