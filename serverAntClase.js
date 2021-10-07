import Express from "express";

const app = Express();
app.use(Express.json());

//ruta tipo get
app.get('/Productos', (req, res) => {
    console.log('Alguien hizo un get en la ruta /Productos');
    const productos = [
        { codigo: "A3020", descripcion: "Licra deportiva", valorunit: "$90.000",  estado: "Disponible" },
        { codigo: "B4560", descripcion: "body deportivo", valorunit: "$50.000",  estado: "Disponible"  },
        { codigo: "H9841", descripcion: "Joguer", valorunit: "$50.000",  estado: "Disponible"  },
        { codigo: "E9618", descripcion: "Leggins", valorunit: "$80.000",  estado: "Disponible"  }
        
    ];
    res.send(productos);
});

app.post('/Productos/Nuevo', (req, res) => {
    const datosProducto = req.body;
    console.log("Llaves: ", Object.keys(datosProducto));
    try{
        if( 
            Object.keys(datosProducto).includes("codigo") &&
            Object.keys(datosProducto).includes("descripcion") &&
            Object.keys(datosProducto).includes("valorunit") && 
            Object.keys(datosProducto).includes("estado") 
        ) {
            res.sendStatus(200); // enviar respuesta "OK"
        } else{
            res.sendStatus(500);
        }
    } catch {
        res.sendStatus(500);
    }
});


app.listen(5000, () => {
    console.log('Escuchando el puerto 5000');
});
