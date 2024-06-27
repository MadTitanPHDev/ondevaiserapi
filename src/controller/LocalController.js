let Locals = require('../model/Local');
const pool = require('../database/mysql');
const date = new Date();
const LocalController = {
    async criar(req, res) {
        const {nomeLocal, endereco, cep, valor, carac, descr} = req.body;
        
            let imgUrl = 'http://localhost:3333/images/'
            if(req.file) {
                imgUrl = imgUrl + `${req.file.filename}`
            }

            const novoLocal = {
                id: Locals[Locals.length-1]?.id ? Locals[Locals.length-1]?.id+1 : 1,
                nomeLocal: nomeLocal,
                endereco: endereco,
                cep: cep,
                valor: valor,
                // carac: carac,
                descr: descr,
                img: imgUrl
            }
            // Locals.push(novoLocal);
            let sql = `INSERT INTO local (nomeLocal, endereco, cep, valor, descr, img) VALUES (?, ?, ?, ?, ?, ?)`
            const result = await pool.query(sql, [nomeLocal, endereco, cep, valor, descr, imgUrl])
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
        let sql = "select * from local";
        const [rows] = await pool.query(sql);

        return res.status(200).json(rows);
    },

    async alterar(req, res) {
        const paramId = req.params.id;

        const {nomeLocal, endereco, cep, valor, descr} = req.body;

        let imgUrl = 'http://localhost:3333/images/'
        if(req.file) {
            imgUrl = imgUrl + `${req.file.filename}`
        }

        // const local = Locals.find(local => local.id === parseInt(paramId) ? true : false);
        // const localIndex = Locals.findIndex(local => local.id === parseInt(paramId));

        // local.nomeLocal = nomeLocal;
        // local.endereco = endereco;
        // local.cep = cep;
        // local.valor = valor;
        // local.carac = carac;
        // local.descr = descr;
        // local.img = imgUrl;

        // Locals[localIndex] = local;

        let sql = "UPDATE local SET nomeLocal = ?, endereco = ?, cep = ?, valor = ?, descr = ?, img = ? WHERE idLocal = ?"
        const result = await pool.query(sql, [nomeLocal, endereco, cep, valor, descr, imgUrl, Number(paramId)])
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
        // const local = Locals.find(local => local.id === parseInt(paramId) ? true : false);
        // return res.status(201).json(local);
        const sql_select = 'SELECT * from local where idLocal = ?'
        const [rows] = await pool.query(sql_select, [Number(paramId)])
        return res.status(201).json(rows[0])
    },

    async deletar(req, res) {
        const paramId = req.params.id;
        // const localIndex = Locals.findIndex(local => local.id === parseInt(paramId));
        // Locals = [
        //     ...Locals.slice(0, localIndex),
        //     ...Locals.slice(localIndex + 1, Locals.length)
        // ]
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

// provavelmente o erro esta ao encontrar o id do usuario