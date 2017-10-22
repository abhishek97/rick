/**
 * Created by abhishek on 08/10/17.
 */

const fs = require('fs-extra')
const crypto = require('crypto')
const R = require('ramda')

const filterByStatus = (status) => R.filter(R.propEq("status", status))

module.exports = {
    isValidRepo (cwd) {
        try {
            const stats = fs.statSync(cwd + '/.rick')
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
        if (typeof data === 'object')
            data = JSON.stringify(data)
        return crypto.createHash('sha1').update(data).digest('hex')
    },
    getChanged: filterByStatus("changed"),
    getNew: filterByStatus("new"),
    getDeleted: filterByStatus("deleted")
}
