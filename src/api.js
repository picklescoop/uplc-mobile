import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
const fallback="https://uplc.picklescoop.com/wp-json/lcm-mobile/v1";
export const API=(Constants.expoConfig?.extra?.apiBase||fallback).replace(/\/$/,"");
const TOKEN_KEY="lcm_mobile_token";
export async function getToken(){return SecureStore.getItemAsync(TOKEN_KEY)}
export async function setToken(token){if(token)await SecureStore.setItemAsync(TOKEN_KEY,token);else await SecureStore.deleteItemAsync(TOKEN_KEY)}
export async function api(path,options={}){const token=await getToken();const headers={Accept:"application/json",...(options.body?{"Content-Type":"application/json"}:{}),...(token?{Authorization:`Bearer ${token}`}:{}) ,...(options.headers||{})};let r;try{r=await fetch(API+path,{...options,headers})}catch(e){throw new Error("Unable to reach the University Park Lions server. Check your internet connection and try again.")}let data=null;try{data=await r.json()}catch{}if(!r.ok){const e=new Error(data?.message||`Server request failed (${r.status}).`);e.status=r.status;throw e}return data}
export async function login(login,password){const data=await api("/auth/login",{method:"POST",body:JSON.stringify({login,password})});if(!data?.token)throw new Error("The server did not return a sign-in token.");await setToken(data.token);return data}
export async function logout(){try{return await api("/auth/logout",{method:"POST"})}finally{await setToken(null)}}
export async function me(){return api("/auth/me")}
