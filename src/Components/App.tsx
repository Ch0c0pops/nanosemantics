import * as React from 'react'
import ChatWindow from "./ChatWindow"
import {Provider} from "react-redux"
import store from "../Redux/store"

function App() {
    return (
        <Provider store={store}>
            <ChatWindow/>
        </Provider>
    )
}

export default App
