import axios from "axios";
import { addrToApis, apiControllers } from "./addr";
import { UserEntity } from "./Entityes/UserEntity/UserEntity";

export async function SynchronizeToken({accessLevel}: {accessLevel: number}): Promise<boolean> {
  let isAuthorized = false;
  const token = localStorage.getItem('token')
  if (accessLevel === 1) {
      return true;
    }
  if (!token) {
    
    return isAuthorized;
  }

  const api =  axios.create({
    baseURL: addrToApis,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })
  
  try{
    await api.get(apiControllers.TokenController)
  
    const user = localStorage.getItem('user')
    const userObject = JSON.parse(user as string) as UserEntity
    const level = userObject?.PermissionId || 0;
    
    isAuthorized = level >= accessLevel;
  }
  catch (err) {
    console.error(err);
    isAuthorized = false;
  }

  return isAuthorized;
}