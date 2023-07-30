export default (socket) => {
    const createdMessage = (message) => {
        socket.broadcast.emit("incoming-message", message);
    };

    socket.on("created-message", createdMessage);
};
