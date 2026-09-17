import React,{useEffect,useState}from"react";
import{View,Text,ScrollView,StyleSheet,ActivityIndicator,Pressable,Alert}from"react-native";
import{Ionicons}from"@expo/vector-icons";
import{useLocalSearchParams}from"expo-router";
import H from"../../components/ClubHeader";
import{api}from"../../src/api";
import{C}from"../../src/theme";

export default function PollDetail(){
 const{id}=useLocalSearchParams();
 const[x,setX]=useState(null),[er,setEr]=useState(""),[busy,setBusy]=useState(false);
 async function load(){try{setEr("");setX(await api(`/polls/${id}`));}catch(e){setEr(e.message);}}
 useEffect(()=>{load();},[id]);
 async function vote(choice_id){setBusy(true);try{await api(`/polls/${id}/vote`,{method:"POST",body:JSON.stringify({choice_id})});await load();}catch(e){Alert.alert("Poll",e.message);}finally{setBusy(false);}}
 const choices=x?.choices||[];
 const total=choices.reduce((n,c)=>n+Number(c.votes||0),0);
 return <View style={s.p}>
  <H app={{name:"University Park Lions"}}/>
  <ScrollView contentContainerStyle={s.b}>
   {!x&&!er?<ActivityIndicator color={C.blue}/>:er?<View style={s.card}><Text style={s.err}>{er}</Text></View>:<View style={s.card}>
    <View style={s.state}><Ionicons name={x.has_voted?"checkmark-circle":"radio-button-on"} size={18} color={x.has_voted?C.success:C.blue}/><Text style={[s.stateText,{color:x.has_voted?C.success:C.blue}]}>{x.has_voted?"Vote recorded":"Open for voting"}</Text></View>
    <Text style={s.h}>{x.question||x.title||"Poll"}</Text>
    {choices.map(c=>{const votes=Number(c.votes||0);const pct=total?Math.round(votes/total*100):0;return <Pressable key={c.id} disabled={busy||x.has_voted} style={({pressed})=>[s.choice,pressed&&!x.has_voted&&s.pressed]} onPress={()=>vote(c.id)}><View style={s.choiceTop}><Text style={s.ct}>{c.choice_text||c.text||c.choice}</Text>{x.has_voted?<Text style={s.pct}>{pct}%</Text>:<Ionicons name="chevron-forward" size={18} color={C.muted}/>}</View>{x.has_voted?<><View style={s.track}><View style={[s.fill,{width:`${pct}%`}]}/></View><Text style={s.votes}>{votes} vote{votes===1?"":"s"}</Text></>:null}</Pressable>;})}
    <Text style={s.note}>{x.has_voted?`${total} total vote${total===1?"":"s"}`:"Tap an option to cast your vote."}</Text>
   </View>}
  </ScrollView>
 </View>;
}
const s=StyleSheet.create({p:{flex:1,backgroundColor:C.bg},b:{padding:16,paddingBottom:40},card:{backgroundColor:C.white,borderRadius:18,padding:18,elevation:2},state:{flexDirection:"row",alignItems:"center",gap:7,marginBottom:12},stateText:{fontWeight:"900",fontSize:12,textTransform:"uppercase",letterSpacing:.5},h:{fontSize:23,fontWeight:"900",color:C.navy,marginBottom:16,lineHeight:29},choice:{borderWidth:1,borderColor:C.border,padding:14,borderRadius:13,marginBottom:12,backgroundColor:C.white},pressed:{backgroundColor:C.blueSoft},choiceTop:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",gap:10},ct:{fontWeight:"800",color:C.text,flex:1},pct:{fontWeight:"900",color:C.blue},track:{height:8,backgroundColor:C.blueSoft,borderRadius:4,overflow:"hidden",marginTop:11},fill:{height:"100%",backgroundColor:C.blue,borderRadius:4},votes:{color:C.muted,fontSize:12,marginTop:5},note:{color:C.muted,marginTop:8,textAlign:"center"},err:{color:C.danger}});
