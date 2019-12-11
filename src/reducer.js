import { combineReducers } from 'redux';
import { usersLogin } from './reducers/login.reducer';
import { register } from './reducers/register.reducer';
import { homeAfterLogin, userBox2Reducer, userBox2TableReducer, box3Reducer, box3DelReducer, box1Reducer, getPorforlioId, saveBox1Reducer } from './reducers/home.reducer';
import { tableBox2, dataUserBox2 } from './reducers/component.reducer';
import { chartReducer, chartReducerTV1, chartReducerTV2, chartReducerTV3, chartReducerToken, chartReducerUser } from './reducers/chart.reducer';
const rootReducer = combineReducers({
    login: usersLogin,
    register,
    homeAfterLogin,
    tableBox2,
    chartReducer,
    chartReducerTV1,
    chartReducerTV2,
    chartReducerTV3,
    chartReducerToken,
    userBox2Reducer,
    userBox2Table: userBox2TableReducer,
    saveBox1Reducer,
    box3Reducer,
    box3DelReducer,
    chartReducerUser,
    dataUserBox2,
    box1Reducer,
    getPorforlioId
});
export default rootReducer;