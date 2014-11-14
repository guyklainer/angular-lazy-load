Lazy Loader For Angular Modules
=================================

Insert script tag for your main module in your HTML.
All the rest of your modules will be loaded automatically.

Usage
---------
If your main module is located at "public/js/main.js"
insert this script tag to your HTML footer:

    <script src="/public/js/example/main.js"></script>

Set our root to the app namespace:

    angular.lazyLoaderRoot = "example";

In you main.js file:</br>
    
    var module = angular.module("example", [
        '/public/js/example/view1.js'
    ]);

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