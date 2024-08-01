let caracGeral = require('../model/CaracGeral');
const pool = require('../database/mysql');
const date = new Date();

const CaracGeralController = {
    async criar(req, res) {
        const {nomeCarac} = req.body;
        
            let imgUrl = 'http://localhost:3333/images/'
            if(req.file) {
                imgUrl = imgUrl + `${req.file.filename}`
            }
            let sql = `INSERT INTO caracgeral (nomeCarac) VALUES (?)`
            const result = await pool.query(sql, [nomeCarac])
            const insertId = result[0]?.insertId;
            if(!insertId)
                {
                    return res.status(401).json({message: 'erro ao criar característica!'})
                }
            const sql_select = 'SELECT * from caracgeral where idCaracGeral = ?'
            const [rows] = await pool.query(sql_select, [insertId])
            return res.status(201).json(rows[0])
    },

    async listar(req, res) {
        let sql = "SELECT * from caracgeral";
        const [rows] = await pool.query(sql);

        return res.status(200).json(rows);
    },

    async alterar(req, res) {
        const paramId = req.params.id;

        const {nomeCarac} = req.body;

        let imgUrl = 'http://localhost:3333/images/'
        if(req.file) {
            imgUrl = imgUrl + `${req.file.filename}`
        }

        let sql = "UPDATE caracgeral SET nomeCarac = ? WHERE idCaracGeral = ?"
        const result = await pool.query(sql, [nomeCarac, Number(paramId)])
        const changedRows = result[0]?.changedRows;
        if(!changedRows)
            {
                return res.status(401).json({message: 'erro ao alterar característica!'})
            }
        const sql_select = 'SELECT * from caracgeral where idCaracGeral = ?'
        const [rows] = await pool.query(sql_select, [paramId])

        return res.status(201).json(rows[0]);
    },

    async show(req, res) {
        const paramId = req.params.id;
        const sql_select = 'SELECT * from caracgeral where idCaracGeral = ?'
        const [rows] = await pool.query(sql_select, [Number(paramId)])
        return res.status(201).json(rows[0])
    },

    async deletar(req, res) {
        const paramId = req.params.id;
        let sql = `DELETE from caracgeral WHERE idCaracGeral = ?`
        const result = await pool.query(sql, [Number(paramId)])
        const affectedRows = result[0]?.affectedRows;
        if(!affectedRows)
            {
                return res.status(401).json({message: 'erro ao deletar característica!'})
            }
        return res.status(200).json({mensagem: "Característica deletada com sucesso!"})
    }

    
}

module.exports = CaracGeralController;