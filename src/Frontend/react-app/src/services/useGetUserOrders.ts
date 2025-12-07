import axios from "axios"
import { addrToApis, apiControllers, urlWayModification } from "common/addr"
import { OrderEntity } from "common/Entityes/OrderEntity/OrderEntity"
import { UserEntity } from "common/Entityes/UserEntity/UserEntity"
import { useEffect, useState } from "react"

export function useGetOrdersAsync(){
    const [userOrders, setUserOrders] = useState<OrderEntity[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(()=> {
        const getOrders = async () => {
            try{
                setIsLoading(true)
                const user = localStorage.getItem('user')
                const userEntity = JSON.parse(user as string) as UserEntity
                const token = localStorage.getItem('token')
                const request = axios.create({
                    baseURL: addrToApis,
                    headers: {
                        "Content-Type" : "Application/JSON",
                        'Authorization': 'Bearer ' + token
                    }
                })
                const url = `${apiControllers.OrdersController}/${urlWayModification.UserOrders}?email=${userEntity.Email}`
                
                const response = await request.get<OrderEntity[]>(url)
                
                const orders = response.data
                for(let i = 0; i < 10; i++){
                    orders.push(...orders)
                }
                setUserOrders(orders)
                setIsLoading(false)
            }
            catch(err){
                setIsLoading(false)
                console.log(err)
                throw err;
            }
        }
       getOrders()
    }, [])
    return {userOrders, isLoading}
}