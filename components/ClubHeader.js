import React from "react";
import {View,Text,Image,StyleSheet,Pressable} from "react-native";
import {router,usePathname} from "expo-router";
const lionsLogo=require("../assets/lions-logo.png");
export default function H({app={}}){
  const pathname=usePathname();
  const normalized=(pathname||"/").replace(/\/+$/,"")||"/";
  const home=normalized==="/"||normalized==="/index";
  const goBack=()=>{if(router.canGoBack())router.back();else router.replace("/");};
  return <View style={s.h}>
    {!home?<Pressable onPress={goBack} accessibilityRole="button" accessibilityLabel="Back" hitSlop={14} style={s.back}><Text style={s.backText}>‹</Text></Pressable>:null}
    <Image source={lionsLogo} style={s.logo}/>
    <View style={s.words}><Text style={s.t}>{app.name||"University Park Lions"}</Text><Text style={s.tag}>We Serve</Text></View>
  </View>
}
const s=StyleSheet.create({h:{backgroundColor:"#003B71",paddingTop:46,paddingBottom:12,paddingHorizontal:12,flexDirection:"row",alignItems:"center",gap:8,minHeight:112},back:{width:44,height:54,alignItems:"flex-start",justifyContent:"center",paddingLeft:2},backText:{color:"#fff",fontSize:44,lineHeight:48,fontWeight:"500"},logo:{width:54,height:54,resizeMode:"contain"},words:{flex:1},t:{color:"#fff",fontSize:20,fontWeight:"800"},tag:{color:"#FDBE00",fontStyle:"italic"}});
