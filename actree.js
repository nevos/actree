var testTree = 
{
    letters:[
    {
        letter: "a",
        ptr: {
            letters:[
            {
                letter: "l",
                id: "al",
                ptr: {
                    letters:[
                    {
                        letter: "e",
                        id: "ale",
                        ptr: null 
                    },
                    {
                        letter: "i",
                        id: "ali",
                        ptr: {
                            letters:[                            
                                {                            
                                letter: "v",
                                id: "aliv",
                                ptr: {        
                                    letters:[
                                    {                            
                                        letter: "e",
                                        id: "alive",
                                        ptr: null                           
                                    }           
                                    ]
                                }
                            }
                            ]
                        }           
                    }
                    ]
                }
            }
            ]
        }
    },
    ]
}

function addToTree(tree,node) {
    var depth = 0 ;
    var treeLetters = tree ;
    var setAsWord = false ;

    for (depth in node.id) { // iterate node letter
        depth = parseInt(depth) ;
        console.log("node depth: " + node.id[depth] + " depth:" + depth) ;
        console.log("node depth***: " + JSON.stringify(treeLetters)) ;
        /// the problem is we have different context here sometimes without letters in json - because we're in a single letter.

        for(i in treeLetters.letters)  // iterate letters in tree
        {   
            console.log("tree letter: " + treeLetters.letters[i].letter) ;            
            if(treeLetters.letters[i].letter == node.id[depth]) { // match
                console.log("match in tree: " + treeLetters.letters[i].letter)
                if(depth == (node.id.length - 1)) {
                    // search no longer - we reached the end of the search word and found it in tree. return this subtree
                    console.log("return found.") ;
                    return tree ; 
                }
                // is there inner depth?
                if(treeLetters.letters[i].ptr != null) {
                    // going deeper in tree
                    console.log("going deeper in tree.") ;
                    treeLetters = treeLetters.letters[i].ptr ;
                }
                else { 
                    // no inner depth in tree 
                    if(depth < (node.id.length - 1)) {
                        // although we have a match so far - the tree isnt going deeper - and the node is.
                        // it means that the word is too long for the tree, and we couldnt find a match in the inner tree.
                        console.log("no match in tree1: " + "need to add ptr: "  + node.id[depth+1] + " depth: " + depth + " nid length: " + (node.id.length - 1)) ;
                        //should we declare this letter as searchword 
                        if (depth + 1 == (node.id.length - 1)) {
                            // this is the last letter of the word
                            setAsWord = true ;
                        }
                        if(depth + 2 <= node.id.length) { // check we dont overflow

                            console.log("string to add to node: " + typeof(node.id) + " " + node.id.length +" " + node.id.substring(0,node.id.length-1));
                            var myNewNode = new initNodeFromWord(node.id.substring(0,depth + 2),setAsWord) ;
                            console.log("myNewNode: " + JSON.stringify(myNewNode))
    //                        console.log("myNewNode: " + node.id.substring(0,depth+1) ) ;
                            treeLetters.letters[i].ptr = wrapNewPtr(myNewNode) ;                            
                            treeLetters = treeLetters.letters[i].ptr ;
                            console.log("treeLetters: " + JSON.stringify(treeLetters));
                            console.log("tree: " + JSON.stringify(tree));
                        }
                        
//                        treeLetters = treeLetters.letters[i].ptr ;
                    }     
                }               
            }
            else {
                if (i == (treeLetters.letters.length -1)) { 
                    // we reched the end of the letters array - and couldn't find a match.
                    // we nned to add a new letter to this array..
                   console.log("no match in tree2: " + "letter exited: "  + node.id[depth] + " depth: " + depth) ;
//                    return null ;

                    console.log("string to add to node: " + typeof(node.id) + " " + node.id.length +" " + node.id.substring(0,depth+1));
                    var myNewNode = new initNodeFromWord(node.id.substring(0,depth+1),setAsWord) ;
                    console.log("myNewNode: " + JSON.stringify(myNewNode))
                    treeLetters.letters.push(myNewNode) ;                            
                    treeLetters = treeLetters.letters[treeLetters.letters.length-1] ;
//                    console.log("treeLetters: " + JSON.stringify(treeLetters));
                    console.log("tree: " + JSON.stringify(tree));
//                    return tree ;
                    }
            }

        }
    }
    return tree ;
}


function treeLettersetLetterI(treeLetters,i) {
    return treeLetters.letters[i] ;
}

function wrapNewPtr(nodes) {
    return {letters: [nodes]} ;
}

function initNodeFromWord(word,setAsWord = true) {
  // always initialize all instance properties
    this.letter = (word.length) > 0 ? word[word.length-1] : null ;
    this.id = (word.length) > 0 ? word : null ; // default value
    this.ptr = null ;
    if(setAsWord == true) {
        this.isWord = true;  
    }      
    this.isNodeWord = function() { this.isWord ? true : false ;}
    this.setNodeWord = function() { this.isWord = true ;}
    this.print = function() {
        console.log(this);
    };
}


class letterNode {
  // always initialize all instance properties
  constructor(word,setAsWord) {
    this.letter = (word.length) > 0 ? word[word.length-1] : null ;
    this.id = (word.length) > 0 ? word : null ; // default value
    this.ptr = null ;
    if(this.setAsWord == true) {
        this.isWord = true;  
    }      
  }

  isNodeWord() { this.isWord ? true : false ;}
  setNodeWord() { this.isWord = true ;}
  print() {
        console.log(this);
  };
}



function searchNodeInTree(tree,node) {
    var depth = 0 ;
    var treeLetters = tree ;

    for (depth in node.id) { // iterate node letter
        console.log("depth:" + depth) ;
        console.log("node depth: " + node.id[depth]) ;
        for(i in treeLetters.letters)  // iterate letters in tree
        {   
            console.log("tree letter:" + treeLetters.letters[i].letter) ;
            if(treeLetters.letters[i].letter == node.id[depth]) { // match
                console.log("match in tree: " + treeLetters.letters[i].letter)
                if(depth == (node.id.length - 1)) {
                    // search no longer - we reached the end of the search word and found it in tree. return this subtree
                    console.log("return found.") ;
                    return treeLetters.letters[i] ; 
                }
                // is there inner depth?
                if(treeLetters.letters[i].ptr != null) {
                    treeLetters = treeLetters.letters[i].ptr ;
                }
                else {
                    if(depth < (node.id.length - 1)) {
                        // it means that the letter is too long for the tree, and we couldnt find a match in the inner tree.
                        console.log("no match in tree: " + "letter exited: "  + node.id[depth] + "depth: " + depth) ;
                        return null ;
                    }                    
                }
            }
            else {
                if (i == (treeLetters.letters.length -1)) { // we reched the end of the letters array - and couldn't find a match.
                   console.log("no match in tree: " + "letter exited: "  + node.id[depth] + "depth: " + depth) ;
                    return null ;
                    }
            }

        }
    }
}





var findSubTreeFromWord = function(tree,word) {
//   var node = new initNodeFromWord('aliverr');

}

var node = new initNodeFromWord('alivezbb',false);

//console.log(node); 
//searchNodeInTree(testTree,node) ;
//node.print() ;
//node.setNodeWord() ;
node.print() ;
var newtree = addToTree(testTree,node) ;
console.log("newtree: " + JSON.stringify(newtree));

var node2 = new initNodeFromWord('aliveybxx',false);
console.log("--------------------------") ;
node2.print() ;
var newtree = addToTree(newtree,node2) ;



 var addWordToTree = function(tree,addition) {    
    return Object.assign(tree,addition) ;
}


function traverseWord(testTree,addition) {
    var i=0; 
    var currentnode = testTree ;
    while(i < addition.length) {
        if(currentnode.letter)
        i++ ;
    }
}



exports.addWordToTree = addWordToTree;
exports.testTree = testTree;
exports.initNodeFromWord = initNodeFromWord ;
