const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');
const path = require('path');

const { PORT } = process.env
// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use( cors() );

// Directorio Público
app.use(express.static('public', {
    setHeaders: function (res, path) {
      if (path.endsWith('.js')) {
        res.type('application/javascript');
      }
    }
}));
  

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

/** Para cualquier otra petición */
app.get('*', ( req, res ) => {
    res.sendFile( path.join( __dirname+'/public/index.html' ) );
});

// Escuchar peticiones
app.listen( PORT, () => {
    console.log(`Servidor corriendo en puerto ${ PORT }`);
} );