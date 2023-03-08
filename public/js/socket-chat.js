const socket = io();

let params = new URLSearchParams(window.location.search)

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};


socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(mensaje) {
        console.log('Servidor:', mensaje);
    });

});


// escuchar

socket.on('crearMensaje', function(data) {
    console.log('Servidor:', data)
})

// Enviar cambios de usuarios
// cuando un usuario entra o sale del chat
socket.on('listaPersonas', function (personas) {
    console.log('Servidor - personas: ', personas);
});

// Mensajes privados
socket.on('mensajePrivado', function(mensaje) {
    console.log('Mensaje privado:', mensaje)
})

// // Escuchar información
// socket.emit('crearMensaje', function (mensaje) {

//     console.log('Servidor:', mensaje);

// });