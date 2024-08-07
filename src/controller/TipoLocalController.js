let TipoLocal = require('../model/TipoLocal');
const pool = require('../database/mysql');

const TipoLocalController = {
    async criar(req, res) {
        const { nome_tipo } = req.body;
        let sql = `INSERT INTO tipoLocal(nome_tipo) VALUES (?)`

        const result = await pool.query(sql, [nome_tipo])
        const insertId = result[0]?.insertId;
        if (!insertId) {
            return res.status(401).json({ message: 'erro ao criar tipo de local' })
        }

        const sql_select = 'SELECT * FROM tipoLocal WHERE id_tipo = ?'

        const [rows] = await pool.query(sql_select, [insertId])
        return res.status(201).json(rows[0])
    },

    async listar(req, res) {
        let sql = "SELECT * FROM tipolocal";
        const [rows] = await pool.query(sql);

        return res.status(200).json(rows);
    },

    async alterar(req, res) {
        const paramId = req.params.id;

        const { nome_tipo } = req.body;

        let sql = "UPDATE tipoLocal SET nome_tipo = ? WHERE id_tipo = ?"
        const result = await pool.query(sql, [nome_tipo, Number(paramId)])

        const changedRows = result[0]?.changedRows;
        if (!changedRows) {
            return res.status(401).json({ message: 'erro ao alterar tipo de local' })

            const sql_select = "SELECT * FROM tipoLocal WHERE id_tipo = ?"
            const [rows] = await pool.query(sql_select, [paramId])

            return res.status(201).json(rows[0]);
        }
    },

    async show(req, res) {
        const paramId = req.params.id;

        const sql_select = "SELECT * FROM tipoLocal WHERE id_tipo = ?"

        const [rows] = await pool.query(sql_select, Number(paramId))

        return res.status(201).json(rows[0])
    },

    async deletar(req, res) {
        const paramId = req.params.id;

        let sql = `DELETE FROM tipoLocal WHERE id_tipo = ?`

        const result = await pool.query(sql, [Number(paramId)])
        const affectedRows = result[0]?.affectedRows;
        if (!affectedRows) {
            return res.status(401).json({ message: 'erro ao deletar tipo de local' })
        }
        return res.status(200).json({ mensagem: "tipo de local deletado com sucesso!" })
    }
}

module.exports = TipoLocalController;