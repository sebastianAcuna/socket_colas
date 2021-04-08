
const socket = io();


const searchParam  = new URLSearchParams( window.location.search );

if( !searchParam.has('escritorio') ){
    window.location = './index.html';
    throw new Error('el escritorio es obligatorio ');
}

const escritorio = searchParam.get('escritorio');


const lblEscritorio = document.querySelector("#lblEscritorio");
const btnAtender = document.querySelector("#btnAtender");
const small = document.querySelector("#small");
const alerta = document.querySelector("#alerta");
const lblPendientes = document.querySelector("#lblPendientes");

alerta.style.display = 'none';

lblEscritorio.innerText = escritorio;

socket.on('connect', () => {
    // console.log('Conectado');

    btnAtender.disabled = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    btnAtender.disabled = true;
});


socket.on( 'tickets-pendientes', (ticket) => {
    // lblNuevoTicket.innerText = `Ticket ${ticket}`;
    lblPendientes.innerText = ticket;
});

btnAtender.addEventListener( 'click', () => {

    socket.emit( 'atender-ticket', {escritorio}, ( {ok, ticket, msg} ) => {
        
        if( !ok  ){
            alerta.style.display = ''
            alerta.innerHTML = `<span> ${msg} </span>`;
            small.innerText = `Nadie`;
            return ;
        }

        small.innerText = `Ticket ${ ticket.numero }`;
    });

});