import axios  from 'axios';

const lessons = {
    state: () => ({
        lessons: [],
        lesson: {},
    }),
    getters:{
        lessons(state){
            return state.lessons
        },
        lesson(state){
            return state.lesson
        }
    },
    mutations:{
        lessons(state,payload){
            state.lessons = payload
        },
        lesson(state,payload){
            state.lesson = payload
        },
    },

    actions:{
        async getOneLesson(context, payload){
           try {
            await axios.get(`${context.getters.url}/product/one/${payload}`)
            .then(res => {
                context.commit('lesson', res.data)
                console.log(res.data);
                context.dispatch("getComment", res.data._id);
            })
           } catch (error) {
               console.log(error);
           }
        },
        async getLesson(context, payload){
           try {
            await axios.get(`${context.getters.url}/product/categoryId/${payload}`)
            .then(res => {
                context.commit('lessons', res.data)
                if(!res.data){
                    context.dispatch('getOneLesson');
                    console.log('undef');
                }else{
                    context.dispatch('getOneLesson', res.data[0]._id);
                    console.log('no undef');
                }
            })
           } catch (error) {
                console.log(error);
           }
        },
       
    }
}


export default lessons