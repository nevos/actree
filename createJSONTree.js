var actree = require("./acTree");

exports.createJSONTree = function createJSONTree() {
	// create tree 
	var tree;

	var fs = require("fs"),
		readline = require("readline");

	var rd = readline.createInterface({
		input: fs.createReadStream("sampleList"),
		console: false
	});

	rd.on("line", function (line) {
		var node = new actree.letterNode(line, true);
		tree = actree.addToTree(tree, node);
	});


	rd.on("close", function (line) {
		fs.writeFile("./data.json", JSON.stringify(tree), "utf-8", function (err) {
			if (err) {
				return console.log(err);
			}
			console.log("The file was saved!");
		});
	});
}
