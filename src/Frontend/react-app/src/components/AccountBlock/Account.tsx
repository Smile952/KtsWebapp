import axios from "axios"
import { addrToApis, apiControllers } from "common/addr"
import { OrderEntity } from "common/Entityes/OrderEntity/OrderEntity"
import { UserEntity } from "common/Entityes/UserEntity/UserEntity"

export function Account(){
    const userOrders = getOrders();
    return (<div></div>)
}

async function getOrders(){
    try{
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

        const response = (await request.get(`${apiControllers.OrdersController}/${userEntity.Email}`)).data
        const orderEntity = JSON.parse(response) as OrderEntity[]
        return orderEntity 
    }
    catch(err){
        console.log(err)
    }
}