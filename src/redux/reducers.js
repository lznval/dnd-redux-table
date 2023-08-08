const initialState = {
    companies: [],
    currentPage: 1
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_COMPANIES':
            return {
                ...state,
                companies: action.payload
            };
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.payload
            };
        case 'SET_COMPANIES':
            return {
                ...state,
                companies: action.payload
            };
        default:
            return state;
    }
};

export default rootReducer;
