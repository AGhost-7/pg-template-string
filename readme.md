Simple module allowing you to write postgresql queries from Javascript
succinctly.

The template string tag returns a promise of the result set. Example:
```javascript

const pg = require('pg')
const pool = new pg.Pool({
	database: 'template1',
	user: 'postgres',
	host: 'postgres'
})
const pgTemplateString = require('pg-template-string')
const sql = pgTemplateString(pool)

var people = [
	{ name: 'doge' },
	{ name: 'Le Lenny' },
	{ name: 'Pepe' }
]

var personsInDb = sql`create table person (
	name text
)`.then(() => {
	return Promise.map(people, (person) => sql`insert into person values(${person.name})`)
})
.then(() => sql`select * from person`)
```

