let Users = require('../model/User');
const pool = require('../database/mysql');
const date = new Date();
const UserController = {
    async criar(req, res) {
        const {nome, cpf, email, senha, telefone} = req.body;
        
            let imgUrl = 'http://localhost:3333/images/'
            if(req.file) {
                imgUrl = imgUrl + `${req.file.filename}`
            }

            const novoUser = {
                id: Users[Users.length-1]?.id ? Users[Users.length-1]?.id+1 : 1,
                nome: nome,
                cpf: cpf,
                email: email,
                senha: senha,
                telefone: telefone,
                img: imgUrl
            }
            // Users.push(novoUser);
            // Inserir no banco
            let sql = `INSERT INTO usuarios (nome, cpf, email, senha, telefone, img) VALUES (?, ?, ?, ?, ?, ?)`
            const result = await pool.query(sql, [nome, cpf, email, senha, telefone, imgUrl])
            const insertId = result[0]?.insertId;
            if(!insertId)
                {
                    return res.status(401).json({message: 'erro ao criar usuario!'})
                }
            const sql_select = 'SELECT * from usuarios where idUsuarios = ?'
            const [rows] = await pool.query(sql_select, [insertId])
            return res.status(201).json(rows[0])
    },

    async listar(req, res) {
        let sql = "select * from usuarios";
        const [rows] = await pool.query(sql);

        return res.status(200).json(rows);
    },

    async alterar(req, res) {
        const paramId = req.params.id;

        const {nome, cpf, email, senha, telefone} = req.body;

        let imgUrl = 'http://localhost:3333/images/'
        if(req.file) {
            imgUrl = imgUrl + `${req.file.filename}`
        }

        // const user = Users.find(user => user.id === parseInt(paramId) ? true : false);
        // const userIndex = Users.findIndex(user => user.id === parseInt(paramId));

        // user.nome = nome;
        // user.cpf = cpf;
        // user.email = email;
        // user.senha = senha;
        // user.telefone = telefone;
        // user.img = imgUrl;

        // Users[userIndex] = user;

        let sql = "UPDATE usuarios SET nome = ?, cpf = ?, email = ?, senha = ?, telefone = ?, img = ? WHERE idUsuarios = ?"
        const result = await pool.query(sql, [nome, cpf, email, senha, telefone, imgUrl, Number(paramId)])
        const changedRows = result[0]?.changedRows;
        if(!changedRows)
            {
                return res.status(401).json({message: 'erro ao alterar usuario!'})
            }
        const sql_select = 'SELECT * from usuarios where idUsuarios = ?'
        const [rows] = await pool.query(sql_select, [paramId])

        return res.status(201).json(rows[0]);
    },

    async show(req, res) {
        const paramId = req.params.id;
        // const user = Users.find(user => user.id === parseInt(paramId) ? true : false);
        // return res.status(201).json(user);
        const sql_select = 'SELECT * from usuarios where idUsuarios = ?'
        const [rows] = await pool.query(sql_select, [Number(paramId)])
        return res.status(201).json(rows[0])
    },

    async deletar(req, res) {
        const paramId = req.params.id;
        // const userIndex = Users.findIndex(user => user.id === parseInt(paramId));
        // Users = [
        //     ...Users.slice(0, userIndex),
        //     ...Users.slice(userIndex + 1, Users.length)
        // ]
        let sql = `DELETE from usuarios WHERE idUsuarios = ?`
        const result = await pool.query(sql, [Number(paramId)])
        const affectedRows = result[0]?.affectedRows;
        if(!affectedRows)
            {
                return res.status(401).json({message: 'erro ao deletar usuario!'})
            }
        return res.status(200).json({mensagem: "Usuário deletado com sucesso!"})
    }
}

module.exports = UserController;