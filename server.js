import Express from 'express';
import dotenv from 'dotenv';
import Cors from 'cors';
import { connectServer } from './db/db.js';
import rutasUsuario from './views/user/userRoute.js';
import rutasProducto from './views/product/productRoute.js';
import rutasVenta from './views/sale/saleRoute.js';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';



dotenv.config({ path: './.env' });

const port = process.env.PORT || 5000;

const app = Express();
app.use(Cors());
app.use(Express.json());

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://skylabtic.us.auth0.com/.well-known/jwks.json'
}),
audience: 'api-autenticacion',
issuer: 'https://skylabtic.us.auth0.com/',
algorithms: ['RS256']
});

app.use(jwtCheck);
app.use(autorizacionEstadoUsuario);
app.use(rutasUsuario);
app.use(rutasProducto);
app.use(rutasVenta);

const main = () => {
  return app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto: ${port}`);
    
  });
};

connectServer(main);

