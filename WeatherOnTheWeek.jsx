import React from 'react';
import { View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import Geolocation from 'react-native-geolocation-service';
const MyComponent = () => {
    const [weatherOnTheWeek, setDate] = useState()
    const [lat, setLat] = useState(0)
    const [lon, setLon] = useState(0)
    useEffect(() => {
      Geolocation.getCurrentPosition(position => {
        setLat(position.coords.latitude)
        setLon(position.coords.longitude)
        getWeather()
      })
    })
    function getWeatherOnTheWeek(){
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=b7648cffb53da7285a5480a9dee87a98`,{
          method: 'POST'
        })
      .then(response => response.json())
      .then(data => {
        setDate(data)
        console.log(data)
      })
     .catch(error => {
        console.error(error);
      });
    }
    getWeatherOnTheWeek() 
    // Render the list of items using a for loop directly in the return statement
    return (
      <View>
        {
          // Using JavaScript curly braces to embed a for loop within JSX
          weatherOnTheWeek.list.map((item, index) => {
            if (index % 8 === 0) {
              const dateof = new Date(item.dt_txt);
              const nameofdate = dateof.toLocaleDateString("en-EN", { weekday: 'long' }); 
              return (
                <View key={index}>
                  <Text>Date: {nameofdate}</Text>
                  <Text>Temperature: {item.main.temp - 273}</Text>
                  <Text>Description: {item.weather[0].description}</Text>
                </View>
                
              );
            }
          })
        }
      </View>
    );
}

export default MyComponent;