eventListeners();

function eventListeners() {
    if (document.querySelector("#formulario")) {
        document.querySelector("#formulario").addEventListener("submit", validarRegistro);
    }

    // Botones para eliminar los usuarios
    if(document.querySelector('.listado-usuarios')) {
        document.querySelector('.listado-usuarios').addEventListener('click', eliminarUsuario);
    }
}

function validarRegistro(e) {
    e.preventDefault();

    //console.log("aquí vamos");
    if(document.querySelector("#usuario")) {
        var usuario = document.querySelector("#usuario").value;
    }
    if(document.querySelector("#nombre")) {
        var nombre = document.querySelector("#nombre").value;
    }
    if(document.querySelector("#clave")) {
        var clave = document.querySelector("#clave").value;
    }
    if(document.querySelector("#tipo")) {
        var tipo = document.querySelector("#tipo").value;
    }

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
        if(document.querySelector("#nombre")) {
            datos.append("nombre", nombre);
        }
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
                console.log(xhr.responseText);

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

                        // limpia el formulario
                        document.querySelector('#formulario').reset();

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

function eliminarUsuario(e) {
    e.preventDefault();

    //escucha toda la clase listado-usuarios cuando se hace click
    //console.log("click en listado");

    //delegation
    //console.log(e.target);

    if(e.target.classList.contains('fa-trash')) {
        swal({
            title: '¿Seguro(a)?',
            text: "Esta acción no se puede deshacer",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Sí, borrar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                var usuarioAeliminar = e.target.parentElement.parentElement;
                // Borrar de la BD
                eliminarUsuarioBD(usuarioAeliminar);

                // Borrar del HTML
                usuarioAeliminar.remove();

                swal(
                    'Eliminado!',
                    '¡El usuario fue eliminado!.',
                    'success'
                )
            }
        })
    }
}

function eliminarUsuarioBD(usuario) {
    var idUsuario = usuario.id.split(':');

    // crear llamado ajax
    var xhr = new XMLHttpRequest();

    // información
    var datos = new FormData();
    datos.append('id_usuario', idUsuario[1]);
    datos.append('accion', 'eliminar');

    // abrir la conexion
    xhr.open('POST', 'inc/modelos/modelo-admin.php', true);

    // on load
    xhr.onload = function() {
        if(this.status === 200) {
            console.log(JSON.parse(xhr.responseText));

            // Comprobar que haya usuarios restantes
            var listaUsuariosRestantes = document.querySelectorAll('li.usuario');
            if(listaUsuariosRestantes.length === 0 ) {
                document.querySelector('.listado-usuarios ul').innerHTML = "<p class='lista-vacia'>No hay usuarios</p>";
            }
        }
    }
    // enviar la petición
    xhr.send(datos);
}
