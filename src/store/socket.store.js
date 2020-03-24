import socket from '../services/socket.service.js'

export const socketStore = {
    state: {
        
    },
    getters: {
        
    },
    mutations: {

    },
    actions: {
        updateRate(context, {station}) {
            socket.emit('updateRate', station)
        },
    }
}