let Users = require('../model/User');
const pool = require('../database/mysql');
const bcrypt = require('bcrypt');
const date = new Date();

const UserController = {
    async criar(req, res) {
        console.log(req)
        const {nome, cpf, email, senha, telefone} = req.body;
            console.log(senha)

            //verifica se o email ja existe no banco
            const sql_select_existe = `SELECT * from usuarios where email = ?`
            const [result_existe] = await pool.query(sql_select_existe, [email])
            console.log([result_existe])
            if(result_existe[0])
            return res.status(401).json({message: 'Erro ao criar usuario'})

            let imgUrl = 'http://localhost:3333/images/'
            if(req.file) {
                imgUrl = imgUrl + `${req.file.filename}`
            }

            //criptografa o password
            const salt = await bcrypt.genSalt(10);
            const hashSenha = await bcrypt.hash(String(senha), salt);
            let sql = `INSERT INTO usuarios (nome, cpf, email, senha, telefone, img) VALUES (?, ?, ?, ?, ?, ?)`
           
             // const result = await pool.query(sql, [email, password])
            const result = await pool.query(sql, [nome, cpf, email, hashSenha, telefone, imgUrl])
            const insertId = result[0]?.insertId;
            if(!insertId)
                {
                    return res.status(401).json({message: 'erro ao criar usuario!'})
                }
            const sql_select = 'SELECT idUsuarios, email from usuarios where idUsuarios = ?'
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
        const sql_select = 'SELECT * from usuarios where idUsuarios = ?'
        const [rows] = await pool.query(sql_select, [Number(paramId)])
        return res.status(201).json(rows[0])
    },

    async deletar(req, res) {
        const paramId = req.params.id;
        let sql = `DELETE from usuarios WHERE idUsuarios = ?`
        const result = await pool.query(sql, [Number(paramId)])
        const affectedRows = result[0]?.affectedRows;
        if(!affectedRows)
            {
                return res.status(401).json({message: 'erro ao deletar usuario!'})
            }
        return res.status(200).json({mensagem: "Usuário deletado com sucesso!"})
    },

    async login(req, res) {
        // pega os dados do body
        const{email, senha} = req.body;
        console.log(senha)
        //monta o select
        const sql_select = `SELECT * from usuarios where email = ?`
        // retorna o select
        const [rows] =await pool.query(sql_select, [email])
        console.log(rows)
        // verifica se existe email 
        if(!rows?.length)
            return res.status(401).json({message: 'Login incorreto!'})

        console.log(rows[0]?.senha)
        // compare no hash do password
        const isPasswordValid = await bcrypt.compare(String(senha), String(rows[0]?.senha) )
        console.log(isPasswordValid)
        //se nao der match ou seja password nao eh valido retorna erro
        if(!isPasswordValid)
            return res.status(401).json({message: 'Login incorreto'}) 
        //remove do json a chave password
        delete rows[0]?.senha

        // retorna o usuario
        return res.status(201).json(rows[0])
    }
}

module.exports = UserController;