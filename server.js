import Express from "express";
import { MongoClient, ObjectId } from "mongodb";
import Cors from 'cors';

const stringConexion = 'mongodb+srv://andres5:andres5@skylab.kfbvn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';


const client = new MongoClient(stringConexion, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


let baseDeDatos;

const app = Express();

app.use(Express.json());
app.use(Cors()); 


app.get('/Productos', (req, res)=>{
    console.log('Alguien hizo un get en la ruta /Productos');
    baseDeDatos
    .collection('Productos')
    .find()
    .limit(50)
    .toArray((err, result)=>{
        if (err){
            res.status(500).send('error consultando Productos');
        } else{
            res.json(result);
        }
    });
});


app.post('/Productos/Nuevo', (req, res)=>{
    const datosProducto = req.body; 
    console.log('llaves: ', Object.keys(datosProducto)); 
    try{
        if( 
            Object.keys(datosProducto).includes("codigo") &&
            Object.keys(datosProducto).includes("descripcion") &&
            Object.keys(datosProducto).includes("valorunit") && 
            Object.keys(datosProducto).includes("estado") 
        ) {
            baseDeDatos.collection('Productos').insertOne(datosProducto, (err, result)=>{ 
                if(err){
                    console.error(err);
                    res.sendStatus(500);
                    
                } else {
                    console.log(result);
                    res.sendStatus(200);
                }
            }); 
        } else {
            res.sendStatus(500);
        }
    } catch {
        res.sendStatus(500);
    }
});

app.patch('/Productos/Editar', (req, res)=>{
    const edicion = req.body;
    console.log(edicion);
    const filtroProducto = { _id: new ObjectId(edicion.id)};
    delete edicion.id;   
    const operacion = {   
        $set: edicion,
    };
    baseDeDatos
    .collection('Productos')
    .findOneAndUpdate(
        filtroProducto, 
        operacion, 
        { upsert: true, returnOriginal: true },
        (err, result)=>{
            if(err){
                console.error('error actualizando producto: ', err);
                res.sendStatus(500);
            }else{
                console.log('actualizado con éxito');
                res.sendStatus(200);
            }
        });
});

app.delete('/Productos/Eliminar', (req, res) =>{
    const filtroProducto = { _id: new ObjectId(req.body.id)};
    baseDeDatos.collection('Productos').deleteOne(filtroProducto, (err, result)=>{
        if(err){
            console.error(err);
            res.sendStatus(500);
        }else {
            res.sendStatus(200);
        }
    });
});

app.get('/usuarios', (req,res)=>{
    console.log("get de usuarios");
    baseDeDatos
    .collection('Usuarios')
    .find()
    .limit(50)
    .toArray((err, result)=>{
        if (err){
            res.status(500).send('error consultando usuarios');
        } else{
            res.json(result);
        }
    });
})

app.post('/usuarios/nuevo',(req,res)=>{
    const datosUsuario = req.body; 
    console.log('llaves: ', Object.keys(datosUsuario)); 
    try{
        if( 
            Object.keys(datosUsuario).includes("name") &&
            Object.keys(datosUsuario).includes("lastname") &&
            Object.keys(datosUsuario).includes("email") && 
            Object.keys(datosUsuario).includes("rol") &&
            Object.keys(datosUsuario).includes("status")
        ) {
            baseDeDatos.collection('Usuarios').insertOne(datosUsuario, (err, result)=>{ 
                if(err){
                    console.error(err);
                    res.sendStatus(500);
                    
                } else {
                    console.log(result);
                    res.sendStatus(200);
                }
            }); 
        } else {
            res.sendStatus(500);
        }
    } catch {
        res.sendStatus(500);
    }
});

app.delete('/usuarios/borrar', (req, res) =>{
    const filtro = { _id: new ObjectId(req.body.id)};
    baseDeDatos.collection('Usuarios').deleteOne(filtro, (err, result)=>{
        if(err){
            console.error(err);
            res.sendStatus(500);
        }else {
            res.sendStatus(200);
        }
    });
});


app.patch('/usuarios/editar', (req, res)=>{
    const edicion = req.body;
    console.log(edicion);
    const filtro = { _id: new ObjectId(edicion.id)};
    delete edicion.id;   
    const operacion = {   
        $set: edicion,
    };
    baseDeDatos
    .collection('Usuarios')
    .findOneAndUpdate(
        filtro, 
        operacion, 
        { upsert: true, returnOriginal: true },
        (err, result)=>{
            if(err){
                console.error('error actualizando: ', err);
                res.sendStatus(500);
            }else{
                console.log('actualizado con éxito');
                res.sendStatus(200);
            }
        });
});



const main = () => {
    client.connect((err,db)=>{
        if(err){
            console.error('error conectando a BD');
            return 'error';
        }
        baseDeDatos =  db.db('FitnesShop'); 
        console.log('BaseDeDatos exitosa');
        return app.listen(5000, () => {
            console.log('Escuchando el puerto 5000');
        });
    });
    
};

main();