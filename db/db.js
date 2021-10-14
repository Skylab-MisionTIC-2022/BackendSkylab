import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const connectionString = process.env.ATLAS_URI;

const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let baseDeDatos;

const connectServer = (callback) => {
  client.connect((err, db) => {
    if (err) {
      console.error('Error conectando a la base de datos');
      return 'error';
    }
    baseDeDatos = db.db('FitnesShop');
    console.log('Conexión exitosa a BaseDeDatos');
    return callback();
  });
};

const getDB = () => {
  return baseDeDatos;
};

export { connectServer, getDB };

// let dbConnection;

// module.exports = {
//   connectToServer: function (callback) {
//     client.connect(function (err, db) {
//       if (err || !db) {
//         return callback(err);
//       }

//       dbConnection = db.db('FitnesShop');
//       console.log('Successfully connected to MongoDB.');

//       return callback();
//     });
//   },

//   getDb: function () {
//     return dbConnection;
//   },
// };
