export default (socket) => {
    const transcriptionResult = (results) => {
        socket.broadcast.emit('incomingSpeech', results)
    };

    socket.on("createdSpeech", transcriptionResult);
};
