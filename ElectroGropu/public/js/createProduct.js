const addButton = document.querySelector('#add-property');
const containerProperty = document.querySelector('#container-add-inputs');
const inputName = document.querySelector('#titulo');
const inputPrecio = document.querySelector('#price');
const inputImage = document.querySelector('#imagen');
const selectBrand = document.querySelector('#brand');
const regex = new RegExp(/^[^\s]+\.(jpg|jpeg|png|gif|bmp)$/gm);
const types = ['image/jpeg','image/png']
const validateImage = (filename) => {
    return types.includes(filename);
}

const isEmpty = (value) => {
    return value == '';
}

const minLength = (value) => {
    return value.length >= 3;
}

const addError = (element,error) => {
    console.log("Error: ",element);
    element.innerText = `${error}`;
    element.style.display = "inline";
}

inputName.addEventListener('blur', function (e) {
    let error = document.querySelector('#ErrorName');
    console.log("p:", error);
    if (isEmpty(e.target.value)) {
        addError(error,'El campo no debe estar vacio')
        return;
    }else if (!minLength(e.target.value)) {
        addError(error,'Debe tener un minimo de 3 caracteres')
        return;    
    }
    error.style.display = 'none';


})

inputPrecio.addEventListener('blur',function (e) {
    
    let error = document.querySelector('#ErrorPrice');
    if (isEmpty(e.target.value)) {
        addError(error,'El campo no debe estar vacio')
        return;
    }

    if (e.target.value <= 0){
        addError(error,'El precio no puede ser igual o menor a 0')
        return;    
    }

    error.style.display = 'none';
})

addButton.addEventListener('click', function (e) {
    const inputKey = document.createElement("input")
    const labelKey = document.createElement("label")
    const inputValue = document.createElement("input")
    const labelValue = document.createElement("label")
    const container = document.createElement("div")
    const containerKey = document.createElement("div")
    const containerValue = document.createElement("div")
    const removeButton = document.createElement('a')
    
    containerValue.classList.add('container-inputs');
    containerKey.classList.add('container-inputs');
    container.classList.add('container_inputs_especificaciones');
    container.id = `container${containerProperty.childElementCount}`
    removeButton.classList.add('buttonRemoveInput')
    removeButton.innerText = 'Eliminar'
    removeButton.addEventListener('click', function() {
        containerProperty.removeChild(container);
    })

    labelKey.innerText = "Especficacion";
    inputKey.placeholder = "Ingrese una especficacion";
    labelValue.innerText = "Detalle";
    inputValue.placeholder = "Ingrese el detalle";
    inputKey.id = `key${containerProperty.childElementCount}`;
    inputValue.id = `value${containerProperty.childElementCount}`
    inputKey.classList.add("custom-input");
    inputValue.classList.add("custom-input");
    containerKey.appendChild(labelKey);
    containerKey.appendChild(inputKey);
    containerValue.appendChild(labelValue);
    containerValue.appendChild(inputValue);
    container.appendChild(containerKey);
    container.appendChild(containerValue);
    container.appendChild(removeButton);
    containerProperty.appendChild(container)

})

document.addEventListener('submit', function (e) {
    e.preventDefault();
    const variables = document.querySelectorAll('.column');
    const errores = []
    console.log('variables',variables);
    variables.forEach(element => {
        if(element.value == '') {
            errores.push(`${element.name} no debe estar vacio`) 
            return; 
        }

        if (element.id == 'price' && element.value <= 0) {
            errores.push(`${element.name} no puede ser menor o igual a 0 `) 
            return;
        }

        if (element.value.length < 3 && element.id != 'price') {
            errores.push(`${element.name} debe tener un minimo de 3 caracteres `) 
            return;
        }

        if (element.id == 'imagen') {
            if(element.files.length > 1){
                for(const file in element.files){
                    console.log("boolean",!validateImage(element.files[file].type));             
                    if(element.files[file].type && !validateImage(element.files[file].type)){
                        console.log(element.files[file].type);
                        errores.push(`${element.name} solo permite los formatos: jpg,jpeg,png,gif,JPG,JPEG,PNG,GIF`)
                        return
                    }
                }
            }else{
                console.log('validate image',!validateImage(element.files[0].type));
                
                if (!validateImage(element.files[0].type)){
                    errores.push(`${element.name} solo permite los formatos: jpg,jpeg,png,gif,JPG,JPEG,PNG,GIF`)
                    return;
                }
            }
        }
    })

    if (errores.length >= 1) {
        let mensaje = '<ul>';
        errores.forEach(err => {
            console.log(err);
            mensaje += `<li>⦿ ${err}</li>`
        })
        mensaje += '</ul>'
        Swal.fire({
            icon: "error",
            title: "Oops...",
            html: mensaje,
            footer: '<a href="#">Why do I have this issue?</a>'
          });
    }else{
        console.log('inputImage',inputImage.files);
        let description = '{"test":"example"}'
        const data = {
            titulo: inputName.value,
            description,
            files:inputImage.files,
            price: inputPrecio.value,
            brand: selectBrand.value,
        }
        const formData  = new FormData();
        
        for(const name in data) {
            formData.append(name, data[name]);
        }
        console.log("host",window.location.hostname)
        fetch(`http://localhost:3000/api/products/create`,{
            method:'POST',
            body: formData
        })
    }
})