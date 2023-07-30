import io from 'socket.io-client';

export const initializeSocket = () => {
    let socket = io(`${process.env.BASE_URL}`);
    socket.on('connect', () => {
        console.log('Socket Connected! : ' + socket.id)
    })

    return socket;
};