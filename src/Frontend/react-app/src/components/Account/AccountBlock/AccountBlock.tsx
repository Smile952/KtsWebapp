import { ReactNode, useEffect, useState } from 'react'
import styles from './AccountBlock.module.css'
import { UserEntity } from 'common/Entityes/UserEntity/UserEntity';
import { LoginRegisterForm } from '../Authorization/LoginRegisterForm';

export function AccountBlock(){
    const [userName, setUserName] = useState<string | null>(null);
    useEffect(() => {
        const user = localStorage.getItem('user');
        if(user){
            try{
                const userObject = JSON.parse(user as string) as UserEntity
        
                const name = (userObject?.name) 
                
                setUserName(name);
            }
            catch(err){
                console.log('Error parsing user data from local storage', err)
            }
        }        
    }, [])

    const accountForm : ReactNode = userName ? (<p className={styles.account_name}>{userName}</p>) : (<LoginRegisterForm/>)

    return <div className={styles.account}>{accountForm}</div>

}