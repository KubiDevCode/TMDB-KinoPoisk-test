import type { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { store } from '../model/store'

export const StoreProvider = ({ children }: PropsWithChildren) => {
    return <Provider store={store}>{children}</Provider>
}