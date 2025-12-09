import axios from "axios";
import { apiControllers } from "common/Constants/addr";



export async function getToken(data: Record<string, unknown>) {
    const credentials = {
        email: data.email,
        password: data.password
    }
    const response = axios.post(
        apiControllers.TokenController,
        credentials
    )
    console.log((await response).data)
}