import React from "react";
import {View,Text,Image,StyleSheet} from "react-native";
const lionsLogo=require("../assets/lions-logo.png");
export default function H({app={}}){
  const remote=typeof app.logo==="string"&&app.logo.trim()?{uri:app.logo}:null;
  return <View style={s.h}><Image source={remote||lionsLogo} style={s.logo}/><View><Text style={s.t}>{app.name||"University Park Lions"}</Text><Text style={s.tag}>We Serve</Text></View></View>
}
const s=StyleSheet.create({h:{backgroundColor:"#003B71",paddingTop:46,paddingBottom:12,paddingHorizontal:18,flexDirection:"row",alignItems:"center",gap:12},logo:{width:54,height:54,resizeMode:"contain"},t:{color:"#fff",fontSize:20,fontWeight:"800"},tag:{color:"#FDBE00",fontStyle:"italic"}});
