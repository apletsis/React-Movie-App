// Function that enable passing an object with 
// key => action.type
// and value => reducer function

export const createReducer = (initialState = {}, actionHandlerKeysFuncs = {}) => {
    return (state = initialState, action) => {
        const actionHandler = actionHandlerKeysFuncs[action.type];
        return actionHandler ? actionHandler(state, action) : state;
    }
};