const express = require('express');
var ObjectID = require('mongodb').ObjectID;

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');

recordRoutes.route('/usuarios').get(async function (req, res) {
    // Get records
    const dbConnect = dbo.getDb();
  
    dbConnect
      .collection('Usuarios')
      .find({})
      .limit(50)
      .toArray(function (err, result) {
        if (err) {
          res.status(400).send('Error');
        } else {
          res.json(result);
        }
      });
  });
  
  // This section will help you create a new record.
  recordRoutes.route('/usuarios/nuevo').post(function (req, res) {
    const dbConnect = dbo.getDb();
    const usuario = {
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      rol: req.body.rol,
      status: req.body.status,
      
    };
  
    dbConnect.collection('Usuarios').insertOne(usuario, function (err, result) {
      if (err) {
        res.status(400).send('Error inserting');
      } else {
        console.log(`Added a new user with id ${result.insertedId}`);
        res.json({ id: result.insertedId });
      }
    });
  });
  
  // This section will help you update a record by id.
  recordRoutes.route('/usuarios/editar').patch(function (req, res) {
    const dbConnect = dbo.getDb();
    const user = { _id: new ObjectID(req.body.id) };
    delete req.body.id;
    const updates = { $set: req.body };
    dbConnect
      .collection('Usuarios')
      .findOneAndUpdate(
        user,
        updates,
        { new: true, upsert: true, returnOriginal: false },
        function (err, _result) {
          if (err) {
            res.status(400).send(`Error updating likes on listing with id ${user.id}!`);
          } else {
            console.log('1 product updated');
            res.json({ result: _result });
          }
        }
      );
  });
  
  // This section will help you delete a record
  recordRoutes.route('/usuarios/borrar').delete((req, res) => {
    // Delete documents
    const dbConnect = dbo.getDb();
    console.log(req.body.id);
    const uQuery = { _id: new ObjectID(req.body.id) };
  
    dbConnect.collection('Usuarios').deleteOne(uQuery, function (err, _result) {
      if (err) {
        res.status(400).send(`Error deleting listing with id ${uQuery._id}!`);
      } else {
        console.log('1 document deleted');
        res.json({ status: 'deletion successful' });
      }
    });
  });
  
  module.exports = recordRoutes;
  