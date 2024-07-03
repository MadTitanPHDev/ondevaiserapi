let CaraGeral = require('../model/CaracGeral');

// Exemplo de lista de características (pode ser ajustado conforme suas necessidades)
const caracteristicasExemplo = [
    { idCaracGeral: 1, nomeCarac: 'Piscina' },
    { idCaracGeral: 2, nomeCarac: 'Estacionamento' },
    { idCaracGeral: 3, nomeCarac: 'Quarto' },
    { idCaracGeral: 4, nomeCarac: 'Ar Condicionado' },
    { idCaracGeral: 5, nomeCarac: 'Wi-Fi' }
];

const CaracGeralController = {
    async listar(req, res) {
        try {
            return res.status(200).json(caracteristicasExemplo);
        } catch (error) {
            console.error('Erro ao listar características gerais:', error);
            return res.status(500).json({ message: 'Erro ao listar características gerais.' });
        }
    }
};

module.exports = CaracGeralController;
