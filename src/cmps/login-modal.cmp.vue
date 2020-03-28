<template>
    <section class="login">
        <transition name="fade">
            <div class="login-cover" v-if="isActive" @click.self="closeLogin">
                <aside class="login-modal">
                    <h2 class="login-modal-header">Login</h2>
                    <form @submit.prevent="doLogin">
                            <input type="text" placeholder="Username" class="login-modal-inp form-inp" v-model="credentials.username" @input="clearMsg" />
                            <label>Username</label>
                            <input type="password" placeholder="Password" class="login-modal-inp form-inp" v-model="credentials.password" @input="clearMsg" />
                            <label>Password</label>
                            <p class="login-modal-msg" :class="{active: msgActive}">Please enter username and password</p>
                        <button class="btn">Login</button>
                    </form>
                </aside>
            </div>
        </transition>
    </section>
</template> 

<script>
import { eventBusService } from '@/services/event-bus.service';
import { userService } from '@/services/user.service.js';


export default {
    data() {
        return {
            isActive: false,
            credentials: userService.getEmptyLoginCredentials(),
            msgActive: false
        }
    },
    methods: {
        doLogin() {
            if(!this.credentials.username || !this.credentials.password) return this.msgActive = true;
            this.$store.dispatch({
                type: 'login',
                credentials: JSON.parse(JSON.stringify(this.credentials))
            });
            this.closeLogin();
        },
        closeLogin() {
            this.isActive = false;
            this.msgActive = false;
            this.credentials = userService.getEmptyLoginCredentials();
        },
        clearMsg() {
            this.msgActive = false;
        }
    },
    created() {
        eventBusService.$on('open-login', () => {
            this.isActive = true;
        });
    },
    destroyed() {
        eventBusService.$off('open-login');
    }
};
</script>