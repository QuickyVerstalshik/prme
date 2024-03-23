import { useContext } from 'react'
import { StoreContext } from '../store/store'

export const useStores = () => useContext(StoreContext)