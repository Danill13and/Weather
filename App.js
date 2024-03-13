import { StyleSheet, Text, View, Image, Alert, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import Geolocation from 'react-native-geolocation-service';
export default function App() {
  const [temp, setTemp] = useState()
  const [weather, setWeather] = useState()
  const [locatin, setLocatin] = useState()
  const [nameOfDate1, setNameOfDate1] = useState('Day')
  const [nameOfDate2, setNameOfDate2] = useState('Day')
  const [nameOfDate3, setNameOfDate3] = useState('Day')
  const [nameOfDate4, setNameOfDate4] = useState('Day')
  const [nameOfDate5, setNameOfDate5] = useState('Day')
  const [temp1, setTemp1] = useState(0)
  const [temp2, setTemp2] = useState(0)
  const [temp3, setTemp3] = useState(0)
  const [temp4, setTemp4] = useState(0)
  const [temp5, setTemp5] = useState(0)
  const [description1, setDescription1] = useState('description')
  const [description2, setDescription2] = useState('description')
  const [description3, setDescription3] = useState('description')
  const [description4, setDescription4] = useState('description')
  const [description5, setDescription5] = useState('Day')
  const element = [1, 2, 3, 4, 5]
  const [image, setImage] = useState(' ')
  const image1 = 'none'
  // 16.345480404149257, 30.14450885903549
  function getWeather(){
    Geolocation.getCurrentPosition(position => {
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=2740da8393da7570ba7c3cd12a73248d`,{
      method: 'GET'
    })
  .then(response => response.json())
  .then(data => {
    setTemp(data.main.temp-273);
    setWeather(data.weather[0].main);
    setLocatin(data.name);
    if (data.weather[0].main == 'Clouds'){
      setImage('https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT5l-T7wvih_ZUbiG8w8-bDNCZ-fpu18-VgY-tjmiz0yIZDCz4v')
    }
    if (data.weather[0].main == 'Clear'){
      setImage('https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS4sEMNBwK0hsJkqR4Ot40iSdh9i6CFirc3QD0fuTRYC4T3m_6Q')
    }
    if (data.weather[0].main == 'Rain'){
      setImage('https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRlg3R71TEf0Nefg8-rokKSBubf3Uux_sQLQBqF_cAS1A_LSLN_')
    }
  })
 .catch(error => {
    console.error(error);
  });
    })
    
  }

  function getWeatherOnTheWeek(){
    Geolocation.getCurrentPosition(position => {
      fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=2740da8393da7570ba7c3cd12a73248d`,{
        method: 'GET'
      })
      .then(response => response.json())
      .then(data => {
        for (var i = 0; i < data.list.length; i+=8) {
          // console.log(data.list[i].dt_txt);
          // console.log(data.list[i].main.temp-273);
          // console.log(data.list[i].weather[0].description);
          var date1 = new Date(data.list[0].dt_txt);
          const nameofdate1 = date1.toLocaleDateString("en-EN", { weekday: 'long' })
          var date2 = new Date(data.list[8].dt_txt);
          const nameofdate2 = date2.toLocaleDateString("en-EN", { weekday: 'long' })
          var date3 = new Date(data.list[16].dt_txt);
          const nameofdate3 = date3.toLocaleDateString("en-EN", { weekday: 'long' })
          var date4 = new Date(data.list[24].dt_txt);
          const nameofdate4 = date4.toLocaleDateString("en-EN", { weekday: 'long' })
          var date5 = new Date(data.list[32].dt_txt);
          const nameofdate5 = date5.toLocaleDateString("en-EN", { weekday: 'long' })
          setNameOfDate1(nameofdate1)
          setNameOfDate2(nameofdate2)
          setNameOfDate3(nameofdate3)
          setNameOfDate4(nameofdate4)
          setNameOfDate5(nameofdate5)
          setDescription1(data.list[0].weather[0].main)
          setDescription2(data.list[8].weather[0].main)
          setDescription3(data.list[16].weather[0].main)
          setDescription4(data.list[24].weather[0].main)
          setDescription5(data.list[32].weather[0].main)
          setTemp1(Math.round(data.list[0].main.temp-273))
          setTemp2(Math.round(data.list[8].main.temp-273))
          setTemp3(Math.round(data.list[16].main.temp-273))
          setTemp4(Math.round(data.list[24].main.temp-273))
          setTemp5(Math.round(data.list[32].main.temp-273))
        }
      })
 .    catch(error => {
        console.error(error);
      });
    })
  }
  
  useEffect(() => {
    getWeather()
    getWeatherOnTheWeek()
  })

  return (
    <View style={styles.container}>
      <View style={styles.temp}>
        <Image style={styles.weatherImage} source={{uri: image}}/>
        <Text style={{fontSize:25}}>{locatin}</Text>
        <Text style={styles.tempText}> {Math.round(temp)}°C</Text>
      </View >
        <View style={styles.boardList}>
          {
            element.map((i)=>{
              return(<View style={styles.info}>
                <View style={styles.cell}>
                  <Text style={styles.text}>{eval(`nameOfDate${i}`)}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.tempText}>{eval(`temp${i}`)}°C</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={styles.text}>{eval(`description${i}`)}</Text>
                </View>
              </View>)
            })
          }
      </View>      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#ADA8E6" ,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
   },
   weatherImage: {
    width: 120,
    height: 120,
   },
  boardList:{
    justifyContent:"center",
    alignItems: 'center',
    gap:20,
    height:"65%",
    width:"90%",
    borderRadius:15, 
    backgroundColor: "#7B78A4",
    position:"absolute",
    bottom: 10,
  },
  info:{
    backgroundColor: "#47505C66",
    justifyContent: "center",
    gap: "10%",
    alignItems: 'center',
    flexDirection: 'row',
    height:70,
    width:"90%",
    borderRadius:15,
    
//rgba(255, 255, 255, 0.2) background: #47505C66;

  },
  temp:{
    top:20,
    height:"20%",
    width:"90%",
    borderRadius:15,
    justifyContent: 'center',
    alignItems: 'center',
    position:"absolute",
    bottom: 0,
    color:"white ",
    marginTop: 20,
  },
  image :{
    width: "20%",
    height: "100%",
  },
  text : {
    fontSize : 20,
    fontFamily: 'monospace',

  },
  tempText : {
    fontSize : 40,
    fontFamily: 'monospace',
  }
});