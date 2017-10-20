/**
 * Created by abhishek on 08/10/17.
 */

/**
 * Class definition for a binary tree of hashes
 */

const U = require('../utils')
const fs = require('fs-extra')

/**
 * File  { hash, path, type }
 */
class File {

    constructor (filePath, filename) {
        this.name = filename
        this.path = filePath
        this.type = 'file'
    }

    async build () {
        const dataHash = await U.hashOfFile(this.path)
        this.hash = U.hash(this.name + dataHash)
    }
}

class Directory {

    constructor (dir, dirName) {
        this.path = dir
        this.type = 'dir'
        this.name = dirName
        this.children = []
    }

    async build () {
        let files = await fs.readdir(this.path)
        files = files.filter(f => f !== '.rick')
        const allChildren = files.map( async filename => {
            const filePath = this.path + '/' + filename
            const file = await fs.stat(filePath)
            if (file.isDirectory())
                return new Directory(filePath, filename)
            else
                return new File(filePath, filename)
        })

        this.children = await Promise.all(allChildren)
        await Promise.all(this.children.map(child => child.build()))
        this.hash = U.hash(this.name + this.children.map(child => child.hash).join(''))
    }
}

module.exports = {
    File,
    Directory
}