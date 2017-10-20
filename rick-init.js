const fs = require('fs-extra')
const U = require('./utils')
const cwd = process.cwd()

async function setupFilesystem () {
    if ( await U.isValidRepo(cwd)) {
        console.log('Already a Rick repo, Morty!')
        process.exit(0)
    }

    console.log(`Initialing Repo...`, cwd + '/.rick')
    const baseDir = cwd + '/.rick'
    await fs.outputFile(baseDir+ '/HEAD', 'refs/heads/master')
    await Promise.all([fs.mkdir(baseDir + '/objects'), fs.mkdir(baseDir + '/refs')])
}

setupFilesystem().then( () => {
    console.log('Done.')
    process.exit(0)
})