import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
const base=Constants.expoConfig?.extra?.apiBase || "https://uplc.picklescoop.com/wp-json/lcm-mobile/v1";
const TOKEN_KEY="lcm_mobile_token";
export async function getToken(){return SecureStore.getItemAsync(TOKEN_KEY)}
export async function setToken(token){if(token)await SecureStore.setItemAsync(TOKEN_KEY,token);else await SecureStore.deleteItemAsync(TOKEN_KEY)}
export async function api(path,options={}){const token=await getToken();const headers={"Content-Type":"application/json",...(token?{Authorization:`Bearer ${token}`}:{ }),...(options.headers||{})};let r;try{r=await fetch(base+path,{...options,headers})}catch(err){const e=new Error("Cannot connect to the University Park Lions website. Check your internet connection and try again.");e.code="NETWORK_ERROR";throw e;}const text=await r.text();let data={};try{data=text?JSON.parse(text):{}}catch{data={message:text}}if(!r.ok){const e=new Error(data?.message||`Request failed (${r.status})`);e.status=r.status;throw e}return data}
export async function login(login,password){const data=await api("/auth/login",{method:"POST",body:JSON.stringify({login,password})});await setToken(data.token);return data}
export async function logout(){try{await api("/auth/logout",{method:"POST"})}finally{await setToken(null)}}
export async function me(){return api("/auth/me")}
