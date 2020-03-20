import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View,
   AppRegistry,
   ScrollView,
   Animated,
   Dimensions } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      markers: [],
    };
  }

  fetchMarkerData() {
    fetch('http://mapa.sattlink.com/api')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ 
          isLoading: false,
          markers: responseJson, 
        });
        console.log(responseJson);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentDidMount() {
    this.fetchMarkerData();
}


  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.mapStyle}  
        initialRegion={{
          latitude: 18.0478381,
      longitude: -96.1628699,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
        }}>

{this.state.isLoading ? null : this.state.markers.map((marker, index) => {
     const coords = {
         latitude: marker.lat,
         longitude: marker.long,
     };

     const metadata = `Confirmados: ${marker.confirmados}
     -Negativos: ${marker.negativos}
     -Recuperados: ${marker.recuperados}`;
    
     return (
         <MapView.Marker
            key={index}
            coordinate={coords}
            title={marker.region}
            //description={metadata}
         >
          
         </MapView.Marker>
         
       

     );
  })}
    </MapView>



        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

/**
 *  Keystore password: 25a78909d91d43689e1b931f29b89220
  Key alias:         QGxybWFsZG8vTWFwc0Nvcm8=
  Key password:      7b1d9fc0c21d4b49b6cd1b4a3c5b5a37
 */