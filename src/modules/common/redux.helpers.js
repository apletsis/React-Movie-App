// Function that enable passing an object with 
// key => action.type
// and value => reducer function

export const createReducer = (initialState = {}, actionHandlerKeysFuncs = {}) => {
    return (state = initialState, action) => {
        const actionHandler = actionHandlerKeysFuncs[action.type];
        return actionHandler ? actionHandler(state, action) : state;
    }
};

// Creates a basic action
const createAction = (type, actionProps) => {
    return {
      type,
      ...actionProps
    };
  }
  
  // e.g. createAsyncActionCreator('GET_NOW_PLAYING', getTopMovies, {page: 1})
  // capture the requestParams as part of the start action for logging transparency
  export const createAsyncActionCreator = (actionType, asyncRequestFn, requestParams) => {
    return (dispatch) => {
      dispatch(createAction(`${actionType}_START`, {request: requestParams}));
      // NOTE: asyncRequestFn must accept single object parameter
      // in order to resolve param values
      return asyncRequestFn(requestParams)
        .then(response => {
          response.json()
            .then(json => dispatch(createAction(`${actionType}_SUCCESS`, { response: json })))
            .catch(error => dispatch(createAction(`${actionType}_ERROR`, { error })));
        });
        
    };
  }
  
  // Setting based on the state of the request
  const initialAsyncState = { response: null, request: null };
  
  // Generic way of handling state changes for an async request
  // Can override {action_type}_START, {action_type}_SUCCESS, {action_type}_ERROR
  export const createAsyncReducer = (actionType, actionHandlerKeyFuncs = {}, initialState = initialAsyncState) => {
     const startReducerFn = (state, action) => ({
        ...state,
        request: action.request
    });
  
    const successReducerFn = (state, action) => ({
        ...state,
        response: action.response
    });
    const errorReducerFn = (state, action) => ({
        ...state,
        error: action.error
    });
  
    return createReducer(
      initialState,
      {
        [`${actionType}_START`]: startReducerFn,
        [`${actionType}_SUCCESS`]: successReducerFn,
        [`${actionType}_ERROR`]: errorReducerFn,
        ...actionHandlerKeyFuncs
      }
    );
  }