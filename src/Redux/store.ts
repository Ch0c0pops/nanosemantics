import {combineReducers, configureStore} from '@reduxjs/toolkit'
import thunk from "redux-thunk"
import chatReducer from "./chatReducer"
import {TypedUseSelectorHook, useSelector} from "react-redux"


const reducers = combineReducers({
    chat: chatReducer
})

const store = configureStore({
    reducer: reducers, middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(thunk)
});

// export type StateType = ReturnType<typeof store.getState> не использовал
export type DispatchType = typeof store.dispatch

export type RootState = ReturnType<typeof reducers>
export const useTypedUseSelector: TypedUseSelectorHook<RootState> = useSelector

// @ts-ignore
window.store = store

export default store