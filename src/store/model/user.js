import axios  from 'axios';

const users = {
    state: () => ({
        users: [],
        alluser: [],
        user: {}
    }),
    getters:{
        users(state){
            return state.users
        },
        alluser(state){
            return state.alluser
        },
        user(state){
            return state.user
        }
    },
    mutations:{
        users(state,payload){
            state.users = payload
        },
        user(state,payload){
            state.user = payload
        },
        alluser(state,payload){
            state.alluser = payload
        }
    },

    actions:{
        async getUser(context, payload){
           try {
            await axios.get(`${context.getters.url}/user/${payload}`)
            .then(res => {
                context.commit('users', res.data)
            })
           } catch (error) {
            console.log(error)
           }
        },
        async getAllUser(context){
            try {
               await axios.get(`${context.getters.url}/user/all`)
            .then(res => {
                context.commit('alluser', res.data)
            })
            } catch (error) {
                console.log(error) 
            }
        },
        async changeUser(context, payload){
            try {
              await  axios.put(`${context.getters.url}/user/admin/${payload}`)
            .then(res => {
                    res.data
                context.dispatch('getAllUser');
            })
            } catch (error) {
                console.log(error)
            }
        },

    }
}


export default users