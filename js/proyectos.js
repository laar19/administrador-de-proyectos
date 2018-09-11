eventListeners();

// lista de proyectos
var listaProyectos = document.querySelector('ul#proyectos');

function eventListeners() {
    // botón para crear proyecto
    if(document.querySelector('.crear-proyecto a')) {
        document.querySelector('.crear-proyecto a').addEventListener('click', nuevoProyecto);
    }

    // Botón para eliminar el proyecto
    if(document.querySelector('.listado-proyectos')) {
        document.querySelector('.listado-proyectos').addEventListener('click', eliminarProyecto);
    }
}

// crear proyecto HTML
function nuevoProyecto(e) {
    e.preventDefault();

    var listaProyectos = document.querySelector('ul#proyectos');
    // Crea un <input> para el nombre del nuevo proyecto
    var nuevoProyecto = document.createElement('li');
    nuevoProyecto.innerHTML = '<input type="text" id="nuevo-proyecto">';
    listaProyectos.appendChild(nuevoProyecto);

    // seleccionar el ID con el nuevoProyecto
    var inputNuevoProyecto = document.querySelector('#nuevo-proyecto');

    // al presionar enter crear el proyecto

    // se configura la tecla enter para guardar el nuevo proyecto
    inputNuevoProyecto.addEventListener('keypress', function(e) {
        //console.log(e);

        //which y keyCode traen el número de la tecla
        var tecla = e.which || e.keyCode;

        // el which y el keyCode de la tecla enter es el número 13
        if(tecla === 13) {
            //console.log("presionaste enter");
            guardarProyectoDB(inputNuevoProyecto.value);

            // una vez agregado a la base de datos lo remueve del sidebar
            listaProyectos.removeChild(nuevoProyecto);
        }
    });
}

// guardar proyecto en la base de datos
function guardarProyectoDB(nombreProyecto) {
    //console.log(nombreProyecto);

    // CUATRO 4 pasos para ajax

    // 1 paso. Crear llamado ajax
    var xhr = new XMLHttpRequest();

    // enviar datos por formdata
    var datos = new FormData();
    datos.append('proyecto', nombreProyecto);
    datos.append('accion', 'crear');

    // 2 paso. Abrir la conexión
    xhr.open('POST', 'inc/modelos/modelo-proyecto.php', true);

    // 3 paso ejecutar. En la carga
    xhr.onload = function() {
        // si el llamado es correcto y encontró destino: 200
        if(this.status === 200) {
            console.log(xhr.responseText);

            // obtener datos de la respuesta
            var respuesta = JSON.parse(xhr.responseText);
            var proyecto = respuesta.nombre_proyecto,
                id_proyecto = respuesta.id_insertado,
                tipo = respuesta.tipo,
                resultado = respuesta.respuesta;

            // Comprobar la inserción
            if(resultado === 'correcto') {
                // fue exitoso
                if(tipo === 'crear') {
                    // Se creó un nuevo proyecto
                    // inyectar en el HTML
                    var nuevoProyecto = document.createElement('li');

                    // strings literals entre comillas invertidas ("`") para crear html más avanzado y concatenar varias líneas html
                    nuevoProyecto.innerHTML = `
                        <a href="index.php?id_proyecto=${id_proyecto}" id="proyecto:${id_proyecto}">
                            <!-- normalmente sería "proyecto" pero al usar strings literals hay que añadirle $ y las llaves -->
                            ${proyecto}
                        </a>
                    `;
                    // agregar al html
                    listaProyectos.appendChild(nuevoProyecto);

                    // enviar alerta
                    swal({
                        title: 'Proyecto Creado',
                        text: 'El proyecto: ' + proyecto + ' se creó correctamente',
                        type: 'success'
                    })
                    .then(resultado => {
                        // redireccionar a la nueva URL
                        if(resultado.value) {
                            window.location.href = 'index.php?id_proyecto=' + id_proyecto;
                        }
                    })


                }
                else {
                    // Se actualizo o se elimino
                }
            }
            else {
                // hubo un error
                swal({
                  type: 'error',
                  title: '¡Error!',
                  text: '¡Hubo un error!'
                })
            }
        }
    }

    // 4 paso. Enviar el Request
    xhr.send(datos);

}

// eliminar proyecto del HTML
function eliminarProyecto(e) {
    e.preventDefault();

    // escucha toda la clase listado-proyectos cuando se hace click
    // console.log("click en listado");

    // delegation
    // console.log(e.target);

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
                var proyectoEliminar = e.target.parentElement.parentElement;
                // Borrar de la BD
                eliminarProyectoBD(proyectoEliminar);

                // Borrar del HTML
                proyectoEliminar.remove();

                swal(
                  'Eliminado!',
                  '¡El proyecto fue eliminado!.',
                  'success'
                )
            }
        })
    }
}

// eliminar proyecto de la base de datos
function eliminarProyectoBD(proyecto) {
    var idProyecto = proyecto.id.split(':');

    // crear llamado ajax
    var xhr = new XMLHttpRequest();

    // información
    var datos = new FormData();
    datos.append('id_proyecto', idProyecto[1]);
    datos.append('accion', 'eliminar');

    // abrir la conexión
    xhr.open('POST', 'inc/modelos/modelo-proyecto.php', true);

    // on load
    xhr.onload = function() {
        if(this.status === 200) {
            console.log(JSON.parse(xhr.responseText));

            // Comprobar que haya tareas restantes
            var listaProyectosRestantes = document.querySelectorAll('li.proyecto');
            if(listaProyectosRestantes.length === 0 ) {
                document.querySelector('.listado-proyectos ul').innerHTML = "<p class='lista-vacia'>No hay proyectos</p>";
            }
        }
    }
    // enviar la petición
    xhr.send(datos);
}
