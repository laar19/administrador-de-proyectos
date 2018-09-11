eventListeners();

function eventListeners() {
    // Botón para una nueva tarea
    if(document.querySelector('.nueva-tarea') !== null ) {
        document.querySelector('.nueva-tarea').addEventListener('click', agregarTarea);
    }

    // Botones para las acciones de las tareas
    if(document.querySelector('.listado-tareas')) {
        document.querySelector('.listado-tareas').addEventListener('click', accionesTareas);
    }
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

        // Abrir la conexión
        xhr.open('POST', 'inc/modelos/modelo-tareas.php', true);


        // ejecutarlo y respuesta
        xhr.onload = function() {
            if(this.status === 200) {
                // todo correcto
                var respuesta = JSON.parse(xhr.responseText);
                // console.log(respuesta);

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

                        // seleccionar el párrafo con la lista vacía

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
                       var listado = document.querySelector('.listado-tareas ul');
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

    // escucha toda la clase listado-tareas cuando se hace click
    // console.log("click en listado");

    // delegation
    // console.log(e.target);

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

    // abrir la conexión
    xhr.open('POST', 'inc/modelos/modelo-tareas.php', true);

    // on load
    xhr.onload = function() {
        if(this.status === 200) {
            console.log(JSON.parse(xhr.responseText)); //SyntaxError: JSON.parse: unexpected end of data at line 1 column 1 of the JSON data
        }
    }
    // enviar la petición
    xhr.send(datos);
}

// Elimina la tarea de la base de datos
function eliminarTareaBD(tarea) {
    var idTarea = tarea.id.split(':');

    // crear llamado ajax
    var xhr = new XMLHttpRequest();

    // información
    var datos = new FormData();
    datos.append('id', idTarea[1]);
    datos.append('accion', 'eliminar');

    // abrir la conexión
    xhr.open('POST', 'inc/modelos/modelo-tareas.php', true);

    // on load
    xhr.onload = function() {
        if(this.status === 200) {
            console.log(JSON.parse(xhr.responseText));

            // Comprobar que haya tareas restantes
            var listaTareasRestantes = document.querySelectorAll('li.tarea');
            if(listaTareasRestantes.length === 0 ) {
                document.querySelector('.listado-tareas ul').innerHTML = "<p class='lista-vacia'>No hay tareas en este proyecto</p>";
            }
        }
    }
    // enviar la petición
    xhr.send(datos);
}
