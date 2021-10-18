import { getDB } from '../../db/db.js';
import { ObjectId } from 'mongodb';
import jwt_decode from 'jwt-decode';

const getAllUsers = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('Usuarios').find().limit(50).toArray(callback);
};

const createUser = async (datosUsuario, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('Usuarios').insertOne(datosUsuario, callback);
};

const consultarUsuario = async (id, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('usuario').findOne({ _id: new ObjectId(id) }, callback);
};

const consultarOCrearUsuarioPorEmail = async (req, callback) => {
  const token = req.headers.authorization.split('Bearer ')[1];
  const usuario = jwt_decode(token)['http://localhost/userData'];
    console.log(user);

  const baseDeDatos = getDB();
  await baseDeDatos.collection('Usuarios').findOne({ email: usuario.email }, async (err, res) => {
    console.log('response consulta bd', response);
    if (res) {
      callback(err, res);
    } else {
      usuario._idAuth0 = usuario._id;
      delete usuario._id;
      usuario.estado="Pendiente";
      usuario.rol="Vendedor";
      await createUser(usuario, (err, res) => callback(err, usuario));
    }
  });
};



const editUser = async (userId, data, callback) => {
  const filtroUsuario = { _id: new ObjectId(userId) };
  const operacion = {
    $set: data,
  };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection('Usuarios')
    .findOneAndUpdate(filtroUsuario, operacion, { upsert: true, returnOriginal: true }, callback);
};

const deleteUser = async (userId, callback) => {
  const filtroUsuario = { _id: new ObjectId(userId) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection('Usuarios').deleteOne(filtroUsuario, callback);
};

export { getAllUsers, createUser, editUser, deleteUser,consultarUsuario,consultarOCrearUsuarioPorEmail };