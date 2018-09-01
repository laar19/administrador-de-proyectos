
eventListeners();

function eventListeners() {
    document.querySelector("#formulario").addEventListener("submit", validarRegistro);
}


function validarRegistro(e) {
    e.preventDefault();

    //console.log("aquí vamos");

    var usuario = document.querySelector("#usuario").value;
    var nombre = document.querySelector("#nombre").value;
    var clave = document.querySelector("#clave").value;
    var tipo = document.querySelector("#tipo").value;

    //console.log(usuario + " " + clave);

        if(usuario === "" || clave === ""){
            // la validación falló
            swal({
              type: "error",
              title: "¡Error!",
              text: "¡Todos los campos son obligatorios!"
            })
        }
        else {
            // Ambos campos son correctos, mandar ejecutar Ajax

            // datos que se envian al servidor
            var datos = new FormData();
            datos.append("usuario", usuario);
            datos.append("nombre", nombre);
            datos.append("clave", clave);
            datos.append("accion", tipo);
            //console.log(datos);
            //console.log(datos.get("usuario"));

            // crear el llamado a ajax
            var xhr = new XMLHttpRequest();

            // abrir la conexión.
            xhr.open("POST", "inc/modelos/modelo-admin.php", true);

            // retorno de datos
            xhr.onload = function(){
                if(this.status === 200) {
                    //console.log(xhr.responseText);

                    //se convierte la respuesta en un objeto leible por javascript
                    var respuesta = JSON.parse(xhr.responseText);
                    //console.log(respuesta);

                    // Si la respuesta es correcta
                    if(respuesta.respuesta === "correcto") {
                        // si es un nuevo usuario
                        if(respuesta.tipo === "crear") {
                            swal({
                                title: "Usuario Creado",
                                text: "El usuario se creó correctamente",
                                type: "success"
                            });
                        }
                        else if(respuesta.tipo === "login"){
                            swal({
                                title: "Login Correcto",
                                text: "Presiona OK para abrir el dashboard",
                                type: "success"
                            })
                            // .then(function(resultado() {})) es lo mismo
                            .then(resultado => {
                                if(resultado.value) {
                                    window.location.href = "index.php";
                                }
                            })
                        }
                    }
                    else {
                        // Hubo un error
                        swal({
                            title: "Error",
                            text: "Hubo un error",
                            type: "error"
                        })
                    }
                }
            }

            // Enviar la petición
            xhr.send(datos);

        }
}
