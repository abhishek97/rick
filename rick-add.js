const { Directory } = require('./lib/tree')

const R = require('ramda')
const fs = require('fs-extra')

const flags = process.argv.splice(2)
console.log(flags)

if (flags.includes('-A')) {
	// the current cwd goes in the staging area
	const cwdTree = new Directory(process.cwd())
	cwdTree.build().then( () => {
		fs.writeFileSync(process.cwd() + '/.rick/stage.json', JSON.stringify(cwdTree) )
		console.log("Done")
		process.exit(0)
	})

} else {
	process.exit(0)
}