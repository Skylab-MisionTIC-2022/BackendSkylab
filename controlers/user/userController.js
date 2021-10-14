import { getDB } from '../../db/db.js';
import { ObjectId } from 'mongodb';

const getAllUsers = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('Usuarios').find().limit(50).toArray(callback);
};

const createUser = async (datosUsuario, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('Usuarios').insertOne(datosUsuario, callback);
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

export { getAllUsers, createUser, editUser, deleteUser };