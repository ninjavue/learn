import axios from 'axios';


const courses = {
    state: () => ({
        courses: [],
        course: {}
    }),
    getters:{
        courses(state){
            return state.courses
        },
        course(state){
            return state.course
        }
    },
    mutations:{
        courses(state,payload){
            state.courses = payload
        },
        course(state,payload){
            state.course = payload
        }
    },

    actions:{
        async getCourse(context){
           await axios.get(`${context.getters.url}/category`)
            .then(res => {
                context.commit('courses', res.data)
            })
        },
        async deleteCoruses(context, payload){
            await axios.delete(`${context.getters.url}/category/${payload}`)
            .then(res => {
                res.data
                context.dispatch('getCourse');
            })
        }
    }
}


export default courses
