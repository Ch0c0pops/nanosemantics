//------------------------chatReducer.ts types--------------------------//

export enum chatReducerActions {
    GET_HISTORY_DATA = 'GET_HISTORY_DATA',
    ERASE_HISTORY_DATA = 'ERASE_HISTORY_DATA'
}

export type GetHistoryDataActionType = {
    type: typeof chatReducerActions.GET_HISTORY_DATA

}
export type EraseHistoryDataActionType = {
    type: typeof chatReducerActions.ERASE_HISTORY_DATA

}
export type ChatReducerActionTypes = GetHistoryDataActionType | EraseHistoryDataActionType

export type MessageType = {
    message: string
    isBot: boolean
}

export type ChatReducerStateType = {
    chat: Array<MessageType>
}

//------------------------other types--------------------------//