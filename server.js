import Express from 'express';
import dotenv from 'dotenv';
import Cors from 'cors';
import { connectServer } from './db/db.js';
import rutasUsuario from './views/user/userRoute.js';
import rutasProducto from './views/product/productRoute.js';
import rutasVenta from './views/sale/saleRoute.js';

dotenv.config({ path: './.env' });

const app = Express();

app.use(Cors());
app.use(Express.json());
app.use(rutasUsuario);
app.use(rutasProducto);
app.use(rutasVenta);

const main = () => {
  return app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto: ${process.env.PORT}`);
  });
};

connectServer(main);

