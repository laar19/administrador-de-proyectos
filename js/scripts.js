eventListeners();
// lista de proyectos
var listaProyectos = document.querySelector('ul#proyectos');

function eventListeners() {
    // boton para crear proyecto
    if(document.querySelector('.crear-proyecto a')) {
        document.querySelector('.crear-proyecto a').addEventListener('click', nuevoProyecto);
    }

    // Boton para una nueva tarea
    if(document.querySelector('.nueva-tarea') !== null ) {
        document.querySelector('.nueva-tarea').addEventListener('click', agregarTarea);
    }

    // Botones para las acciones de las tareas
    if(document.querySelector('.listado-pendientes')) {
        document.querySelector('.listado-pendientes').addEventListener('click', accionesTareas);
    }

    // Botones para las acciones de los proyectos
    if(document.querySelector('.listado-proyectos')) {
        document.querySelector('.listado-proyectos').addEventListener('click', accionesProyectos);
    }
}

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

    //se configura la tecla enter para guardar el nuevo proyecto
    inputNuevoProyecto.addEventListener('keypress', function(e) {
        //console.log(e);
        //which y keyCode traen el número de la tecla
        var tecla = e.which || e.keyCode;

        // el which y el keyCode de la tecla enter es el número 13
        if(tecla === 13) {
            //console.log("presionaste enter");
            guardarProyectoDB(inputNuevoProyecto.value);

            //una vez agregado a la base de datos lo remueve del sidebar
            listaProyectos.removeChild(nuevoProyecto);
        }
    });
}



function guardarProyectoDB(nombreProyecto) {
    //console.log(nombreProyecto);

    // CUATRO 4 pasos para ajax

    // 1 paso Crear llamado ajax
    var xhr = new XMLHttpRequest();

    // enviar datos por formdata
    var datos = new FormData();
    datos.append('proyecto', nombreProyecto);
    datos.append('accion', 'crear');

    // 2 paso Abrir la conexion
    xhr.open('POST', 'inc/modelos/modelo-proyecto.php', true);

    // 3 paso ejecutar. En la carga
    xhr.onload = function() {
        // si el llamado es correcto y encontró destino: 200
        if(this.status === 200) {
            //console.log(xhr.responseText);

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

                    //strings literals entre comillas invertidas ("`") para crear html más avanzado y concatenar varias líneas html
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

    // 4 paso Enviar el Request
    xhr.send(datos);

}


// agregar una nueva tarea al proyecto actual

function agregarTarea(e) {
    e.preventDefault();

    //console.log("click en enviar");

    var nombreTarea = document.querySelector('.nombre-tarea').value;
    //console.log(nombreTarea);

    // Validar que el campo tenga algo escrito

    if(nombreTarea === '') {
        swal({
            title: 'Error',
            text: 'Una tarea no puede ir vacía',
            type:'error'
        })
    }
    else {
        // la tarea tiene algo, insertar en PHP

        // crear llamado a ajax
        var xhr = new XMLHttpRequest();

        // crear formdata
        var datos = new FormData();
        datos.append('tarea',nombreTarea );
        datos.append('accion', 'crear');
        datos.append('id_proyecto', document.querySelector('#id_proyecto').value );

        // Abrir la conexion
        xhr.open('POST', 'inc/modelos/modelo-tareas.php', true);


        // ejecutarlo y respuesta
        xhr.onload = function() {
            if(this.status === 200) {
                // todo correcto
                var respuesta = JSON.parse(xhr.responseText);
                console.log(respuesta);

                // asignar valores

                var resultado = respuesta.respuesta,
                    tarea = respuesta.tarea,
                    id_insertado = respuesta.id_insertado,
                    tipo = respuesta.tipo;

                if(resultado === 'correcto') {
                    // se agregó correctamente
                    if(tipo === 'crear') {
                        // lanzar la alerta
                        swal({
                          type: 'success',
                          title: 'Tarea Creada',
                          text: 'La tarea: ' + tarea + ' se creó correctamente'
                        });

                        // seleccionar el parrafo con la lista vacia

                        // querySelectorAll retorna el length del elemento
                        var parrafoListaVacia = document.querySelectorAll('.lista-vacia');
                        if(parrafoListaVacia.length > 0 ) {
                            document.querySelector('.lista-vacia').remove();
                        }

                        // construir el template
                       var nuevaTarea = document.createElement('li');

                       // agregamos el ID
                       nuevaTarea.id = 'tarea:'+id_insertado;

                       // agregar la clase tarea
                       nuevaTarea.classList.add('tarea');

                       // construir el html
                       nuevaTarea.innerHTML = `
                            <p>${tarea}</p>
                            <div class="acciones">
                                <i class="far fa-check-circle"></i>
                                <i class="fas fa-trash"></i>
                            </div>
                       `;

                       // agregarlo al HTML
                       var listado = document.querySelector('.listado-pendientes ul');
                       listado.appendChild(nuevaTarea);

                       // Limpiar el formulario
                       document.querySelector('.agregar-tarea').reset();
                    }
                }
                else {
                    // hubo un error
                    swal({
                      type: 'error',
                      title: 'Error!',
                      text: 'Hubo un error'
                    })
                }
            }
        }
        // Enviar la consulta
        xhr.send(datos);
    }
}

// Cambia el estado de las tareas o las elimina

function accionesTareas(e) {
    e.preventDefault();

    //escucha toda la clase listado-pendientes cuando se hace click
    //console.log("click en listado");

    //delegation
    //console.log(e.target);

    if(e.target.classList.contains('fa-check-circle')) {
        if(e.target.classList.contains('completo')) {
            e.target.classList.remove('completo');
            // e.target conserva el último elemento que se ha clickeado
            cambiarEstadoTarea(e.target, 0);
        }
        else {
            e.target.classList.add('completo');
            cambiarEstadoTarea(e.target, 1);
        }
    }

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

             var tareaEliminar = e.target.parentElement.parentElement;
            // Borrar de la BD
            eliminarTareaBD(tareaEliminar);

            // Borrar del HTML
            tareaEliminar.remove();

            swal(
              'Eliminado!',
              'La tarea fue eliminada!.',
              'success'
            )
          }
        })
    }
}

// Completa o descompleta una tarea
function cambiarEstadoTarea(tarea, estado) {
    //estando en la clase vamos al elemento superior para luego seleccionar el id, con el split quitamos ":" y dividimos ["tarea", "1"]
    var idTarea = tarea.parentElement.parentElement.id.split(':');

    // crear llamado ajax
    var xhr = new XMLHttpRequest();

    // informacion
    var datos = new FormData();
    datos.append('id', idTarea[1]);
    datos.append('accion', 'actualizar');
    datos.append('estado', estado);

    // abrir la conexion
    xhr.open('POST', 'inc/modelos/modelo-tareas.php', true);

    // on load
    xhr.onload = function() {
        if(this.status === 200) {
            console.log(JSON.parse(xhr.responseText));


        }
    }
    // enviar la petición
    xhr.send(datos);
}

// Elimina las tareas de la base de datos
function eliminarTareaBD(tarea) {
    var idTarea = tarea.id.split(':');

    // crear llamado ajax
    var xhr = new XMLHttpRequest();

    // informacion
    var datos = new FormData();
    datos.append('id', idTarea[1]);
    datos.append('accion', 'eliminar');

    // abrir la conexion
    xhr.open('POST', 'inc/modelos/modelo-tareas.php', true);

    // on load
    xhr.onload = function() {
        if(this.status === 200) {
            console.log(JSON.parse(xhr.responseText));

            // Comprobar que haya tareas restantes
            var listaTareasRestantes = document.querySelectorAll('li.tarea');
            if(listaTareasRestantes.length === 0 ) {
                document.querySelector('.listado-pendientes ul').innerHTML = "<p class='lista-vacia'>No hay tareas en este proyecto</p>";
            }
        }
    }
    // enviar la petición
    xhr.send(datos);
}

function accionesProyectos(e) {
    e.preventDefault();

    //escucha toda la clase listado-pendientes cuando se hace click
    //console.log("click en listado");

    //delegation
    //console.log(e.target);

    if(e.target.classList.contains('fa-edit')) {
        //editar
    }
    else {
        //ya veremos
    }

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

function eliminarProyectoBD(proyecto) {
    var idProyecto = proyecto.id.split(':');

    // crear llamado ajax
    var xhr = new XMLHttpRequest();

    // informacion
    var datos = new FormData();
    datos.append('id_proyecto', idProyecto[1]);
    datos.append('accion', 'eliminar');

    // abrir la conexion
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
