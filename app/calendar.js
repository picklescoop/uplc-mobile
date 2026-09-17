import React,{useEffect,useState,useCallback}from"react";
import{View,Text,FlatList,StyleSheet,ActivityIndicator,RefreshControl}from"react-native";
import H from"../components/ClubHeader";
import{api}from"../src/api";

const CENTRAL_TZ="America/Chicago";
const dateFmt=new Intl.DateTimeFormat("en-US",{timeZone:CENTRAL_TZ,month:"2-digit",day:"2-digit",year:"numeric"});
const timeFmt=new Intl.DateTimeFormat("en-US",{timeZone:CENTRAL_TZ,hour:"2-digit",minute:"2-digit",hour12:false});
function parseDate(value){if(!value)return null;const d=new Date(value);return Number.isNaN(d.getTime())?null:d;}
function eventDateTime(item){
 const start=parseDate(item.start||item.date);
 if(!start)return item.date||item.start||"";
 const end=parseDate(item.end);
 const date=dateFmt.format(start);
 const startTime=timeFmt.format(start);
 const endTime=end?timeFmt.format(end):"";
 return endTime?`${date} ${startTime}-${endTime}`:`${date} ${startTime}`;
}
export default function Calendar(){
 const[d,setD]=useState([]),[er,setEr]=useState(""),[busy,setBusy]=useState(true);
 const load=useCallback(async()=>{setEr("");try{const x=await api("/calendar");setD(Array.isArray(x)?x:(x?.events||x?.items||[]))}catch(e){setEr(e.message||"Unable to load the club calendar.")}finally{setBusy(false)}},[]);
 useEffect(()=>{load()},[load]);
 return <View style={s.p}><H app={{name:"University Park Lions"}}/><FlatList contentContainerStyle={s.b} data={d} keyExtractor={(x,i)=>String(x.id||i)} refreshControl={<RefreshControl refreshing={busy} onRefresh={()=>{setBusy(true);load()}}/>} ListHeaderComponent={<><Text style={s.h}>Upcoming Events</Text><Text style={s.zone}>All dates and times shown in Central Time</Text></>} ListEmptyComponent={busy?<ActivityIndicator/>:<View style={s.c}><Text>{er||"No upcoming events."}</Text></View>} renderItem={({item:x})=><View style={s.c}><Text style={s.t}>{x.title?.rendered||x.title||x.name||x.summary||"Event"}</Text><Text style={s.m}>{eventDateTime(x)}</Text>{x.location?<Text style={s.m}>{x.location}</Text>:null}</View>}/></View>
}
const s=StyleSheet.create({p:{flex:1,backgroundColor:"#F4F7FA"},b:{padding:16,paddingBottom:34},h:{fontSize:26,fontWeight:"900",color:"#003B71",marginBottom:2},zone:{color:"#64748B",marginBottom:14},c:{backgroundColor:"#fff",borderRadius:14,padding:16,marginBottom:12,elevation:2},t:{fontWeight:"800",fontSize:16},m:{color:"#64748B",marginTop:5}});
