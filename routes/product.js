const express = require('express');
var ObjectID = require('mongodb').ObjectID;

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');

// This section will help you get a list of all the records.
recordRoutes.route('/Productos').get(async function (req, res) {
  // Get records
  const dbConnect = dbo.getDb();

  dbConnect
    .collection('Productos')
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching productos!');
      } else {
        res.json(result);
      }
    });
});

// This section will help you create a new record.
recordRoutes.route('/Productos/Nuevo').post(function (req, res) {
  const dbConnect = dbo.getDb();
  const product = {
    codigo: req.body.codigo,
    descripcion: req.body.descripcion,
    valorunit: req.body.valorunit,
    estado: req.body.estado,
    created: new Date(),
  };

  dbConnect.collection('Productos').insertOne(product, function (err, result) {
    if (err) {
      res.status(400).send('Error inserting product!');
    } else {
      console.log(`Added a new product with id ${result.insertedId}`);
      res.json({ id: result.insertedId });
    }
  });
});

// This section will help you update a record by id.
recordRoutes.route('/Productos/Editar').patch(function (req, res) {
  const dbConnect = dbo.getDb();
  const product = { _id: new ObjectID(req.body.id) };
  delete req.body.id;
  const updates = { $set: req.body };
  dbConnect
    .collection('Productos')
    .findOneAndUpdate(
      product,
      updates,
      { new: true, upsert: true, returnOriginal: false },
      function (err, _result) {
        if (err) {
          res.status(400).send(`Error updating likes on listing with id ${product.id}!`);
        } else {
          console.log('1 product updated');
          res.json({ result: _result });
        }
      }
    );
});

// This section will help you delete a record
recordRoutes.route('/Productos/Eliminar').delete((req, res) => {
  // Delete documents
  const dbConnect = dbo.getDb();
  console.log(req.body.id);
  const productQuery = { _id: new ObjectID(req.body.id) };

  dbConnect.collection('Productos').deleteOne(productQuery, function (err, _result) {
    if (err) {
      res.status(400).send(`Error deleting listing with id ${productQuery._id}!`);
    } else {
      console.log('1 document deleted');
      res.json({ status: 'deletion successful' });
    }
  });
});

module.exports = recordRoutes;
