const pool = require('../database/mysql');
const FavoritosController = {
    async criar(req, res) {
        const { idFavoritos, Usuarios_idUsuarios, Local_idLocal } = req.body;


        let sql = `INSERT INTO favoritos (Usuarios_idUsuarios, Local_idLocal) VALUES (?, ?)`
        const result = await pool.query(sql, [Usuarios_idUsuarios, Local_idLocal])
        const insertId = result[0]?.insertId;
        if (!insertId) {
            return res.status(401), json({ message: 'erro ao criar favorito' })
        }
        const sql_select = 'SELECT * FROM favoritos WHERE idFavoritos'
        const [rows] = await pool.query(sql_select, [insertId])
        return res.status(201).json(rows[0])

    },

    async listar(req, res) {
        let sql = "SELECT * FROM favoritos";
        const [rows] = await pool.query(sql);

        return res.status(200).json(rows);
    },

    
}