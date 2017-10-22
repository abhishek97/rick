const R = require('ramda')

function diff (head, current) {
    if (head.hash === current.hash)
        return false

    const headChildren = head.children
    const currentChildren = current.children

    const children = currentChildren.map(child => {
    	const findElement = R.find(R.propEq('path', child.path))
    	const file = findElement(headChildren)
    	if (file) {
    		if ( file.hash !== child.hash ) {
    			// file is different
    			if ( file.type === 'dir' )
    				return diff (file, child)
    			else 
	    			return {
	    				path: child.path,
	    				status: 'changed'
	    			}
    		} else {
    			// file is same
    			return {
    				path: child.path,
    				status: 'unchanged'
    			}
    		}
    	} else {
    		// file is new
    		return {
    			path: child.path,
    			status: 'new'
    		}
    	}
    })

    return children
}

module.exports = diff