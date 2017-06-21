
const debug = require('debug')('pg-template-string')

const queryWith = (con, query, params) => {
	debug('query: %s, params %s', query, params)
	return new Promise((resolve, reject) => {
		con.connect((err, con, done) => {
			if(err) {
				return reject(err)
			}
			con.query(query, params, (err, result) => {
				done()
				if(err) {
					return reject(err)
				}
				resolve(result)
			})
		})
	})
}

module.exports = (con) => {
	return (parts, ...params) => {
		var query = ''
		for(var i = 0; i < parts.length; i++) {
			query += parts[i]
			if(i < parts.length - 1) {
				query += '$' + (i + 1)
			}
		}
		return queryWith(con, query, params)
	}
}

module.exports._queryWith = queryWith
