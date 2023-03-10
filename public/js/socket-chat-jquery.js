
let params = new URLSearchParams(window.location.search);
// const divUsuarios = document.getElementById('divUsuarios')

const nombre = params.get('nombre')
const sala = params.get('sala')

// Referencias de jQuery
let divUsuarios = $('#divUsuarios')
let formEnviar = $('#formEnviar')
let txtMensaje = $('#txtMensaje')
let divChatbox = $('#divChatbox')
let reverse = $('#reverse')
let divChatRightAside = $('#chat-right-aside')

// Funciones para renderizar usuarios
function renderizarUsuarios(personas) { // [{}, {}, ... {}]

    let html = ''
    
    html += '<li >'
    html += ' <a href="javascript:void(0)" class="active"> Chat de <span>' + sala + '</span></a>'
    html += '</li>'

    for (let i = 0; i < personas.length; i++) {
        imgSrc = `<img src="assets/images/users/${i + 1}.jpg"`
        html += '<li>'
        html += '    <a data-id = "' + personas[i].id + '" href="javascript:void(0)">' + imgSrc + 'alt="user-img" class="img-circle"> <span>' + personas[i].nombre + ' <small class="text-success">online</small></span></a>'
        html += '</li>'
    }

    divUsuarios.html(html)
}

function renderizarMensaje( mensaje, yo ) {
    
    let html =  ''
    const fecha = new Date(mensaje.fecha)
    const hora = fecha.getHours() + ':' + fecha.getMinutes()
    let adminClass = 'info'

    if (mensaje.nombre === 'Administrador') {
        adminClass = 'danger'
    }

    if ( yo ) {
        html += '<li class="reverse">'
        html += '    <div class="chat-content">'
        html += '        <h5>+ ' + mensaje.nombre + '</h5>'
        html += '        <div class="box bg-light-inverse">' + mensaje.mensaje + '</div>'
        html += '    </div>'
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>'
        html += '    <div class="chat-time">' + hora + '</div>'
        html += '</li>'
    } else {
        html += '<li class="animated fadeIn">'
        
        if ( mensaje.nombre !== 'Administrador' ) {
            html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>'
        }

        html += '    <div class="chat-content">'
        html += '        <h5>' + mensaje.nombre + '</h5>'
        html += '        <div class="box bg-light-' + adminClass + '">' + mensaje.mensaje + '</div>'
        html += '    </div>'
        html += '    <div class="chat-time">' + hora + '</div>'
        html += '</li>'
    }

    divChatbox.append(html)
}

function renderizarTituloDelChat() {
    console.log('Entró al renderizarTituloDelChat')
    let tituloEncabezadoChat = ''
    tituloEncabezadoChat += '<div class="chat-main-header">'
    tituloEncabezadoChat += '    <div class="p-20 b-b">'
    tituloEncabezadoChat += '        <h3 class="box-title">Sala de chat <small>' + sala + '</small></h3>'
    tituloEncabezadoChat += '    </div>'
    tituloEncabezadoChat += '</div>'
    console.log(('tituloEncabezadoChat', tituloEncabezadoChat))
    divChatRightAside.html(tituloEncabezadoChat)

}
// Function scrollBottom
function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

// Listener

divUsuarios.on('click', 'a', function () {

    let id = $(this).data('id')
    if (id) {
        console.log(id)
    }

})

formEnviar.on('click', function (e) {

    e.preventDefault()

    let mensaje = txtMensaje.val().trim()
    if (mensaje.length === 0) {
        return
    }
    socket.emit('crearMensaje', {
        nombre,
        mensaje
    }, function (mensaje) {
        txtMensaje.val('').focus()
        renderizarMensaje(mensaje, true)
        scrollBottom()
    });

})