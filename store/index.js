import Vuex from "vuex"

const createStore = () => {
    return new Vuex.Store({
        state() {
            return {
                authed: {},
                myVotes: []
            }
        },
        mutations: {
            updateAuthed(state, auth) {
                state.authed = auth
            },
            updateMyVotes(state, votes) {
                state.myVotes = votes
            }
        }
    })
}

export default createStore

