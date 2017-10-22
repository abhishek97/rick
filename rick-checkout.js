const t = require('tar')
const commitId = process.argv[2]

console.log(commitId)

t.x({
	file: process.cwd() + `/.rick/objects/${commitId}/commit.tar`
}).then( () => {
	console.log('DONE')
})