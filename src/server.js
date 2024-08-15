const express = require('express');
const dotenv = require('dotenv');
const rotas = require('./routes');
const path = require('path');
const cors = require('cors');

dotenv.config();
const server = express();
server.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'UPDATE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({extended: true}));
server.use(express.json());

server.use(rotas);
server.use((req, res) => {
    res.send('Rota não encontrada')
});

server.listen(process.env.PORTA)