const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// Crea una connessione al tuo database MySQL
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'db',     // Indirizzo del tuo database
  user: process.env.MYSQL_USER || 'dev',          // Nome utente del database
  password: process.env.MYSQL_PASSWORD || 'password',      // Password del database
  database: process.env.MYSQL_DATABASE || 'book'   // Nome del database
});

// Controlla lo stato della connessione al database
connection.connect((error) => {
  if (error) {
    console.error('Errore durante la connessione al database:', error);
  } else {
    console.log('Connessione al database MySQL stabilita con successo!');
  }
});

// Crea un'applicazione Express
const app = express();

// Aggiungi middleware per il parsing del corpo delle richieste
app.use(express.json());

// Aggiungi middleware per il supporto CORS
const corsOptions = {
  origin: '*',
};
app.use(cors(corsOptions));

// Definisci le tue API

// Esempio di API per ottenere tutti i libri dal database
app.get('/api/books', (req, res) => {
  const query = 'SELECT isbn, titolo, autore, categoria, copertina, prezzo, preso, descrizione FROM books';

  // Esegui la query sul database
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Errore durante l\'esecuzione della query:', error);
      res.status(500).json({ error: 'Errore del server' });
    } else {
      res.json(results);
    }
  });
});

// Esempio di API per ottenere un libro specifico dal database
app.get('/api/books/:param', (req, res) => {
  const param = req.params.param;
  const query = 'SELECT isbn, titolo, prezzo FROM books WHERE isbn = ? OR titolo = ?';

  // Esegui la query utilizzando un'API o un modulo per l'accesso al database

  connection.query(query, [param, param], (error, results) => {
    if (error) {
      console.error('Errore durante la query:', error);
      res.status(500).json({ error: 'Errore durante la query del libro' });
    } else {
      if (results.length > 0) {
        const book = results[0];
        res.json(book);
      } else {
        res.status(404).json({ error: 'Nessun libro trovato' });
      }
    }
  });
});

// Avvia il server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
