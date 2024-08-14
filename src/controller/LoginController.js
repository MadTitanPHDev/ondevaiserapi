let Logins = require('../model/Login');
const pool = require('../database/mysql');
const date = new Date();

const LoginController = {
    async login(req, res) {
        // pega os dados do body
        const{username, senha} = req.body;
        console.log(senha)
        //monta o select
        const sql_select = `SELECT * from user where username = ?`
        // retorna o select
        const [rows] =await pool.query(sql_select, [username])
        console.log(rows)
        // verifica se existe email 
        if(!rows?.length)
            return res.status(401).json({message: 'Login incorreto'})

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

module.exports = LoginController;