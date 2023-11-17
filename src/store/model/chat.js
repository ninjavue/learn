import axios from 'axios';

const chat = {
    state: () => ({
        chats: [],
        chat: {},
        fon: {}
    }),
    getters:{
        chats(state){
            return state.chats
        },
        chat(state){
            return state.chat
        },
        fon(state){
            return state.fon
        }
    },
    mutations:{
        chats(state,payload){
            state.chats = payload
        },
        chat(state,payload){
            state.chat = payload
        },
        fon(state,payload){
            state.fon = payload
        }
    },

    actions:{
        async getChat(context, payload){
           try {
            await axios.get(`${context.getters.url}/chat/${payload}`)
            .then(res => {
                context.commit('chats', res.data)
            })
           } catch (error) {
            console.log(error)
           }
        },
        async getFon(context, payload){
           try {
            await axios.get(`${context.getters.url}/user/fon/${payload}`)
            .then(res => {
                context.commit('fon', res.data[0])
                console.log(res.data);
            })
           } catch (error) {
            console.log(error)
           }
        },
    }
}


export default chat
