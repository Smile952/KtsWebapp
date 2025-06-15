import { useSelector } from "react-redux";
import { loginUser } from "store/authSlice";



export async function getToken(data: Record<string, unknown>) {
    const userData = useSelector(loginUser)
    return userData
}
