import actionTypes from "../actionTypes";

let INITIAL_STATE = {
    isProgress: false,
    isError: false,
    errorTest: "",
    userDetail: {},
    allUserPublicList: [],
    All_Experience: null,
    All_Skill: null,
    All_Message: null

};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.CREATE_PROFILE_PROGRESS:
            return { ...state, isProgress: true };
        case actionTypes.CREATE_PROFILE_SUCCESS:
            return { ...state, isProgress: false, userDetail: action.payload };
        case actionTypes.CREATE_PRIFILE_ERROR:
            return { ...state, isError: true, isProgress: false, errorTest: action.payload };
        case actionTypes.GET_PROFILE_PROGRESS:
            return { ...state, isProgress: true };
        case actionTypes.GET_PROFILE_SUCCESS:
            return { ...state, isProgress: false, userDetail: action.payload };
        case actionTypes.GET_PROFILE_ERROR:
            return { ...state, isError: true, isProgress: false, errorTest: action.payload };
        case actionTypes.GET_ALL_USER_PUBLIC_SUCCESS:
            return { ...state, allUserPublicList: action.payload };
        case actionTypes.GET_Experience_SUCCESS:
            return { ...state, All_Experience: action.payload };
        case actionTypes.GET_Skill_SUCCESS:

            return { ...state, All_Skill: action.payload };
        case actionTypes.GET_ALL_MESSAGES:
            let array = []
            let data = action.payload
            let finalarray = data.slice(0).reverse()
            let A = array.push(finalarray)
            return { ...state, All_Message: A };

        case actionTypes.GET_Skill_NEW_ARRAY:
            return { ...state, All_Skill: null };


        default:
            return state;
    }
};
