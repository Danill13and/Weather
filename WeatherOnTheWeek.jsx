import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { useState, useEffect } from 'react';
import Geolocation from 'react-native-geolocation-service';

export default function ForecastCard({date, temperature, description}){

  return(
          <View style={styles.info}>
              <Text style = {styles.text}>{date}</Text>
              <Text style = {styles.tempText}>{temperature}°C</Text>
              <Text style = {styles.text}>{description}</Text>
          </View>
  )
}

const styles = StyleSheet.create({
  info:{
    backgroundColor: "#47505C66",
    justifyContent: "center",
    gap: 30,
    alignItems: 'center',
    flexDirection: 'row',
    height:70,
    width:"90%",
    borderRadius:15,
    
//rgba(255, 255, 255, 0.2) background: #47505C66;

  },
  text : {
    fontSize : 20,
    fontFamily: 'monospace',

  },
  tempText : {
    fontSize : 40,
    fontFamily: 'monospace',
  }
})