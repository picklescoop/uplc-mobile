import React from "react";
import {View,Text,Image,StyleSheet,Pressable} from "react-native";
import {router,usePathname} from "expo-router";
const lionsLogo=require("../assets/lions-logo.png");
export default function H({app={}}){
  const pathname=usePathname();
  const home=pathname==="/"||pathname==="/index";
  const goBack=()=>{if(router.canGoBack())router.back();else router.replace("/");};
  return <View style={s.h}>
    {!home?<Pressable onPress={goBack} accessibilityRole="button" accessibilityLabel="Back" hitSlop={12} style={s.back}><Text style={s.backText}>‹</Text></Pressable>:null}
    <Image source={lionsLogo} style={s.logo}/>
    <View style={s.words}><Text style={s.t}>{app.name||"University Park Lions"}</Text><Text style={s.tag}>We Serve</Text></View>
  </View>
}
const s=StyleSheet.create({h:{backgroundColor:"#003B71",paddingTop:46,paddingBottom:12,paddingHorizontal:14,flexDirection:"row",alignItems:"center",gap:10,minHeight:112},back:{width:38,height:54,alignItems:"center",justifyContent:"center"},backText:{color:"#fff",fontSize:42,lineHeight:46,fontWeight:"400"},logo:{width:54,height:54,resizeMode:"contain"},words:{flex:1},t:{color:"#fff",fontSize:20,fontWeight:"800"},tag:{color:"#FDBE00",fontStyle:"italic"}});
