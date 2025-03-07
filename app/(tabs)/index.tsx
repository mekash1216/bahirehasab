import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // You can use icons from Ionicons or other libraries
import { blue } from "react-native-reanimated/lib/typescript/Colors";

interface BahireHasabResults {
  WengelawiResult: string;
  newYearResult: string;
  Wenber: number;
  Abekte: number;
  Metk: number;
  mebajaHamer: number;
  tsomeNeneweMonth: string;
  tsomeNeneweDay: number;
  abiyTsome: string;
  debreZeyt: string;
  hosaena: string;
  siklet: string;
  tinsae: string;
  rikbekahinat: string;
  erget: string;
  menfeskidus:string;
  tsomedihnet:string;
  tsomehawariat:string;
}

const BahireHasabCalculator = () => {
  const [ethiopianYear, setEthiopianYear] = useState<number>(2017);
  const [results, setResults] = useState<BahireHasabResults | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);

  const BC = 5500;
  const TinteAbekte = 11;

  // Helper function to add days and handle month transitions
  const addDaysToDate = (startMonth: string, startDay: number, daysToAdd: number) => {
    const monthNames = ["ጥር", "የካቲት","መጋቢት", "ሚያዝያ", "ግንቦት", "ሰኔ", "ሐምሌ", 
      "ነሃሴ","መስከረም", "ጥቅምት", "ኅዳር", "ታኅሣሥ", ];
    
    let newMonth = startMonth;
    let newDay = startDay + daysToAdd;

    while (newDay > 30) {
      newDay -= 30;
      let currentMonthIndex = monthNames.indexOf(newMonth);
      currentMonthIndex = (currentMonthIndex + 1) % monthNames.length;
      newMonth = monthNames[currentMonthIndex];
    }

    return `${newMonth} ${newDay}`;
  };

  const calculateBahireHasab = (AC: number) => {
    let TotalYear = BC + AC;
    let Wengelawi = TotalYear % 4;
    let WengelawiNames = ["ዮሐንስ", "ማቴዎስ", "ማርቆስ", "ሉቃስ"];
    let WengelawiResult = WengelawiNames[Wengelawi];

    let Metenerabit = Math.floor(TotalYear / 4);
    let days = ["ሰኞ", "ማክሰኞ", "ረቡዕ", "ሐሙስ", "ዓርብ", "ቅዳሜ", "እሑድ"];
    let newYearDay = (TotalYear + Metenerabit) % 7;
    let newYearResult = days[newYearDay];

    let Wenber = (TotalYear % 19) - 1;
    if (Wenber === -1) {
      Wenber = 18;
    }

    let Abekte = (Wenber * TinteAbekte) % 30;
    let Metk = 30 - Abekte;

    const findWeekday = (startDay: number, daysToAdd: number) => {
      return days[(startDay + daysToAdd) % 7];
    };

    const dayTewsak: Record<string, number> = {
      "ሰኞ": 6, "ማክሰኞ": 5, "ረቡዕ": 4, "ሐሙስ": 3, "ዓርብ": 2, "ቅዳሜ": 8, "እሑድ": 7
    };

    let BealeMetqiMonth = Metk > 14 ? "መስከረም" : "ጥቅምት";
    let BealeMetqiDay = Metk > 14 ? Metk : Metk + 30;
    let BealeMetqiWeekday = findWeekday(newYearDay, BealeMetqiDay - 1);
    let Tewsak = dayTewsak[BealeMetqiWeekday];

    let mebajaHamer = BealeMetqiDay + Tewsak;
    let tsomeNeneweMonth = Metk > 14 ? "ጥር" : "የካቲት";
    
    if (mebajaHamer > 30) {
      mebajaHamer -= 30;
      tsomeNeneweMonth = "የካቲት";
    }

    let abiyTsome = addDaysToDate(tsomeNeneweMonth, mebajaHamer, 14);
    let debreZeyt = addDaysToDate(tsomeNeneweMonth, mebajaHamer, 41);
    let hosaena = addDaysToDate(tsomeNeneweMonth, mebajaHamer, 62);
    let siklet = addDaysToDate(tsomeNeneweMonth, mebajaHamer, 67);
    let tinsae = addDaysToDate(tsomeNeneweMonth, mebajaHamer, 69);
    let rikbekahinat = addDaysToDate(tsomeNeneweMonth, mebajaHamer, 93);
    let erget = addDaysToDate(tsomeNeneweMonth, mebajaHamer, 108);
     let menfeskidus= addDaysToDate(tsomeNeneweMonth, mebajaHamer, 118);
    let  tsomedihnet= addDaysToDate(tsomeNeneweMonth, mebajaHamer, 121);
     let tsomehawariat= addDaysToDate(tsomeNeneweMonth, mebajaHamer, 119);

    setResults({
      WengelawiResult,
      newYearResult,
      Wenber,
      Abekte,
      Metk,
      mebajaHamer,
      tsomeNeneweMonth,
      tsomeNeneweDay: mebajaHamer,
      abiyTsome,
      debreZeyt,
      hosaena,
      siklet,
      tinsae,
      rikbekahinat,
      erget,
      menfeskidus,
      tsomedihnet,
      tsomehawariat,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Background Image */}
      <Image
        source={require('D:/bahirehasab/assets/images/R.jpg')}
        style={{ width: '100%', height: '100%', position: 'absolute', opacity: 0.5 }}
      />

      {!showForm ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
         <TouchableOpacity onPress={() => setShowForm(true)} style={{ padding: 20, backgroundColor: "#007bff", borderRadius: 10, alignSelf: 'center', marginTop: 50 }}>
          <Text style={{ color: "white", fontSize: 20 }}>የበዓላት እና አጽዋማት ማውጫ</Text>
        </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={{ padding: 20 }}>
          <Text style={{ fontSize: 30, fontWeight: "bold", textAlign: "center", marginBottom: 20,color: "blue", }}>ባህረ ሐሳብ</Text>
          <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}>
            <TextInput
              style={{fontSize: 20, borderWidth: 3, padding: 10, marginRight: 10, flex: 1, borderRadius:5, backgroundColor: "white", borderColor:"white" }}
              keyboardType="numeric"
              value={ethiopianYear.toString()}
              onChangeText={(text) => setEthiopianYear(parseInt(text) || 0)}
            />
            <TouchableOpacity onPress={() => calculateBahireHasab(ethiopianYear)}>
              <Ionicons name="arrow-forward" size={30} />
            </TouchableOpacity>
          </View>
          {results && (
         <View
         style={{
           marginTop: 20,
           flexDirection: "row",
           flexWrap: "wrap",
           justifyContent: "space-between",
         }}
       >
         {Object.keys(results).map((key) => (
           <View
             key={key}
             style={{
               marginVertical: 10,
               width: "48%",
             }}
           >
             <View
               style={{
                 flexDirection: "row", 
                 justifyContent: "space-between", 
                 padding: 10,
                 borderRadius: 10,
                 backgroundColor: "white",
                 width: "100%",
               }}
             >
               <Text style={{ fontWeight: "bold", marginRight: 5 }}>
                 {key === "WengelawiResult"
                   ? "ወንጌላዊ"
                   : key === "newYearResult"
                   ? "አዲስ አመት"
                   : key === "Wenber"
                   ? "ወንበር"
                   : key === "Abekte"
                   ? "አበቅቴ"
                   : key === "Metk"
                   ? "መጥቅ"
                   : key === "mebajaHamer"
                   ? "መባጃ ሐመር"
                   : key === "tsomeNeneweMonth"
                   ? "ጾመ ነነዌ"
                   : key === "tsomeNeneweDay"
                   ? "ጾመ ነነዌ ቀን"
                   : key === "abiyTsome"
                   ? "ዐቢይ ጾም"
                   : key === "debreZeyt"
                   ? "ደብረ ዘይት"
                   : key === "hosaena"
                   ? "ሆሳህና"
                   : key === "siklet"
                   ? "ስቅለት"
                   : key === "tinsae"
                   ? "ትንሳኤ"
                   : key === "rikbekahinat"
                   ? "ርክበ ካህናት"
                   : key === "erget"
                   ? "እርገት"
                   : key==="menfeskidus"
                   ?"ጰራቅሊጦስ"
                   : key==="tsomedihnet"
                   ?"ጾመ ድኅነት"
                   : key==="tsomehawariat"
                   ?" ጾመ ሐዋርያት"
                   : key}
               </Text>
               <Text>{results[key as keyof BahireHasabResults]}</Text> 
 
             </View>
           </View>
         ))}
       </View>
       
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default BahireHasabCalculator;
