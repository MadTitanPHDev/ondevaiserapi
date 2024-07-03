let Locals = require('../model/Local');
const pool = require('../database/mysql');
const date = new Date();
const LocalController = {
    async criar(req, res) {
        const {nomeLocal, endereco, cep, valor, descr, Usuarios_idUsuarios, TipoLocal_id_tipo} = req.body;
        
            let imgUrl = 'http://localhost:3333/images/'
            if(req.file) {
                imgUrl = imgUrl + `${req.file.filename}`
            }
            let sql = `INSERT INTO local (nomeLocal, endereco, cep, valor, descr, img, Usuarios_idUsuarios, TipoLocal_id_tipo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
            const result = await pool.query(sql, [nomeLocal, endereco, cep, valor, descr, imgUrl, Usuarios_idUsuarios, TipoLocal_id_tipo])
            const insertId = result[0]?.insertId;
            if(!insertId)
                {
                    return res.status(401).json({message: 'erro ao criar o local!'})
                }
            const sql_select = 'SELECT * from local where idLocal = ?'
            const [rows] = await pool.query(sql_select, [insertId])
            return res.status(201).json(rows[0])
    },

    async listar(req, res) {
        let sql = "SELECT * from local";
        const [rows] = await pool.query(sql);

        return res.status(200).json(rows);
    },

    async alterar(req, res) {
        const paramId = req.params.id;

        const {nomeLocal, endereco, cep, valor, descr, Usuarios_idUsuarios, TipoLocal_id_tipo} = req.body;

        let imgUrl = 'http://localhost:3333/images/'
        if(req.file) {
            imgUrl = imgUrl + `${req.file.filename}`
        }

        let sql = "UPDATE local SET nomeLocal = ?, endereco = ?, cep = ?, valor = ?, descr = ?, img = ?, Usuarios_idUsuarios = ?, TipoLocal_id_tipo = ? WHERE idLocal = ?"
        const result = await pool.query(sql, [nomeLocal, endereco, cep, valor, descr, imgUrl, Usuarios_idUsuarios, TipoLocal_id_tipo, Number(paramId)])
        const changedRows = result[0]?.changedRows;
        if(!changedRows)
            {
                return res.status(401).json({message: 'erro ao alterar o local!'})
            }
        const sql_select = 'SELECT * from local where idLocal = ?'
        const [rows] = await pool.query(sql_select, [paramId])

        return res.status(201).json(rows[0]);
    },

    async show(req, res) {
        const paramId = req.params.id;
        const sql_select = 'SELECT * from local where idLocal = ?'
        const [rows] = await pool.query(sql_select, [Number(paramId)])
        return res.status(201).json(rows[0])
    },

    async deletar(req, res) {
        const paramId = req.params.id;
        let sql = `DELETE from local WHERE idLocal = ?`
        const result = await pool.query(sql, [Number(paramId)])
        const affectedRows = result[0]?.affectedRows;
        if(!affectedRows)
            {
                return res.status(401).json({message: 'erro ao deletar o local!'})
            }
        return res.status(200).json({mensagem: "Local deletado com sucesso!"})
    }

    
}

module.exports = LocalController;