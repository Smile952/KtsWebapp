import { ReactNode, useEffect, useState } from 'react'
import styles from './AccountBlock.module.css'
import { LoginRegisterForm } from '../Authorization/LoginRegisterForm';
import { useLocation } from 'react-router-dom';
import { UserDataAndTokenStore } from 'store/store';

export function AccountBlock(){
    const [userName, setUserName] = useState<string|null>()
    const userStore = UserDataAndTokenStore.getState().UserEntity

    const location = useLocation()
    
    useEffect(() => {
        const user = userStore

        if(user){
            try{
                const name = (user?.name) 
                
                setUserName(name);
            }
            catch(err){
                console.log('Error parsing user data from local storage', err)
            }
        }        
    }, [location])

    const accountForm : ReactNode = userName ? (<p className={styles.account_name}>{userName}</p>) : (<LoginRegisterForm/>)

    return <div className={styles.account}>{accountForm}</div>

}