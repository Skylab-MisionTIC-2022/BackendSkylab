// hacer el import de express tradicional
//conts express = require'express')

//hacer el nuevo import
import Express from 'express';
const app = Express();
app.use(Express.json);
app.listen(5000,()=>{
    console.log('escuchando puerto 5000);
});
app.get('products,()=>{
    console.log('alguien hizo get en la ruta /'productos');
    res.send('<h1>vehiculos n hau>h1>');
    const productos =[
        {codigo:"AB50", descripcion:"blusa deportiva", valorunit:"50000", estado:"disponible"}
    ]
res.send(productos);
]};
app.post('/productos/nuevo',(req,res)=>{
    console.log(req.body)
})