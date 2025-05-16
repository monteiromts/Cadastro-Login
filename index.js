const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123321',
  database: 'safe',
});

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conectado ao MySQL');
});

// Criar tabela users com campos para cadastro (id, nome, matricula, email, password)
const createTable = `
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  matricula VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
)`;

db.query(createTable, err => {
  if (err) console.error('Erro ao criar tabela:', err);
});

// Rota POST para cadastrar usuário
app.post('/api/users', async (req, res) => {
  const { nome, matricula, email, password } = req.body;

  if (!nome || !matricula || !email || !password) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    // Criptografa a senha com bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (nome, matricula, email, password) VALUES (?, ?, ?, ?)';
    db.query(sql, [nome, matricula, email, hashedPassword], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ error: 'E-mail ou Matrícula já cadastrado.' });
        }
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Usuário cadastrado com sucesso!', id: result.insertId });
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
