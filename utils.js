/**
 * Created by abhishek on 08/10/17.
 */

const fs = require('fs-extra')
const crypto = require('crypto')

module.exports = {
    async isValidRepo (cwd) {
        try {
            const stats = await fs.stat(cwd + '/.rick')
            return stats.isDirectory()
        } catch (e) {
            return false
        }
    },
    async hashOfFile (path) {
        const data = await fs.readFile(path)
        return crypto.createHash('sha1').update(data).digest('hex')
    },
    hash (data) {
        return crypto.createHash('sha1').update(data).digest('hex')
    }
}
