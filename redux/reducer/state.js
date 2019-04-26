const defaultState = {a: 'a', b: 'b'};

const state = (state = defaultState, action) => {
    
    switch(action.type){
        default:
        return state;
    }
}

export default state;