import { observable } from 'mobx'
import { injectWatchers } from '../watchers/index'
import {UserStore} from "../pages/api/userDataStore";

export class RootStore {
    userStore = new UserStore(this)
}

export const store = observable(new RootStore())

injectWatchers(store)

const initStore = async () => {
    const {userDataStore} = store
}

initStore()

export default store
