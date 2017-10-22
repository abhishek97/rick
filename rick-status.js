const { Directory } = require('./lib/tree')
const diff = require('./lib/diff')
const U = require('./utils')

const R = require('ramda')
const chalk = require('chalk')
const fs = require('fs-extra')

if(!U.isValidRepo(process.cwd())) {
    console.log(chalk.red('Not a valid rick repo, Morty!'))
    process.exit(0)
}

const cwdTree = new Directory(process.cwd())
const headTree = JSON.parse(fs.readFileSync(process.cwd()+ '/.rick/headtree.json').toString())
//const genesisTree = new Directory(process.cwd() + '/.rick')

cwdTree.build()
    .then(_ => {
    	//console.log(cwdTree, headTree)
    	const files =  R.flatten(diff (headTree, cwdTree))
        const changed = U.getChanged(files)
        const New = U.getNew(files)
        console.log(">>>>>>>>>>>>>>> Unstaged Changes <<<<<<<<<<<<<<<<<<<<<<<<")

        console.log('Changed:')
        changed.forEach( file => {
            const path = file.path.replace(process.cwd() + '/', "")
            console.log(chalk.yellow(path))
        })
        console.log('\nNew:')
        New.forEach( file => {
            const path = file.path.replace(process.cwd() + '/', "")
            console.log(chalk.green(path))
        })
    })
    .catch(e => console.error(e))



