// Versión simplificada para diagnóstico
const express = require("express");
const cors = require('cors');

console.log('🚀 Iniciando servidor simplificado...');

const app = express();
const port = 8084;

// Middlewares básicos
app.use(express.json());
app.use(cors());

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Servidor funcionando',
    timestamp: new Date().toISOString()
  });
});

// Ruta de login simplificada para pruebas
app.post('/users/login', (req, res) => {
  const { login, password } = req.body;
  
  console.log('Login attempt:', { login, password });
  
  // Credenciales de prueba hardcodeadas
  if (login === 'admin' && password === 'password123') {
    return res.json({
      res: {
        message: "Autenticación correcta",
        token: "test-token-123",
        name: "Admin Test"
      }
    });
  }
  
  return res.status(401).json({
    status: 'error',
    message: 'Usuario o contraseña incorrectos'
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`✅ Servidor simplificado funcionando en puerto ${port}`);
  console.log(`🔗 Prueba: http://localhost:${port}`);
  console.log(`🔐 Login: POST http://localhost:${port}/users/login`);
});

module.exports = app;
