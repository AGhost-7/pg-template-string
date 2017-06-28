Simple module allowing you to write postgresql queries from Javascript
succinctly.

The template string tag returns a promise of the result set. Example:
```javascript

var people = [
	{ name: 'doge' },
	{ name: 'Le Lenny' },
	{ name: 'Pepe' }
]

var personsInDb = `create table person (
	name text
)`.then(() => {
	return Promise.map(people, (person) => `insert into person values(${person.name})`)
})
.then(() => `select * from person`)
```

