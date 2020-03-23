<template>
    <section class="signup">
        SIGNUP
    </section>
</template>

<script>
import { userService } from '@/services/user.service.js';

export default {
    props: {},
     data() {
        return {
            credentials: userService.getEmptySignupCredentials()
        }
     }
};
</script>