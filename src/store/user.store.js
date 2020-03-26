import { userService } from '@/services/user.service';

var localLoggedInUser = null;
if (sessionStorage.user) localLoggedInUser = JSON.parse(sessionStorage.user);

export const userStore = {
    state: {
        loggedInUser: localLoggedInUser
    },
    getters: {
        loggedUser(state) {  
            return state.loggedInUser;
        }
    },
    mutations: {
        setLoggedUser(state, { user }) {  
            state.loggedInUser = user;
        }
    },
    actions: {
        async login(context, { credentials }) { 
            const user = await userService.login(credentials);
            context.commit({type: 'setLoggedUser', user});
            return user;
        },
        async signup(context, { credentials }) {     
            const user = await userService.signup(credentials);
            context.commit({type: 'setLoggedUser', user});
            return user;
        },
        async logout(context) {
            await userService.logout();
            context.commit({type: 'setLoggedUser', user: null});
        }
    }
}