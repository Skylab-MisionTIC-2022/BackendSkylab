import Express from 'express';
import {
  getAllSales, 
  createSale, 
  findSale, 
  editSale, 
  deleteSale
} from '../../controlers/sale/saleControler.js';

const rutasVenta = Express.Router();

const genericCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send(err);
  } else {
    res.json(result);
  }
};

rutasVenta.route('/Ventas').get((req, res) => {
  getAllSales(genericCallback(res));
});

rutasVenta.route('/Ventas/Nuevo/').post((req, res) => {
  createSale(req.body, genericCallback(res));
});

rutasVenta.route('/ventas/:id/').get((req, res) => {
  console.log('alguien hizo get en la ruta /ventas');
  findSale(req.params.id, genericCallback(res));
});

rutasVenta.route('/Ventas/:id/').patch((req, res) => {
  editSale(req.params.id, req.body, genericCallback(res));
});

rutasVenta.route('/Ventas/:id/').delete((req, res) => {
  deleteSale(req.params.id, genericCallback(res));
});

export default rutasVenta;
