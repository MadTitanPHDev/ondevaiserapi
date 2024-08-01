const express = require('express');
const UserController = require('../controller/UserController');
const LocalController = require('../controller/LocalController');
const TipoLocalController = require('../controller/TipoLocalController');

const ComentImoveisController = require('../controller/ComentImoveisController');
const CaracGeralController = require('../controller/CaracGeralController');
const FavoritosController = require('../controller/FavoritosController');
const LocacoesController = require('../controller/LocacoesController');

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

router.get('/caracGeral', CaracGeralController.listar);
router.post('/caracGeral', upload.single('img'), CaracGeralController.criar);
router.put('/caracGeral/:id', upload.single('img'), CaracGeralController.alterar);
router.get('/caracGeral/:id', CaracGeralController.show);
router.delete('/caracGeral/:id', CaracGeralController.deletar);

router.get('/favoritos', FavoritosController.listar);
router.post('/favoritos', upload.single('img'), FavoritosController.criar);
router.put('/favoritos/:id', upload.single('img'), FavoritosController.alterar);
router.get('/favoritos/:id', FavoritosController.show);
router.delete('/favoritos/:id', FavoritosController.deletar);

router.get('/locacoes', LocacoesController.listar);
router.post('/locacoes', upload.single('img'), LocacoesController.criar);
router.put('/locacoes/:id', upload.single('img'), LocacoesController.alterar);
router.get('/locacoes/:id', LocacoesController.show);
router.delete('/locacoes/:id', LocacoesController.deletar);

module.exports = router;