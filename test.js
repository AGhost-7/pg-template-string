const pg = require('pg')
const pool = new pg.Pool({
	database: 'template1',
	user: 'postgres',
	host: 'postgres'
})
const pgTemplateString = require('./index')
const sql = pgTemplateString(pool)

describe('params', () => {

	it('can connect', () => {
		return pgTemplateString
			._queryWith(pool, 'select count(*) from information_schema.columns', [])
	})

	it('single param query', () => {
		const char = 'c%'
		return sql`select * from information_schema.columns where column_name like ${char}`
	})

	it('query without params', () => {
		return sql`select * from information_schema.columns`
	})

	it('query with more that one param', () => {
		const char1 = 'b%'
		const char2 = 'c%'
		return sql`
			select count(*)
			from information_schema.columns
			where column_name like ${char1} or column_name like ${char2}
		`.then((res) => {
			console.log('res:', res)
		})
	})
})
