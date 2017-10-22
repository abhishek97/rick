const fs = require('fs-extra')
const t = require('tar')

const { Directory } = require('./lib/tree')
const U = require('./utils')

const msg = process.argv[2]

if (!msg || msg === "") {
	console.error("Specify Commit Message")
	process.exit(-1)
}

const stageDir = process.cwd()+'/.rick/stage.json'
let stage = {}
try {
	stage = JSON.parse(fs.readFileSync(stageDir))
} catch (e) {
	console.error("Nothing in the staging Area!")
	process.exit(-1)
}

if (!stage || stage.children.length == 0) {
	console.error("Nothing in the staging Area!")
	process.exit(-1)
}

const files = stage.children.map(file => file.path.replace(process.cwd(), '.'))

const compressStream = t.c({
	gzip: true
}, files)


const meta = {
	author: process.env.AUTHOR || "Anon",
	message: msg,
	previousCommit: fs.readFileSync(process.cwd() + `/.rick/HEAD`).toString(),
	timestamp: +new Date()
}

const fileName = U.hash({stage, meta})


fs.ensureDirSync(process.cwd()+`/.rick/objects/${fileName}`)


const out = fs.createWriteStream(process.cwd() + `/.rick/objects/${fileName}/commit.tar`)
compressStream.pipe(out)

const cwdTree = new Directory(process.cwd())

fs.outputFile(process.cwd()+`/.rick/objects/${fileName}/meta.json`, JSON.stringify(meta))
fs.outputFile(process.cwd()+`/.rick/HEAD`, fileName)

const treeBuild = cwdTree.build().then( () => fs.outputFile(process.cwd()+`/.rick/headtree.json`, JSON.stringify(cwdTree)) )

const pipeFinish = new Promise ( (resolve, reject) => {
	out.on('finish', (err) => {
		console.log('Done')
		console.log('COMMIT-ID:', fileName)
		fs.unlinkSync(stageDir)
		resolve()
	})
})

Promise.all([pipeFinish, treeBuild]).then( () => process.exit(0))











