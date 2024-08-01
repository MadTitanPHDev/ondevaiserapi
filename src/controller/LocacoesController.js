let locacoes = require('../model/Locacoes');
const pool = require('../database/mysql');
const date = new Date();

const LocacoesController = {
    async criar(req, res) {
        const {Usuarios_idUsuarios, Local_idLocal} = req.body;
        
            let imgUrl = 'http://localhost:3333/images/'
            if(req.file) {
                imgUrl = imgUrl + `${req.file.filename}`
            }
            let sql = `INSERT INTO locacoes (Usuarios_idUsuarios, Local_idLocal) VALUES (?, ?)`
            const result = await pool.query(sql, [Usuarios_idUsuarios, Local_idLocal])
            const insertId = result[0]?.insertId;
            if(!insertId)
                {
                    return res.status(401).json({message: 'erro ao criar locacao!'})
                }
            const sql_select = 'SELECT * from locacoes where idlocacoes = ?'
            const [rows] = await pool.query(sql_select, [insertId])
            return res.status(201).json(rows[0])
    },

    async listar(req, res) {
        let sql = "SELECT * from locacoes";
        const [rows] = await pool.query(sql);

        return res.status(200).json(rows);
    },

    async alterar(req, res) {
        const paramId = req.params.id;

        const {Usuarios_idUsuarios, Local_idLocal} = req.body;

        let imgUrl = 'http://localhost:3333/images/'
        if(req.file) {
            imgUrl = imgUrl + `${req.file.filename}`
        }

        let sql = "UPDATE locacoes SET Usuarios_idUsuarios = ?, Local_idLocal = ? WHERE idlocacoes = ?"
        const result = await pool.query(sql, [Usuarios_idUsuarios, Local_idLocal, Number(paramId)])
        const changedRows = result[0]?.changedRows;
        if(!changedRows)
            {
                return res.status(401).json({message: 'erro ao alterar locacao!'})
            }
        const sql_select = 'SELECT * from locacoes where idlocacoes = ?'
        const [rows] = await pool.query(sql_select, [paramId])

        return res.status(201).json(rows[0]);
    },

    async show(req, res) {
        const paramId = req.params.id;
        const sql_select = 'SELECT * from locacoes where idlocacoes = ?'
        const [rows] = await pool.query(sql_select, [Number(paramId)])
        return res.status(201).json(rows[0])
    },

    async deletar(req, res) {
        const paramId = req.params.id;
        let sql = `DELETE from locacoes WHERE idlocacoes = ?`
        const result = await pool.query(sql, [Number(paramId)])
        const affectedRows = result[0]?.affectedRows;
        if(!affectedRows)
            {
                return res.status(401).json({message: 'erro ao deletar locacao!'})
            }
        return res.status(200).json({mensagem: "Locacao deletada com sucesso!"})
    }

    
}

module.exports = LocacoesController;