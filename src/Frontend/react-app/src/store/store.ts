import { UserEntity } from 'common/Entityes/UserEntity/UserEntity'
import { createStore } from 'zustand/vanilla'
import { persist } from 'zustand/middleware'

type UserType = {
    UserEntity: UserEntity
}

type UserEntityStoreAction = {
    setEntity: (UserEntity: UserEntity) => void
}

type UserEntityStore = UserType & UserEntityStoreAction

export const UserDataAndTokenStore = createStore<UserEntityStore>()(
    persist(
        (set) => ({
            UserEntity: ({} as UserEntity),
            setEntity: (UserEntity: UserEntity) => set({UserEntity})
        }),
        {name: 'token-store'}
    ),
)