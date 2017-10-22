const fs = require('fs-extra')
const chalk = require('chalk')
const U = require('./utils')
const { Directory } = require('./lib/tree')
const cwd = process.cwd()

async function setupFilesystem () {
    if ( U.isValidRepo(cwd)) {
        console.log(chalk.red('Already a Rick repo, Morty!'))
        process.exit(0)
    }

    console.log(`Initialing Repo...`, cwd + '/.rick')
    const baseDir = cwd + '/.rick'
    await fs.outputFile(baseDir+ '/HEAD', 'GENESIS')
    await Promise.all([fs.mkdir(baseDir + '/objects'), fs.mkdir(baseDir + '/refs')])
    const cwdTree = new Directory(process.cwd())
    await cwdTree.build()
    await fs.outputFile(baseDir+ '/headtree.json', JSON.stringify(cwdTree) )
}

setupFilesystem().then( () => {
    console.log('Done!, Time to get Schwifty ;)')
    process.exit(0)
})