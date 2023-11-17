import axios from 'axios';


const comment = {
    state: () => ({
        comments: [],
        comment: {}
    }),
    getters:{
        comments(state){
            return state.courses
        },
        comment(state){
            return state.course
        }
    },
    mutations:{
        comments(state,payload){
            state.courses = payload
        },
        comment(state,payload){
            state.course = payload
        }
    },

    actions:{
        async getComment(context, payload){
            
           try {
           await axios.get(`${context.getters.url}/comment/${payload}`)
            .then(res => {
                context.commit('comments', res.data)
            })
           } catch (error) {
            console.log(error);
           }
        }
    }
}


export default comment
