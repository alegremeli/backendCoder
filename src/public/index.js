let form = document.getElementById('productForm')

form.addEventListener('submit',e=>{ 
    e.preventDefault(); //previene el comportamiento de la recarga
    let formData = new FormData(form); //crea la data a partir del formulario
    if(form.price.value && form.name.value){ 
        fetch('/api/products',{ //la ruta donde se va a conectar
            method: 'POST',
            body: formData, 
        }).then(result => result.json).then(result => console.log(result)) 
    }else{
        console.log("Faltan completar campos")
    }
})