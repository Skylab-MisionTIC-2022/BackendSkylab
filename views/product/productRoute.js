import Express from 'express';
import {
  getAllProducts, 
  createProduct, 
  editProduct, 
  deleteProduct
} from '../../controlers/product/productController.js';

const rutasProducto = Express.Router();

const genericCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send(err);
  } else {
    res.json(result);
  }
};

rutasProducto.route('/Productos').get((req, res) => {
  getAllProducts(genericCallback(res));
});

rutasProducto.route('/Productos/Nuevo').post((req, res) => {
  createProduct(req.body, genericCallback(res));
});

rutasProducto.route('/Productos/:id/').patch((req, res) => {
  editProduct(req.params.id, req.body, genericCallback(res));
});

rutasProducto.route('/Productos/:id/').delete((req, res) => {
  deleteProduct(req.params.id, genericCallback(res));
});

export default rutasProducto;
