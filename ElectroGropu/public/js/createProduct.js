const addButton = document.querySelector('#add-property');
const containerProperty = document.querySelector('#container-add-inputs');
const regex = new RegExp(/[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/)
const validateImage = (filename) => {
    return regex.test(filename)
}

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

    labelKey.innerText = "Ingrese una especficacion";
    labelValue.innerText = "Ingrese un valor";
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
                element.files.every(file => {
                    if(!validateImage(file.name)){
                        errores.push(`${element.name} solo permite los formatos: jpg,jpeg,png,gif,JPG,JPEG,PNG,GIF`)
                        return false;
                    }
                    return true;
                })
                return;
            }else{
                console.log('validate image',validateImage(element.files[0].name));
                validateImage(element.files[0].name)
                errores.push(`${element.name} solo permite los formatos: jpg,jpeg,png,gif,JPG,JPEG,PNG,GIF`)
                return;
            }
            

            return;
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
    }
})