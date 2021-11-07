import * as React from 'react'
import styles from '../styles/ChatWindow.module.scss'
import MessageBar from "./MessageBar"
import {chatInitThunk} from "../Redux/chatReducer"
import {useTypedUseSelector} from "../Redux/store"
import {Message, BotMessage} from "./Message"
import {useDispatch} from "react-redux"
import {MessageType} from "../Types/types"

const ChatWindow: React.FC = () => {

    const chat: Array<MessageType> = useTypedUseSelector(state => state.chat.chat)
    const dispatch = useDispatch()

    const AlwaysScrollToBottom = () => {
        const elementRef = React.useRef();
        React.useEffect(() => {
            if (elementRef !== undefined) {
                // @ts-ignore
                elementRef.current.scrollIntoView()
            }
        })
        return <div ref={elementRef}/>;
    }  /*функция автопрокрутки при добавлении сообщения*/

    React.useEffect(() => {
        dispatch(chatInitThunk())
    }, []);

    return (
        <div className={styles.chatWindow}>
            <div className={styles.chatWindow__header}>
            </div>
            <div className={styles.chatWindow__content}>
                {chat.map((chat: MessageType, index: number) => {
                    return chat.isBot ? <BotMessage message={chat.message} key={index}/> :
                        <Message message={chat.message} key={index}/>
                })}
                <AlwaysScrollToBottom/> {/*автопрокрутка вниз чата*/}
            </div>
            <MessageBar/>
        </div>
    )
}

export default ChatWindow