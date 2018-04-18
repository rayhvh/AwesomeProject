import React from 'react';
import{
    AppRegistry,
    View,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';

import MapView from 'react-native-maps'

const {width,height} = Dimensions.get('window')

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height

const LATTITUDE_DELTA = 0.0922
const LONGTITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO

export default class Hello extends React.Component {

    constructor(props){
        super(props)
        
        this.state = {
            initialPosition: {
                latitude : 51.9775,
                longitude : 4.13333,
                latitudeDelta : 1.1,
                longitudeDelta : 1.1,
            },
            markerPosition: {
                latitude : 51.9775,
                longitude : 4.13333
            }
        }
    }


    componentDidMount(){
        navigator.geolocation.getCurrentPosition((position) => {
            var lat = parseFloat(position.coords.latitude)
            var long = parseFloat(position.coords.longitude)
            
            var initialRegion = {
                latitude: lat,
                longitude: long,
                latitudeDelta: LATTITUDE_DELTA,
                longitudeDelta: LONGTITUDE_DELTA
            }

            this.setState({initialPosition: initialRegion})
            this.setState({markerPosition: initialRegion})
        },(error) => alert(JSON.stringify(error)), {enableHighAccuracy: true, timeout: 20000, maximumAge: 2500})

        this.watchID = navigator.geolocation.watchPosition((position) => {
            var lat = parseFloat(position.coords.latitude)
            var long = parseFloat(position.coords.longitude)

            var lastRegion = {
                latitude: lat,
                longitude: long,
                longitudeDelta: LONGTITUDE_DELTA,
                latitudeDelta: LATTITUDE_DELTA
            }

            this.setState({initialPosition: lastRegion})
            this.setState({markerPosition: lastRegion})
        },(error) => alert(JSON.stringify(error)), {enableHighAccuracy: true})
    }

    compomentWillUnmount(){
        navigator.geolocation.clearWatch(this.watchID)
    }

    render(){
        return(
            <View style={styles.container}>
                
                <MapView 
                style={styles.map}
                region={this.state.initialPosition}
                >
                    <MapView.Marker
                    coordinate={this.state.markerPosition}>
                        <View style={styles.radius}>
                            <View style={styles.marker}/>
                        </View>
                    </MapView.Marker>
                </MapView>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    radius: {
        height:50,
        width: 50,
        borderRadius: 50/2,
        overflow: 'hidden',
        backgroundColor: 'rgba(0,122,255,0.1)',
        borderWidth: 1,
        borderColor:'rgba(0,122,255,0.3)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    marker:{
        height:20,
        width: 20,
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 20/2,
        overflow: 'hidden',
        backgroundColor: '#007AFF'
    },
    container: {
        flex:1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        left:0,
        right:0,
        top:0,
        bottom:0,
        position:'absolute',
    }
})