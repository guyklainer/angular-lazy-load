Lazy Loader For Angular Modules
=================================

Insert script tag for your main module in your HTML.
All the rest of your modules will be loaded automatically.

[![Build Status](https://travis-ci.org/guyklainer/angular-lazy-load.svg?branch=master)](https://travis-ci.org/guyklainer/angular-lazy-load)
[![devDependency Status](https://david-dm.org/guyklainer/angular-lazy-load/dev-status.svg)](https://david-dm.org/guyklainer/angular-lazy-load#info=devDependencies)
[![Code Climate](https://codeclimate.com/github/guyklainer/angular-lazy-load/badges/gpa.svg)](https://codeclimate.com/github/guyklainer/angular-lazy-load)
[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/guyklainer/angular-lazy-load?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Usage
---------
If your main module is located at "public/js/main.js"
insert this script tag to your HTML footer:

    <script src="/public/js/example/main.js"></script>

In you main.js file:</br>
    
    var module = angular.module("example", [
        '/public/js/example/view1.js'
    ]);

our app namespace will be the name of the main module:

    'example' in the example

This will create for us module with the name:

    "example"

But before this module will be created, our lazyLoader will fetch:

    '/public/js/example/view1.js'

and will create for us this module:
    
    "example.view1"

If view1 also have dependencies that need to be fetched, this process will continue recursively


Notes:
-------
paths like this : 

    '/public/js/example/view1/view1.js'


will create this module:

    example.view1

lazyLoader will ignores duplicates in the end of the module name from the understanding that its probably root file in view1 folder


Example
----------
For live demo, run the index.html file and dig in the example folder for code samples.

Contribute
------------
You are more then welcome to fork and make this tool better.

</br>
</br>
