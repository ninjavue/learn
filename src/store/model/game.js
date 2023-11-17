import axios from 'axios';

const game = {
    state: () => ({
        games: [],
        game: {},
        errorGame: null, // Xatoni null qilib o'rnating
    }),
    getters: {
        games(state) {
            return state.games
        },
        game(state) {
            return state.game
        },
        errorGame(state) {
            return state.errorGame
        }
    },
    mutations: {
        games(state, payload) {
            state.games = payload
        },
        game(state, payload) {
            state.game = payload
        },
        errorGame(state, payload) {
            state.errorGame = payload // Xatoni o'zgartirish
        },
    },

    actions: {
        async getGame(context, payload) {
            try {
                const response = await axios.get(`${context.getters.url}/question/game/${payload}`);
                if (response.status === 404) {
                    context.commit("errorGame", "404 Xato: Sahifa topilmadi"); // Xatolikni to'g'ri ko'rsatish
                    console.log("404 Xato: Sahifa topilmadi");
                } else {
                    context.commit("games", response.data)
                    window.location.href = `/kahoot-game-start/${payload}`
                }
            } catch (error) {
                context.commit("errorGame", error.message)
            }
        },
        async getNewGame(context, payload) {
            try {
                const response = await axios.get(`${context.getters.url}/question/game/${payload}`);
                if (response.status === 404) {
                    context.commit("errorGame", "404 Xato: Sahifa topilmadi"); // Xatolikni to'g'ri ko'rsatish
                    console.log("404 Xato: Sahifa topilmadi");
                } else {
                    context.commit("game", response.data)
                }
            } catch (error) {
                context.commit("errorGame", error.message)
            }
        },

        async deleteKahoot(context, payload){
            try {
                await axios.delete(`${context.getters.url}/kahoot/${payload}`);
                console.log('Delete Kahoot success');
            } catch (error) {
                console.log('Error delete Kahoot');
            }
        }
    }
}

export default game