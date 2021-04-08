
const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = (socket) => {
    

    socket.emit( 'ultimo-ticket' , ticketControl.ultimo );
    socket.emit( 'estado-actual' , ticketControl.ultimos4 );
    socket.emit( 'tickets-pendientes', ticketControl.tickets.length)

    console.log('Cliente conectado', socket.id );

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id );
    });

    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        const siguiente = ticketControl.siguiente();
        socket.broadcast.emit( 'tickets-pendientes', ticketControl.tickets.length)
        callback( siguiente );
        
        //TODO: notificar que hay un nuevo ticket pendiente

    });


    socket.on( 'atender-ticket', ({escritorio}, callback) => {
        if( !escritorio ){
            return callback({ ok:false, msg:'El escritorio es obligatorio'});
        }


        const ticket = ticketControl.atenderTicket( escritorio );

        //TODO: notificar los ultimos 4
        socket.broadcast.emit( 'estado-actual' , ticketControl.ultimos4 );
        socket.broadcast.emit( 'tickets-pendientes', ticketControl.tickets.length)
        socket.emit( 'tickets-pendientes', ticketControl.tickets.length)

        if( !ticket ){
            return callback({ok:false, msg:'Ya no hay tickets pendientes'});
        }else{
            return callback({ ok:true, ticket});
        }
    })

}



module.exports = {
    socketController
}

