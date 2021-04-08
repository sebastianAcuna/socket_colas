

console.log('Nuevo Ticket HTML');


const socket = io();


const lblNuevoTicket = document.querySelector("#lblNuevoTicket");
const btn_genera = document.querySelector("#btn_genera");


socket.on('connect', () => {
    // console.log('Conectado');

    btn_genera.disabled = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    btn_genera.disabled = true;
});


socket.on( 'ultimo-ticket', (ticket) => {
    lblNuevoTicket.innerText = `Ticket ${ticket}`;
});

btn_genera.addEventListener( 'click', () => {

    socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket;
    });

});