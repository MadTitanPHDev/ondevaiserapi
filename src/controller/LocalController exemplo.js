let Locals = require('../model/Local');
const pool = require('../database/mysql');
const CaracGeralController = require('./caracGeralController');

const LocalController = {
    async criar(req, res) {
        const { nomeLocal, endereco, cep, valor, descr, Usuarios_idUsuarios, TipoLocal_id_tipo, caracteristicas } = req.body;

        let imgUrl = 'http://localhost:3333/images/';
        if (req.file) {
            imgUrl += req.file.filename;
        }

        try {
            // Cria o local
            let sql = `INSERT INTO local (nomeLocal, endereco, cep, valor, descr, img, Usuarios_idUsuarios, TipoLocal_id_tipo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            const result = await pool.query(sql, [nomeLocal, endereco, cep, valor, descr, imgUrl, Usuarios_idUsuarios, TipoLocal_id_tipo]);
            const insertId = result[0]?.insertId;

            if (!insertId) {
                return res.status(401).json({ message: 'Erro ao criar o local!' });
            }

            // Associa as características ao local
            if (caracteristicas && caracteristicas.length > 0) {
                const sqlInsertCaracteristicas = `INSERT INTO caracLocal (Local_idLocal, Local_Usuarios_idUsuarios, CaracGeral_idCaracGeral) VALUES ?`;
                const values = caracteristicas.map(caracId => [insertId, Usuarios_idUsuarios, caracId]);

                await pool.query(sqlInsertCaracteristicas, [values]);
            }

            // Retorna o local criado com as características associadas
            const sqlSelect = 'SELECT * FROM local WHERE idLocal = ?';
            const [rows] = await pool.query(sqlSelect, [insertId]);

            return res.status(201).json(rows[0]);
        } catch (error) {
            console.error('Erro ao criar o local:', error);
            return res.status(500).json({ message: 'Erro ao criar o local.' });
        }
    },

    async listar(req, res) {
        try {
            let sql = 'SELECT * FROM local';
            const [rows] = await pool.query(sql);

            // Aqui você poderia incluir as características associadas a cada local
            // Consultar a tabela de características associadas e incluir no retorno

            return res.status(200).json(rows);
        } catch (error) {
            console.error('Erro ao listar locais:', error);
            return res.status(500).json({ message: 'Erro ao listar locais.' });
        }
    }

    
};

module.exports = LocalController;
