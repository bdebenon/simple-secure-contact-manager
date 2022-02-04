import Vue from 'vue'
import Vuex from 'vuex'
import {User} from "@/domain/users/models";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: undefined as User | undefined
    },
    getters: {
        user: state => state.user
    },
    mutations: {
        setUser(state, user: User) {
            state.user = user
        }
    },
    actions: {
        login(context, payload) {
            context.commit('setUser', payload.user)
        },
        logout(context) {
            context.commit('setUser', undefined)
        }
    }
})
