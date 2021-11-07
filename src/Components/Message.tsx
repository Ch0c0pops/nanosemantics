import * as React from 'react'
import styles from '../styles/ChatWindow.module.scss'

type PropsType = {
    message: string
}

export const Message: React.FC<PropsType> = (props) => {
    return (
        <div className={styles.message}>
            {props.message}
        </div>
    )
}

export const BotMessage: React.FC<PropsType> = (props) => {
    return (
        <div className={styles.botMessage}>
            {props.message}
        </div>
    )
}
