class letterNode {
	constructor(word, setAsWord = true) {
		this.letter = (word.length) > 0 ? word[word.length - 1] : null;
		this.id = (word.length) > 0 ? word : null; // default value
		if (setAsWord == true) {
			this.isWord = true;
		}
		this.ptr = null;
	}

	isNodeWord() { return this.isWord; }
	setNodeWord() { this.isWord = true; }
	print() {
		console.log(JSON.stringify(this, null, 2));
	}
}


function isEmptyTree(tree) {
	return (tree == null || tree.letters == null || tree.letters.length == 0);
}


function intializeTree(tree, node) {
	if (tree == null || tree.letters == null) {
		tree = { letters: [] };
	}

	if (tree.letters.length == 0) {
		var myNewNode = new letterNode(node.id[0], false);
		tree.letters[0] = myNewNode;
	}

	return tree;
}


function setNewLevel(nodes) {
	return { letters: [nodes] };
}


function addToTree(tree, node) {
	console.log("node to add::" + JSON.stringify(node));

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

		if (treeLetters.letters == null) { // search letters do not exist for this depth
			myNewNode = new letterNode(node.id.substring(0, depth + 1), setAsWord);
			treeLetters.ptr = setNewLevel(myNewNode);
			treeLetters = treeLetters.ptr; // adding a new depth
		}

		for (var i in treeLetters.letters) {  // iterate through existing search letters
			if (treeLetters.letters[i].letter == node.id[depth]) { // matched tree letter and node letter.
				if (depth == (node.id.length - 1)) { // this is the last letter of the node.
					// we have this word in tree - we don't need to add anything.
					// search no longer - we reached the end of the search word and found it in tree. return this subtree
					// console.log("nothing to add.");
					treeLetters.letters[i].letter.isWord = node.isWord == true;
					return tree;
				}

				// we still have more letters to add into tree...
				// we need to go deeper in tree
				// is there inner depth?
				if (treeLetters.letters[i].ptr != null) {
					// going deeper in tree
					treeLetters = treeLetters.letters[i].ptr;
					break;
				}

				// no inner depth in tree 
				if (depth + 1 <= (node.id.length - 1)) { // check we dont overflow
					treeLetters = treeLetters.letters[i];
					break;
				}
			}
			else {
				if (i == (treeLetters.letters.length - 1)) {
					// we reched the end of the letters array - and couldn't find a match.
					// we nned to add a new letter to this array..
					myNewNode = new letterNode(node.id.substring(0, depth + 1), setAsWord);
					//                    console.log("myNewNode: " + JSON.stringify(myNewNode))
					treeLetters.letters.push(myNewNode);
					treeLetters = treeLetters.letters[treeLetters.letters.length - 1];

				}
			}

		}
	}
	return tree;
}


function getAcWordsFromTree(AcTreeWords) {
	var acWords = [];
	for (var i = 0; i < AcTreeWords.length; ++i) {
		acWords.push(AcTreeWords[i].id);
	}
	return acWords;
}


function searchTxtInTree(tree, searchTxt) {
	var AcTreeWords = searchTxtInTreeRaw(tree, searchTxt);
	var ret = AcTreeWords !== undefined ? AcTreeWords.ptr : null;
	return ret;
}


function searchTxtInTreeRaw(tree, searchTxt) {
	if (tree == null) {
		return null;
	}

	for (var i in tree.letters) {  // iterate through existing search letters
		if (tree.letters[i].letter == searchTxt[0]) { // found match in letter i
			if (searchTxt.length == 1) {
				//               console.log("found terminal match.") ;
				return tree.letters[i];
			}
			else {
				//                console.log("found partial match.") ;
				return searchTxtInTreeRaw(tree.letters[i].ptr, searchTxt.substring(1, searchTxt.length));
			}
		}
	}
}


function searchWordsInSubTree(tree, words = []) {
	if (tree == null) {
		return words;
	}

	for (var i in tree.letters) {  // iterate through letters
		if (tree.letters[i].isWord != null) { // found word
			var word = tree.letters[i];
			word.ptr = null;
			words.push(word);
		}
		searchWordsInSubTree(tree.letters[i].ptr, words);
	}
	return words;
}


function searchNodeInTree(tree, node) {
	var depth = 0;
	var treeLetters = tree;
	//    console.log("node to add::" + node.print());

	for (depth in node.id) { // iterate node letter
		for (var i in treeLetters.letters)  // iterate letters in tree
		{
			if (treeLetters.letters[i].letter == node.id[depth]) { // match
				//              console.log("match in tree: " + treeLetters.letters[i].letter)
				if (depth == (node.id.length - 1)) {
					// search no longer - we reached the end of the search word and found it in tree. return this subtree
					//                  console.log("return found.");
					return treeLetters.letters[i];
				}
				// is there inner depth?
				if (treeLetters.letters[i].ptr != null) {
					treeLetters = treeLetters.letters[i].ptr;
				}
				else {
					if (depth < (node.id.length - 1)) {
						// it means that the letter is too long for the tree, and we couldnt find a match in the inner tree.
						//                    console.log("no match in tree: " + "letter exited: " + node.id[depth] + "depth: " + depth);
						return null;
					}
				}
			}
			else {
				if (i == (treeLetters.letters.length - 1)) { // we reched the end of the letters array - and couldn't find a match.
					//              console.log("no match in tree: " + "letter exited: " + node.id[depth] + "depth: " + depth);
					return null;
				}
			}

		}
	}
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
