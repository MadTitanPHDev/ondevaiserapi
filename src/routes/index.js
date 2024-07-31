const express = require('express');
const UserController = require('../controller/UserController');
const LocalController = require('../controller/LocalController');
const TipoLocalController = require('../controller/TipoLocalController');
const ComentImoveisController = require('../controller/ComentImoveisController');
const multer = require('multer');
const router = express.Router();
const crypto = require('crypto');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/')
    },
    filename: (req, file, cb) => {
        const extensaoArquivo = file.originalname.split('.')[1]
        const novoNomeArquivo = crypto.randomBytes(16).toString('hex');
        cb(null, `${novoNomeArquivo}.${extensaoArquivo}`);
    }
})

const upload = multer({storage});

router.get('/users', UserController.listar);
router.post('/users', upload.single('img'), UserController.criar);
router.put('/users/:id', upload.single('img'), UserController.alterar);
router.get('/users/:id', UserController.show);
router.delete('/users/:id', UserController.deletar);

router.get('/locals', LocalController.listar);
router.post('/locals', upload.single('img'), LocalController.criar);
router.put('/locals/:id', upload.single('img'), LocalController.alterar);
router.get('/locals/:id', LocalController.show);
router.delete('/locals/:id', LocalController.deletar);

router.get('/tipoLocal', TipoLocalController.listar);
router.post('/tipoLocal', upload.single('img'), TipoLocalController.criar);
router.put('/tipoLocal/:id', upload.single('img'), TipoLocalController.alterar);
router.get('/tipoLocal/:id', TipoLocalController.show);
router.delete('/tipoLocal/:id', TipoLocalController.deletar);

router.get('/comentImoveis', ComentImoveisController.listar);
router.post('/comentImoveis', upload.single('img'), ComentImoveisController.criar);
router.put('/comentImoveis/:id', upload.single('img'), ComentImoveisController.alterar);
router.get('/comentImoveis/:id', ComentImoveisController.show);
router.delete('/comentImoveis/:id', ComentImoveisController.deletar);

module.exports = router;