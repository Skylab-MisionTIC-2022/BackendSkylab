import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';

const getAllSales = async (callback) => {
  const baseDeDatos = getDB();
  console.log('consulta');
  await baseDeDatos.collection('Ventas').find({}).limit(50).toArray(callback);
};

const createSale = async (datosVenta, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('Ventas').insertOne(datosVenta, callback);
};

const findSale = async (id, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('Ventas').findOne({ _id: new ObjectId(id) }, callback);
};

const editSale = async (id, edicion, callback) => {
  const filtroVenta = { _id: new ObjectId(id) };
  const operacion = {
    $set: edicion,
  };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection('Ventas')
    .findOneAndUpdate(filtroVenta, operacion, { upsert: true, returnOriginal: true }, callback);
};

const deleteSale = async (id, callback) => {
  const filtroVenta = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection('Ventas').deleteOne(filtroVenta, callback);
};

export { getAllSales, createSale, findSale, editSale, deleteSale };