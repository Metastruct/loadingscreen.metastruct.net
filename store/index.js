export const state = () => {
    return {
        authed: {},
        myVotes: []
    };
};

export const mutations = {
    updateAuthed(state, auth) {
        state.authed = auth;
    },
    updateMyVotes(state, votes) {
        state.myVotes = votes;
    }
};
