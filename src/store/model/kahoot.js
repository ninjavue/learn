import axios from "axios";



const kahoot = {
    state: () => ({
        kahoots: [],
        pin:{},
    }),
    getters:{
        kahoots(state){
            return state.kahoots
        },
        pin(state){
            return state.pin
        }
    },
    mutations:{
        kahoots(state,payload){
            state.kahoots = payload
        },
        pin(state, payload){
            state.pin = payload
        }
    },
    actions:{
        async getPin(context, payload){
            try {
                await axios.get(`${context.getters.url}/kahoot/${payload}`)
                .then(res => {
                    context.commit('pin', res.data)
                })
            } catch (error) {
                console.log(error);
            }
        }
    }
}

export default kahoot