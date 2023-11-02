// requiere(), es una f() especial de exp., que nos permite importar las librerías instaladas con npm
const express = require('express')

// App con express para recibir peticiones y responderlas, variable que almacena esta app.
// De esta manera se genera una copia (instancia) del servidor que se va a utilizar.
const app = express()

// Cada vez que un cliente solicite un recurso se realiza una acción.
app.get('/', (req, res) => {
	res.send('Hola internauta!')
})

// Escuchando las peticiones de los clientes por medio de un puerto (callback, puerto).
app.listen(8080, () => {
	console.log('Servidor funcionando');
})
