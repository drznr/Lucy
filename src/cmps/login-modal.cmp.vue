<template>
    <section class="login">
        <transition name="fade">
            <div class="login-cover" v-if="isActive" @click.self="closeLogin">
                <aside class="login-modal">
                    <h2 class="login-modal-header">Login</h2>
                    <form @submit.prevent="doLogin">
                            <input type="text" placeholder="Username" class="login-modal-inp form-inp" v-model="credentials.username" />
                            <label>Username</label>
                            <input type="password" placeholder="Password" class="login-modal-inp form-inp" v-model="credentials.password" />
                            <label>Password</label>
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
            credentials: userService.getEmptyLoginCredentials()
        }
    },
    methods: {
        doLogin() {
            debugger
        },
        closeLogin() {
            this.isActive = false;
            this.credentials = userService.getEmptyLoginCredentials();
        }
    },
    created() {
        eventBusService.$on('open-login', () => {
            this.isActive = true;
        });
    }
};
</script>