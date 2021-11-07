import {MessageType} from "../../Types/types"

export async function updateLocalHistory(newMessage: MessageType) { //функция-помощник

    let history: string | null = localStorage.getItem('history')
    if (history) { //что-то лежит в истории
        let parsedHistory = JSON.parse(history) //парсим содержимое
        let updatedHistory
        if (Array.isArray(history) && history.length === 0) { //если пустой массив в истории
            updatedHistory = history.push(newMessage)
        } else {
            updatedHistory = [...parsedHistory, newMessage] //если массив не пустой, объединяем со старым
        }
        localStorage.setItem('history', JSON.stringify(updatedHistory)) // перезаписываем хранилище
    }
}