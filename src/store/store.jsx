import store, { RootStore } from '../store/index'
import React, { createContext } from 'react'

export const StoreContext = createContext(store)

export const StoreProvider = ({ children }) => {
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
