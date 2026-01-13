import { Footer } from "components/Footer/Footer";
import styles from "./Page.module.css"
import { JSX, JSXElementConstructor, ReactElement } from "react";
import { Chat } from "components/Chat/Chat";


export function Page({ header, children }: 
    { 
        header: ReactElement<unknown, JSXElementConstructor<any>>, 
        children: ReactElement<unknown, JSXElementConstructor<any>> 
    }) : JSX.Element
{
    return (
        <div className={styles.page_container}>
            <div>
                {header}
            </div>
            
            <main className={styles.main_content}>
                {children}
                <Chat/>
            </main>
            
            <Footer />
        </div>
    )
}