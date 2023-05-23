import { createContext } from 'react'
import { User } from './graphql'

export const UserContext = createContext<User>({} as User)
