import styles from "./LoginRegisterForm.module.css"

//TODO: Add "My account" page

export function LoginRegisterForm(){
    return(
        <div className={styles.login_register_form}>
            <div className={`${styles.sign_in_block} ${styles.login_register_block}`}>
                <a href='*' className={`${styles.sign_in_link} ${styles.login_register_link}`}>Sing In</a>
            </div>
            <div className={styles.separator_block}>
                <p className={styles.separator}>
                    /
                </p>
            </div>
            <div className={`${styles.sign_up_block} ${styles.login_register_block}`}>
                <a href='*' className={`${styles.sign_up_link} ${styles.login_register_link}`}>Sing Up</a>
            </div>
            
        </div>
    )
        
    
}