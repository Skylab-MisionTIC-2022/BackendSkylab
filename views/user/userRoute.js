import Express from 'express';
import {
  getAllUsers, 
  createUser, 
  editUser, 
  deleteUser,
  consultarOCrearUsuarioPorEmail
} from '../../controlers/user/userController.js'

const rutasUsuario = Express.Router();

const genericCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send(err);
  } else {
    res.json(result);
  }
};

rutasUsuario.route('/usuarios').get( (req, res) => {
  getAllUsers(genericCallback(res));
});

rutasUsuario.route('/usuarios/nuevo/').post( (req, res) => {
  createUser(req.body, genericCallback(res));
});

rutasUsuario.route('/usuarios/self').get((req, res) => {
  consultarOCrearUsuarioPorEmail(req, genericCallback(res));
});

rutasUsuario.route('/usuarios/:id/').patch( (req, res) => {
  editUser(req.params.id, req.body, genericCallback(res));
});

rutasUsuario.route('/usuarios/:id/').delete( (req, res) => {
  deleteUser(req.params.id, genericCallback(res));
});

export default rutasUsuario;
  