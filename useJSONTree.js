var fs = require("fs");
var letterNode = require("./acTree").letterNode ;
var addToTree = require("./acTree").addToTree ;
var autocomplete = require("./acTree").autocomplete ;
var autocompleteInput = require("./acTree").autocompleteInput ;
var searchTxtInTree = require("./acTree").searchTxtInTree ;
var searchWordsInSubTree = require("./acTree").searchWordsInSubTree ;

var sampleTree = require("./sampleTree").sampleTree ;

function useJSONTree1(){
	var node1 = new letterNode("all", true);
	var node2 = new letterNode("aliens", true);
	var node3 = new letterNode("are", false);
	var node4 = new letterNode("alive", true);
	var node5 = new letterNode("ali", true);
	var node6 = new letterNode("baba", true);

	var tree = null ;
	tree = addToTree(tree, node1);
	tree = addToTree(tree, node2);
	tree = addToTree(tree, node3);
	tree = addToTree(tree, node4);
	tree = addToTree(tree, node5);    
	tree = addToTree(tree, node6);

	console.log("Tree: " + JSON.stringify(tree, null, 2));

	var search = "bab" ;
	var found = searchTxtInTree(tree,search) ;
	console.log("searched: " + search + "\nfound: " + JSON.stringify(found,null,1));

	search = "al" ;
	var subTree = searchTxtInTree(tree,search) ;
	console.log("searched: " + search + "\nfound: " + JSON.stringify(subTree,null,1));
	var res =  searchWordsInSubTree(subTree,[]) ;

	search = "a" ;
	res = autocomplete(tree,search) ;
	console.log("searched: " + search +  "\nfound: " + JSON.stringify(res,null,1));
}


function useJSONTree2(){
	var node1 = new letterNode("baba", true);
	var tree = addToTree(sampleTree, node1);
 
	console.log("Tree: " + JSON.stringify(tree, null, 2));

	var search = "a" ;
	var res = autocomplete(tree,search) ;
	console.log("searched: " + search +  "\nfound: " + JSON.stringify(res,null,1));
}


function useJSONTree3() {
	var tree = JSON.parse(fs.readFileSync(__dirname + "/data.json", "utf8"));
	var search = "ali" ;
	var res = autocomplete(tree,search) ;
	console.log("searched: " + search +  "\nfound: " + JSON.stringify(res,null,1));
}

function useJSONTree4() {
	var tree = JSON.parse(fs.readFileSync(__dirname + "/data.json", "utf8"));
	var res = autocompleteInput(tree) ;
	console.log("\nfound: " + JSON.stringify(res,null,1));
}

useJSONTree1() ;
useJSONTree2() ;
useJSONTree3() ;
useJSONTree4() ;