class letterNode {
	constructor(word, setAsWord = true) {
		this.letter = (word.length) > 0 ? word[word.length - 1] : null;
        this.id = (word.length) > 0 ? word : null; // default value
		if (setAsWord == true) {
			this.isWord = true;
		}
	}

	isNodeWord() { return this.isWord; }
	setNodeWord() { this.isWord = true; }
	print() {
		console.log(JSON.stringify(this, null, 2));
    }

    toJSON() {
        let {letter, id, isWord} = this;
        var json = {};
        json[letter] = {id, isWord};
        return json;
    }    
}


function isEmptyTree(tree) {
	return (tree == null || Object.keys(tree).length == 0);
}


function intializeTree(tree, node) {
	if (tree == null) {
		tree = {};
	}

	return tree;
}


function setNewLevel(node) {
	let {letter, id, isWord} = node;
	var json = {} ;
	json[letter] = {id, isWord} ;
	return json;
}


function addToTree(tree, node) {
//	console.log("addToTree node to add::" + JSON.stringify(node));

	if (isEmptyTree(tree)) {
		tree = intializeTree(tree, node);
	}
	
	var treeLetters = tree;
	var setAsWord = false;
	var depth = 0;
	var myNewNode;

	for (depth in node.id) { // iterate node string
		depth = parseInt(depth);
		if (node.id.length - 1 == depth && node.isWord == true) { setAsWord = true; }

		if (treeLetters == null) {
			myNewNode = new letterNode(node.id.substring(0, depth + 1), setAsWord);
			treeLetters = setNewLevel(myNewNode);
		}
		
		if (!(node.id[depth] in treeLetters)) { // search letters do not exist for this depth
			myNewNode = new letterNode(node.id.substring(0, depth + 1), setAsWord);
			var newLevel = setNewLevel(myNewNode);
			Object.assign(treeLetters,newLevel) ; 
		}
		
		var treeLetterFound = treeLetters[node.id[depth]] ;	
		if (treeLetterFound != null) { // matched tree letter and node letter.
			if (depth == (node.id.length - 1)) { // this is the last letter of the node.
				// we have this word in tree - we don't need to add anything.
				// search no longer - we reached the end of the search word and found it in tree. return this subtree
				// console.log("nothing to add.");
				return tree;
			}

			// we still have more letters to add into tree...
			// we need to go deeper in tree
			// is there inner depth?
			if (Object.keys(treeLetters).length > 0) {
				// going deeper in tree
				treeLetters = treeLetterFound ;
			}

			// no inner depth in tree 
			if (depth + 1 <= (node.id.length - 1)) { // check we dont overflow
				treeLetters = treeLetterFound;
			}
		}
		else {
			// we reched the end of the letters array - and couldn't find a match.
			// we nned to add a new letter to this array..
			myNewNode = new letterNode(node.id.substring(0, depth + 1), setAsWord);
			Object.assign(treeLetters,myNewNode.toJSON());
			treeLetters = myNewNode.toJSON();
		}

	}
	return tree;
}

function getLettersInLevel(subTree) {
	delete subTree.id ;
	delete subTree.isWord ;
	var letters = Object.keys(subTree) ;
	return letters ;	
}


function getAcWordsFromTree(AcTreeWords) {
	var acWords = [];
	for (var i = 0; i < AcTreeWords.length; ++i) {
		acWords.push(AcTreeWords[i]);
	}
	
	return acWords;
}


function searchTxtInTree(tree, searchTxt) {
	var AcTreeWords = searchTxtInTreeRaw(tree, searchTxt);
	var ret = AcTreeWords != null && Object.keys(AcTreeWords).length !== 0  ? AcTreeWords : null;
	return ret;
}


function pick(o, ...fields) {
    return fields.reduce((a, x) => {
        if(o.hasOwnProperty(x)) a[x] = o[x];
        return a;
    }, {});
}


function searchTxtInTreeRaw(tree, searchTxt) {

	if (isEmptyTree(tree)) {
		return tree;
	}

	var letters = getLettersInLevel(tree) ;
	for (var i in letters) {  // iterate through existing search letters
		if (letters[i] == searchTxt[0]) { // found match in letter i
			if (searchTxt.length == 1) {
				//               console.log("found terminal match.") ;
				var ret  = pick(tree,letters[i]) ;
				return ret;
			}
			else {
				//				console.log("found partial match.") ;
				return searchTxtInTreeRaw(tree[letters[i]], searchTxt.substring(1, searchTxt.length));
			}
		}
	}
	return {} ;  // no result
}


function searchWordsInSubTree(tree, words = []) {
	if (tree == null) {
		return words;
	}

	var letters = getLettersInLevel(tree) ;
	for (var i in letters) {  // iterate through letters		
		if (tree[letters[i]].isWord != null) { // found word
			var word = tree[letters[i]].id;
			word.ptr = null;
			words.push(word);
		}
		searchWordsInSubTree(tree[letters[i]], words);
	}
	return words;
}


function autocomplete(tree, searchWord) {
	var subTree = searchTxtInTree(tree, searchWord);
	return getAcWordsFromTree(searchWordsInSubTree(subTree));
}


function autocompleteInput(tree) {
	var res;
	args = process.argv.slice(2);
	args.forEach(function (search, index, array) {
		res = autocomplete(tree, search) ;
	});
	return res == undefined ? [] : res ;
}

exports.letterNode = letterNode;
exports.addToTree = addToTree;
exports.searchTxtInTree = searchTxtInTree;
exports.searchWordsInSubTree = searchWordsInSubTree;
exports.autocomplete = autocomplete;
exports.autocompleteInput = autocompleteInput;
