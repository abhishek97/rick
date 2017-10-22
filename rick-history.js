const fs = require('fs-extra')
const Commit = require('./lib/commit')

const headCommitId = fs.readFileSync(process.cwd()+'/.rick/HEAD').toString()

const headCommit = new Commit(headCommitId)

headCommit.build().then( () => {
	let it = headCommit
	while (it) {
		console.log('| >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> |')
		console.log('|')
		console.log('|', 'Commit Id:', it.head)
		console.log('|', 'Commit Author:', it.meta.author)
		console.log('|', 'Commit Message:', it.meta.message)
		console.log('|', 'Timestamp:', it.meta.timestamp)
		console.log('|')
		console.log('| <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< |')
		console.log('')
		it = it.previous
	}
	
})