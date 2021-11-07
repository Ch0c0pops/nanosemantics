import {DispatchType} from "./store"
import {ChatAPI} from "../API/axios API"
import {chatReducerActions, ChatReducerActionTypes, ChatReducerStateType} from "../Types/types"
import {updateLocalHistory} from "../assets/Functions/common_functions"


const initialState: ChatReducerStateType = {
    chat: []
}

//-----action creators--------//
export const getHistoryDataAC = () => ({type: chatReducerActions.GET_HISTORY_DATA})
export const eraseChatHistoryAC = () => ({type: chatReducerActions.ERASE_HISTORY_DATA})

//-----thunk creators--------//
export const chatInitThunk = () => async (dispatch: DispatchType) => {
    try {
        let response = await ChatAPI.init()
        if (!localStorage.getItem('cuid') || localStorage.getItem('cuid') !== response.result['cuid']) {

            localStorage.setItem('cuid', response.result['cuid']) //заменили cuid  на новый
            localStorage.setItem('history', '[]') //и очистили возможно существующую историю переписки

        } else {
            dispatch(getHistoryDataAC())
        }

    } catch (e: any) {
        console.log(e.message)
    }
}

export const chatRequestThunk = (message: any) => async (dispatch: DispatchType) => {
    try {
        let newUserMessage = {message: message, isBot: false}
        await updateLocalHistory(newUserMessage)
        const response = await ChatAPI.request(message)
        const newBotAnswer = {message: response.result.text.value, isBot: true}
        await updateLocalHistory(newBotAnswer)
        dispatch(getHistoryDataAC())

    } catch (e: any) {
        console.log(e.message)
    }
}
const chatReducer = (state = initialState, action: ChatReducerActionTypes) => {

    switch (action.type) {

        case chatReducerActions.GET_HISTORY_DATA:
            let historyData: string | null = localStorage.getItem('history')
            return {...state, chat: JSON.parse(historyData!)}

        case chatReducerActions.ERASE_HISTORY_DATA:
            return {...state, chat: []}

        default:
            return state
    }
}

export default chatReducer