const { Directory } = require('./lib/tree')

const cwdTree = new Directory(process.cwd())
const genesisTree = new Directory(process.cwd() + '/.rick')

function diff (head, current) {
    if (head.hash === current.hash)
        return false

    current.children.forEach()
}

cwdTree.build()
    .then(_ => console.log(cwdTree))
    .catch(e => console.error(e))



