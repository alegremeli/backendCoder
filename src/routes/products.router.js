import { Router } from 'express';
import Contenedor from '../Contenedor/contenedor.js';
import uploader from '../services/upload.js';

const router = Router();
const contenedor = new Contenedor();

    router.post('/',uploader.single('image'),async (req,res)=>{ 
        console.log(req.file);
        const image = req.protocol+"://"+req.hostname+':8080/images/'+req.file.filename; //url de donde se accede a la imagen
        let product = req.body; 
        product.image = image;
        const result = await contenedor.save(product); //Se agrega el producto
        res.send({status:"success",message:"El producto ha sido agregado"});
    })

    router.get('/',async(req,res)=>{
        let result = await contenedor.get();
        res.send(result);
    })

    router.get('/:id', async (req, res) => {
        const id = req.params.id
        let result = await contenedor.getById(id)
        response.send(result)
    })

    router.put('/:id', async (req, res) => {
        const id = req.params.id
        const product = req.body
        let result = await contenedor.putProduct(product, id)
        res.send(result)
    })

    router.delete('/:id', async (req, res) => {
        const id = req.params.id
        let result = await contenedor.deleteById(id)
        res.send(result)
    })

export default router;