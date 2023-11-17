import axios from 'axios';


const groups = {
    state: () => ({
        groups: [],
        group: {}
    }),
    getters:{
        groups(state){
            return state.groups
        },
        group(state){
            return state.group
        }
    },
    mutations:{
        groups(state,payload){
            state.groups = payload
        },
        group(state,payload){
            state.group = payload
        }
    },

    actions:{
        async getGroup(context, payload){
            await axios.get(`${context.getters.url}/group/${payload}`)
            .then(res => {
                context.commit('groups', res.data)
            })
        }
    }
}


export default groups
