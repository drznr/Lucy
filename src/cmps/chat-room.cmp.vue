<template>
    <section class="chat-room">
        <header>
            Logged in as {{ msg.from }}
            <span v-if="someoneTyping">{{ someone }} is typing...</span>
        </header>
        <main>
            <ul class="chat" v-if="routesProps.station">
                <li v-for="(msg, idx) in routesProps.station.chatHistory" :key="idx" class="chat-msg">
                    <span>{{ msg.from }}:</span> {{ msg.txt }}
                </li>
            </ul>
            <form @submit.prevent="sendMsg">
                <input type="text" placeholder="Type here..." v-model="msg.txt" @input="emitTyping" @blur="emitStopTyping" />
                <button>Send</button>
                <button v-if="routesProps.isStationOwner" @click.prevent="clearChat">Clear</button>
            </form>
        </main>
    </section>
</template>

<script>
import { socketService } from '@/services/socket.service';

export default {
    props: {
        routesProps: Object
    },
    data() {
        return {
            msg: {
                txt: '',
                from: (this.routesProps.loggedInUser) ? this.routesProps.loggedInUser.username : 'Guest'
            },
            history: (this.routesProps.station) ? this.routesProps.station.chatHistory : [],
            someoneTyping: false,
            someone: ''
        }
    },
    methods: {
        sendMsg() {
            socketService.emit('chat msg', this.msg);
            this.msg.txt = '';
        },
        emitTyping() {
            socketService.emit('chat is-typing', this.msg.from);
        },
        emitStopTyping() {
            socketService.emit('chat stop-typing');
        },
        clearChat() {
            this.$emit('clear-chat');
        }
    },
    created() {
        socketService.setup();
        socketService.emit('chat station', this.routesProps.station._id);
        socketService.on('chat newMsg', msg => {
            this.history.push(msg);
        });
        socketService.on('chat typing', (from) => {
            this.someoneTyping = true;
            this.someone = from;
        });
        socketService.on('chat one-stoped-typing', () => {
            this.someoneTyping = false;
            this.someone = '';
        });
    },
    destroyed() {
        socketService.terminate();
    }
};
</script>