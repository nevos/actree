actree
=========

Creates a tree for fast and efficient autocomplete string queries. The library doesnt rely on external libs.
The repo includes a full english dictionary (data.json) decoded into a tree format, and ready for autocomplate use. 
    
Node.js install
===============
    
    npm install actree
    
API
===

##### require

    var acTree = require("actree");
        
##### #letterNode - create a word

	var node = new acTree.letterNode("someword");

##### #addToTree - create a tree / add to tree

	var tree = acTree.addToTree(null,node); 

##### #autocomplete - find all the words in tree that start with input text       

	var res = acTree.autocomplete(tree,"some");        

##### #autocompleteInput(tree)

    call this function from <FILE.JS> that included acTree, and run it with node input: node <FILE.JS> <input search words with spaces>
    
	var res = acTree.autocompleteInput(tree);

### LICENSE
    
    ISC , nevonat@gmail.com
