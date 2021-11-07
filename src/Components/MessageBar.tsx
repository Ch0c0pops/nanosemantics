import React from 'react'
import styles from '../styles/ChatWindow.module.scss'
import arrow_btn_2 from '../assets/images/arrow_btn_2.png'
import {chatRequestThunk, eraseChatHistoryAC} from "../Redux/chatReducer"
import {useDispatch} from "react-redux"
import eraser_btn from "../assets/images/eraser.png"

const MessageBar: React.FC = () => {
    const dispatch = useDispatch()
    const [newMessage, setNewMessage] = React.useState('')

    function sendNewMessage(message: string) {
        dispatch(chatRequestThunk(message))
    }

    function eraseHistory() {
        localStorage.setItem('history', '[]')
        dispatch(eraseChatHistoryAC())
    }

    return (
        <div className={styles.chatWindow__messageBar}>
            <div className={styles.newMessageInput}>
                <img src={eraser_btn} alt='eraseHistoryBtn' onClick={() => {
                    eraseHistory()
                }}/>
                <input type="text" placeholder="Введите вопрос" value={newMessage}
                       onKeyPress={(e) => {
                           if (e.key === 'Enter' && newMessage !== '') {
                               sendNewMessage(newMessage)
                               setNewMessage('')
                           }
                       }}
                       onChange={(e) => setNewMessage(e.target.value)}/>

                <img src={arrow_btn_2} alt='sendMessageBtn' onClick={() => {
                    if (newMessage !== '') {
                        sendNewMessage(newMessage)
                        setNewMessage('')
                    }
                    return undefined
                }}/>

            </div>
        </div>
    )
}

export default MessageBar