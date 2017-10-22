const R = require('ramda')
const fs = require('fs-extra')

class Commit {
	constructor (HEAD) {
		this.head = HEAD.trim()
	}

	async build () {
		const metaFile = await fs.readFile(process.cwd() + `/.rick/objects/${this.head}/meta.json`)
		this.meta = JSON.parse(metaFile.toString())
		if (this.meta.previousCommit === 'GENESIS')
			return ;
		this.previous = new Commit(this.meta.previousCommit)
		await this.previous.build()
	}
}

module.exports = Commit