import fs from 'fs';

import __dirName from '../utils.js'
const pathToFile =__dirName+'/products.json'
class Contenedor {  

    save = async(product)=>{ //Crea un producto
        if(!product.title || !product.price || !product.thumbnail){ //Si el usuario no pasa los datos requeridos
            return { //Se retorna un error
                status: "error",
                message: "No se ha podido encontrar el producto"
            }

        }try{
            if(fs.existsSync(pathToFile)){ //Si el archivo existe...
                let data = await fs.promises.readFile(pathToFile,'utf-8')//Espera a que filesistem ejecute una promesa de lectura de archivo, en esta ruta y con este formato
                let products = JSON.parse(data) //Lo regreso a su data original, listo para manipularse
                let id = products.length + 1 //Creo el id de los productos
                product.id = id 
                products.push(product) //Agrego el producto al array de productos
                //Paso la data como string, hago que no se reemplace ningun caracter, y que este tabulado
                await fs.promises.writeFile(pathToFile, JSON.stringify(products, null, 2)) //Guardo el array en el archivo 
                return {
                    status: "success",
                    message: "El producto se creo correctamente",
                    id: product.id
                }

            } else { //Si no esta creado el archivo...
                product.id = 1 
                await fs.promises.writeFile(pathToFile,JSON.stringify([product], null, 2) //Lo creo con una promesa, en forma de objeto
                )
                return {
                    status: "success",
                    message: "El producto se creo correctamente"
                }
            }

        } catch (error){ 
            return {
                status: "error",
                message: error.message,
            }
        }
    }


    getAll = async () => { //Repito la misma logica anterior, lee todos los productos
        try {
        if(fs.existsSync(pathToFile)){
            let data = await fs.promises.readFile(pathToFile, "utf-8");
            let products = JSON.parse(data);
            return{ //Debe retornar todos los productos
                status: "success",
                products: products,
        };

        }else{
            return{
                status:"error",
                message:"No se han encontrado los productos",
        }
        }

        }catch (error){
            return{
                status: "error",
                message: error.message,
            };
        }
    }


    getById = async(id) =>{ //Lee al usuario mediante su ID
        if(!id) { //Si el ID no existe
            return{
                status:"error",
                message: "El ID es requerido",
            };
        }

        if (fs.existsSync(pathToFile)) { //Si existe el archivo...
        let data = await fs.promises.readFile(pathToFile, "utf-8");
        let products = JSON.parse(data);
        let product = products.find((product) => product.id == id); //Busca el id con el metodo find

            if(product){ //Debe retornar el producto cuyo id hayamos elegido
                return{
                    status:"success",
                    product: product,
                };

            }else {
                return {
                    status: "error",
                    message: "El producto no se ha encontrado",
                };
            }

            }else {
                return {
                status: "error",
                message: "El producto no se ha encontrado"
                }
            }
        }


    deleteById = async (id) =>{ //Elimina al usuario mediante su ID
        if(!id) { //Si el id no existe
            return{
                status:"error",
                message: "El ID es requerido",
            };
        }

        if (fs.existsSync(pathToFile)) { //Si el id existe
            let data = await fs.promises.readFile(pathToFile, "utf-8")
            let products = JSON.parse(data)
            let newProducts = products.filter((product) => product.id != id) //Seleccionamos el producto, mediante el metodo filter
            await fs.promises.writeFile(pathToFile,JSON.stringify(newProducts, null, 2) //Reescribo el archivo vacío
            );
                return{
                    status: "success",
                    message:"Los productos se han eliminado correctamente",
                }

                } else{
                    return{
                        status: "error",
                        message: "No se han encontrado los productos",
                    }
                }
        }


        putProduct = async (product, id) =>{ 
            const allProducts = await this.getAll() 
            const products = allProducts.products

            let newProduct = products.map(element =>{
                if(element.id == id){
                    return {...product, id:id}
                }else{
                    return element
                }
            })
            newProduct = JSON.stringify(newProduct, null, "\t")
            await fs.promises.writeFile(pathToFile, newProduct)
        }


        deleteAll = async () =>{
            try {
                if(fs.existsSync(pathToFile)){ //Si existe el archivo...
                    await fs.promises.unlink(pathToFile) //Elimino el archivo
                    }else{
                        return{
                            status:"error",
                            message:"No se han encontrado los productos",
                        }
                    }

            }catch (error){
                return{
                    status: "error",
                    message: error.message,
                    };
                }
        }
}

export default Contenedor