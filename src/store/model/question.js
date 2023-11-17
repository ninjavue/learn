import axios from "axios"


const questions = {
    state: () => ({
        questions: [],
        kahoot: [],
        question: {},
        answer1:{},
        answer2:{},
        answer3:{},
        answer4: {},
    }),
    getters: {
        questions(state) {
            return state.questions
        },
        kahoot(state) {
            return state.kahoot
        },
        question(state) {
            return state.question
        },
        answer1(state) {
            return state.answer1
        },
        answer2(state) {
            return state.answer2
        },
        answer3(state) {
            return state.answer3
        },
        answer4(state) {
            return state.answer4
        },
    },
    mutations: {
        questions(state, payload) {
            state.questions = payload
        },
        kahoot(state, payload) {
            state.kahoot = payload
        },
        question(state, payload) {
            state.question = payload
        },
        answer1(state, payload) {
            state.answer1 = payload
        },
        answer2(state, payload) {
            state.answer2 = payload
        },
        answer3(state, payload) {
            state.answer3 = payload
        },
        answer4(state, payload) {
            state.answer4 = payload
        },
    },
    actions: {
        getUserQues(context,payload) {
            axios.get(`${context.getters.url}/question/catId/${payload}`)
                .then(res => {
                    context.commit('questions', res.data)
                })
            },
            deleteQues(context,payload){
                axios.delete(`${context.getters.url}/question/${payload}`)
                .then(res => {
                    res.data
                    context.dispatch('getUserQues');
                })
            },
            getOneQues(context, payload){
                axios.get(`${context.getters.url}/question/${payload}`)
                .then(res => {
                context.commit('question', res.data)
                context.commit('answer2', res.data.answer.answer2)
                context.commit('answer1', res.data.answer.answer1)
                context.commit('answer3', res.data.answer.answer3)
                context.commit('answer4', res.data.answer.answer4)
            })
        },

        // kahoot category


        getAllKahoot(context) {
            axios.get(`${context.getters.url}/kahoot`)
                .then(res => {
                    context.commit('kahoot', res.data)
                })
            },
    },

}
export default questions