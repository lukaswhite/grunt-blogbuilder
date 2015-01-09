/*
 * blogbuilder
 * 
 *
 * Copyright (c) 2014 Matthew Daly
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    blogbuilder: {
      default_options: {
        options: {
          data: {
            author: "My Name",
            url: "http://www.example.com",
            facebookcomments: "",
            disqus: "",
            title: 'My new blog',
            description: 'A blog'
          },
          template: {
            post: 'templates/post.hbs',
            page: 'templates/page.hbs',
            index: 'templates/index.hbs',
            header: 'templates/partials/header.hbs',
            footer: 'templates/partials/footer.hbs',
            archive: 'templates/archive.hbs',
            notfound: 'templates/404.hbs'
          },
          src: {
            posts: 'content/posts/',
            pages: 'content/pages/'
          },
          www: {
            dest: 'build'
          }
        },
        files: {
          'tmp/default_options': ['test/fixtures/testing', 'test/fixtures/123']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'blogbuilder', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
