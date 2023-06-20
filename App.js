// import React, { useState, useEffect } from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   Button,
//   PermissionsAndroid,
// } from "react-native";
// import * as Location from "expo-location";
// import MapView, { Marker, Circle } from "react-native-maps";

// const App = () => {
//   const [location, setLocation] = useState(null);

//   useEffect(() => {
//     requestLocationPermission();
//   }, []);

//   const requestLocationPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         {
//           title: "Location Permission",
//           message: "This app needs access to your location.",
//           buttonPositive: "OK",
//         }
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         getCurrentLocation();
//       } else {
//         console.log("Location permission denied");
//       }
//     } catch (error) {
//       console.log("Error requesting location permission", error);
//     }
//   };

//   const getCurrentLocation = async () => {
//     try {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status === "granted") {
//         const currentPosition = await Location.getCurrentPositionAsync({
//           accuracy: Location.Accuracy.High,
//         });
//         setLocation(currentPosition);
//       } else {
//         console.log("Permission denied");
//       }
//     } catch (error) {
//       console.log("Error getting location", error);
//     }
//   };

//   // const checkGeofence = () => {
//   //   if (
//   //     location &&
//   //     location.coords &&
//   //     isWithinGeofence(location.coords.latitude, location.coords.longitude)
//   //   ) {
//   //     console.log("Within geofence");
//   //   } else {
//   //     console.log("Outside geofence");
//   //   }
//   // };

//   const onMapLayout = () => {
//     setMapLayout(true);
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Welcome!</Text>
//       {location && (
//         <View style={styles.mapContainer}>
//           <MapView
//             style={mapLayout ? styles.map : { flex: 1 }} // Use flex: 1 when mapLayout is false
//             onLayout={onMapLayout} // Call onMapLayout when the layout occurs
//             initialRegion={{
//               latitude: location.coords.latitude,
//               longitude: location.coords.longitude,
//               latitudeDelta: 0.02,
//               longitudeDelta: 0.02,
//             }}
//           >
//             <Marker
//               coordinate={{
//                 latitude: location.coords.latitude,
//                 longitude: location.coords.longitude,
//               }}
//             />
//             <Circle
//               center={{
//                 latitude: location.coords.latitude,
//                 longitude: location.coords.longitude,
//               }}
//               radius={1000} // Specify the radius of the circle in meters
//               fillColor="rgba(0, 128, 255, 0.2)" // Customize the circle's background color
//               strokeColor="rgba(0, 128, 255, 0.5)" // Customize the circle's border color
//             />
//           </MapView>
//         </View>
//       )}
//       <View style={styles.buttonContainer}>
//         <Button title="Get Location" onPress={getCurrentLocation} />
//       </View>
//       {location && (
//         <View style={styles.locationContainer}>
//           <Text>Latitude: {location.coords.latitude}</Text>
//           <Text>Longitude: {location.coords.longitude}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   buttonContainer: {
//     marginTop: 10,
//     padding: 10,
//     borderRadius: 10,
//     width: "40%",
//   },
//   mapContainer: {
//     flex: 0.5,
//     width: "100%",
//     height: "100%",
//   },
//   locationContainer: {
//     marginTop: 20,
//     alignItems: "center",
//   },
// });

// export default App;

// import React, { useState, useEffect } from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   Button,
//   PermissionsAndroid,
// } from "react-native";
// import Geolocation from "react-native-geolocation-service";

// const App = () => {
//   const [location, setLocation] = useState(null);

//   useEffect(() => {
//     requestLocationPermission();
//   }, []);

//   const requestLocationPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         {
//           title: "Location Permission",
//           message: "This app needs access to your location.",
//           buttonPositive: "OK",
//         }
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         getCurrentLocation();
//       } else {
//         console.log("Location permission denied");
//       }
//     } catch (error) {
//       console.log("Error requesting location permission", error);
//     }
//   };

//   const getCurrentLocation = () => {
//     Geolocation.getCurrentPosition(
//       (position) => {
//         setLocation(position);
//       },
//       (error) => {
//         console.log("Error getting location", error);
//       },
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//     );
//   };

//   const checkGeofence = () => {
//     if (
//       location &&
//       location.coords &&
//       isWithinGeofence(location.coords.latitude, location.coords.longitude)
//     ) {
//       console.log("Within geofence");
//     } else {
//       console.log("Outside geofence");
//     }
//   };

//   const isWithinGeofence = (latitude, longitude) => {
//     // Replace with your geofence coordinates
//     const geofenceLatitude = 40.7128; // Example: latitude of New York City
//     const geofenceLongitude = -74.006; // Example: longitude of New York City
//     const geofenceRadius = 100; // 100 meters

//     // Calculate the distance between the current location and the geofence center
//     const distance = calculateDistance(
//       latitude,
//       longitude,
//       geofenceLatitude,
//       geofenceLongitude
//     );

//     return distance <= geofenceRadius;
//   };

//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371e3; // Earth's radius in meters
//     const φ1 = (lat1 * Math.PI) / 180;
//     const φ2 = (lat2 * Math.PI) / 180;
//     const Δφ = ((lat2 - lat1) * Math.PI) / 180;
//     const Δλ = ((lon2 - lon1) * Math.PI) / 180;

//     const a =
//       Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
//       Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//     const distance = R * c;
//     return distance;
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Welcome!</Text>
//       <View style={styles.buttonContainer}>
//         <Button title="Get Location" onPress={getCurrentLocation} />
//       </View>
//       {location && (
//         <View style={styles.locationContainer}>
//           <Text>Latitude: {location.coords.latitude}</Text>
//           <Text>Longitude: {location.coords.longitude}</Text>
//         </View>
//       )}
//       <View style={styles.buttonContainer}>
//         <Button
//           title="Check Geofence"
//           onPress={checkGeofence}
//           disabled={!location}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   buttonContainer: {
//     marginTop: 10,
//     padding: 10,
//     borderRadius: 10,
//     width: "40%",
//   },
//   locationContainer: {
//     marginTop: 20,
//     alignItems: "center",
//   },
// });

// export default App;

// import React, { useState, useEffect } from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   Button,
//   PermissionsAndroid,
//   Dimensions,
//   TextInput,
// } from "react-native";
// import * as Location from "expo-location";
// import MapView, { Marker, Circle } from "react-native-maps";

// const App = () => {
//   const [location, setLocation] = useState(null);
//   const [latitude, setLatitude] = useState("");
//   const [longitude, setLongitude] = useState("");
//   const [geofenceCoordinates, setGeofenceCoordinates] = useState([]);

//   useEffect(() => {
//     requestLocationPermission();
//   }, []);

//   const requestLocationPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         {
//           title: "Geolocation Permission",
//           message: "Can we access your location?",
//           buttonNeutral: "Ask Me Later",
//           buttonNegative: "Cancel",
//           buttonPositive: "OK",
//         }
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         getCurrentLocation();
//       } else {
//         console.log("Location permission denied");
//       }
//     } catch (error) {
//       console.log("Error requesting location permission", error);
//     }
//   };

//   const getCurrentLocation = async () => {
//     try {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status === "granted") {
//         const currentPosition = await Location.getCurrentPositionAsync({
//           accuracy: Location.Accuracy.High,
//         });
//         setLocation(currentPosition);
//       } else {
//         console.log("Permission denied");
//       }
//     } catch (error) {
//       console.log("Error getting location", error);
//     }
//   };

//   const handleSetLocation = () => {
//     if (latitude !== "" && longitude !== "") {
//       const coordinates = [
//         { latitude: parseFloat(latitude), longitude: parseFloat(longitude) },
//       ];
//       setGeofenceCoordinates(coordinates);
//       setLocation({
//         coords: {
//           latitude: parseFloat(latitude),
//           longitude: parseFloat(longitude),
//         },
//       });
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {location && (
//         <View style={styles.mapContainer}>
//           <MapView
//             style={[styles.map]}
//             initialRegion={{
//               latitude: location.coords.latitude,
//               longitude: location.coords.longitude,
//               latitudeDelta: 0.02,
//               longitudeDelta: 0.02,
//             }}
//           >
//             <Marker
//               coordinate={{
//                 latitude: location.coords.latitude,
//                 longitude: location.coords.longitude,
//               }}
//             />
//             <Circle
//               center={{
//                 latitude: location.coords.latitude,
//                 longitude: location.coords.longitude,
//               }}
//               radius={0} // Specify the radius of the circle in meters
//               fillColor="rgba(0, 128, 255, 0.2)" // Customize the circle's background color
//               strokeColor="rgba(0, 128, 255, 0.5)" // Customize the circle's border color
//             />
//           </MapView>
//         </View>
//       )}
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Latitude"
//           value={latitude}
//           onChangeText={(text) => setLatitude(text)}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Longitude"
//           value={longitude}
//           onChangeText={(text) => setLongitude(text)}
//         />
//         <Button title="Set Location" onPress={handleSetLocation} />
//       </View>
//       <View style={styles.buttonContainer}>
//         <Button title="Get Location" onPress={getCurrentLocation} />
//       </View>
//       {location && (
//         <View style={styles.locationContainer}>
//           <Text>Latitude: {location.coords.latitude}</Text>
//           <Text>Longitude: {location.coords.longitude}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const windowWidth = Dimensions.get("window").width;
// const windowHeight = Dimensions.get("window").height;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   mapContainer: {
//     width: windowWidth,
//     height: windowHeight * 0.6,
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   buttonContainer: {
//     marginTop: 20,
//     borderRadius: 10,
//     marginBottom: 10,
//     width: windowWidth * 0.4,
//   },
//   inputContainer: {
//     marginTop: 10,
//     marginBottom: 10,
//     width: windowWidth * 0.8,
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   input: {
//     height: 40,
//     borderColor: "gray",
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
//   inputLeft: {
//     marginRight: 5,
//   },
//   inputRight: {
//     marginLeft: 5,
//   },
//   locationContainer: {
//     alignItems: "center",
//   },
// });

// export default App;

// import React, { useState, useEffect } from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   Button,
//   PermissionsAndroid,
//   Dimensions,
//   TextInput,
// } from "react-native";
// import * as Location from "expo-location";
// import MapView, { Marker, Circle } from "react-native-maps";

// const App = () => {
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [specifiedLocation, setSpecifiedLocation] = useState(null);
//   const [latitude, setLatitude] = useState("");
//   const [longitude, setLongitude] = useState("");

//   useEffect(() => {
//     requestLocationPermission();
//   }, []);

//   const requestLocationPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         {
//           title: "Geolocation Permission",
//           message: "Can we access your location?",
//           buttonNeutral: "Ask Me Later",
//           buttonNegative: "Cancel",
//           buttonPositive: "OK",
//         }
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         getCurrentLocation();
//       } else {
//         console.log("Location permission denied");
//       }
//     } catch (error) {
//       console.log("Error requesting location permission", error);
//     }
//   };

//   const getCurrentLocation = async () => {
//     try {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status === "granted") {
//         const currentPosition = await Location.getCurrentPositionAsync({
//           accuracy: Location.Accuracy.High,
//         });
//         setCurrentLocation(currentPosition);
//       } else {
//         console.log("Permission denied");
//       }
//     } catch (error) {
//       console.log("Error getting location", error);
//     }
//   };

//   const handleSetLocation = () => {
//     if (latitude !== "" && longitude !== "") {
//       setSpecifiedLocation({
//         latitude: parseFloat(latitude),
//         longitude: parseFloat(longitude),
//       });
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {currentLocation && (
//         <View style={styles.mapContainer}>
//           <MapView
//             style={[styles.map]}
//             region={{
//               latitude: currentLocation.coords.latitude,
//               longitude: currentLocation.coords.longitude,
//               latitudeDelta: 0.02,
//               longitudeDelta: 0.02,
//             }}
//           >
//             <Marker
//               coordinate={{
//                 latitude: currentLocation.coords.latitude,
//                 longitude: currentLocation.coords.longitude,
//               }}
//             />
//             {specifiedLocation && (
//               <Circle
//                 center={specifiedLocation}
//                 radius={100} // Specify the radius of the circle in meters
//                 fillColor="rgba(255, 0, 0, 0.2)" // Customize the circle's background color
//                 strokeColor="red" // Customize the circle's border color
//               />
//             )}
//           </MapView>
//         </View>
//       )}
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Latitude"
//           value={latitude}
//           onChangeText={(text) => setLatitude(text)}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Longitude"
//           value={longitude}
//           onChangeText={(text) => setLongitude(text)}
//         />
//         <Button title="Set Location" onPress={handleSetLocation} />
//       </View>
//       <View style={styles.buttonContainer}>
//         <Button title="Get Location" onPress={getCurrentLocation} />
//       </View>
//       {currentLocation && (
//         <View style={styles.locationContainer}>
//           <Text>Current Latitude: {currentLocation.coords.latitude}</Text>
//           <Text>Current Longitude: {currentLocation.coords.longitude}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const windowWidth = Dimensions.get("window").width;
// const windowHeight = Dimensions.get("window").height;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   mapContainer: {
//     width: windowWidth,
//     height: windowHeight * 0.6,
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   buttonContainer: {
//     marginTop: 20,
//     borderRadius: 10,
//     marginBottom: 10,
//     width: windowWidth * 0.4,
//   },
//   inputContainer: {
//     marginTop: 10,
//     marginBottom: 10,
//     width: windowWidth * 0.8,
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   input: {
//     height: 40,
//     borderColor: "gray",
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
//   inputLeft: {
//     marginRight: 5,
//   },
//   inputRight: {
//     marginLeft: 5,
//   },
//   locationContainer: {
//     alignItems: "center",
//   },
// });

// export default App;

// import React, { useState, useEffect } from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   Button,
//   PermissionsAndroid,
//   Dimensions,
//   TextInput,
// } from "react-native";
// import * as Location from "expo-location";
// import MapView, { Marker, Circle } from "react-native-maps";

// const App = () => {
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [specifiedLocation, setSpecifiedLocation] = useState({
//     latitude: null,
//     longitude: null,
//   });
//   const [isInGeofence, setIsInGeofence] = useState(false);
//   const [latitude, setLatitude] = useState("");
//   const [longitude, setLongitude] = useState("");

//   useEffect(() => {
//     requestLocationPermission();
//     updateCurrentLocation();
//     const interval = setInterval(() => {
//       updateCurrentLocation();
//     }, 60000); // Update every minute

//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   useEffect(() => {
//     requestLocationPermission();
//   }, []);

//   const requestLocationPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         {
//           title: "Geolocation Permission",
//           message: "Can we access your location?",
//           buttonNeutral: "Ask Me Later",
//           buttonNegative: "Cancel",
//           buttonPositive: "OK",
//         }
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         getCurrentLocation();
//       } else {
//         console.log("Location permission denied");
//       }
//     } catch (error) {
//       console.log("Error requesting location permission", error);
//     }
//   };

//   const getCurrentLocation = async () => {
//     try {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status === "granted") {
//         const currentPosition = await Location.getCurrentPositionAsync({
//           accuracy: Location.Accuracy.High,
//         });
//         setCurrentLocation(currentPosition);
//       } else {
//         console.log("Permission denied");
//       }
//     } catch (error) {
//       console.log("Error getting location", error);
//     }
//   };

//   const handleSetLocation = () => {
//     if (latitude !== "" && longitude !== "") {
//       setSpecifiedLocation({
//         latitude: parseFloat(latitude),
//         longitude: parseFloat(longitude),
//       });
//     }
//   };

//   const checkGeofence = () => {
//     if (
//       currentLocation &&
//       specifiedLocation.latitude !== null &&
//       specifiedLocation.longitude !== null
//     ) {
//       const distance = getDistance(
//         currentLocation.coords.latitude,
//         currentLocation.coords.longitude,
//         specifiedLocation.latitude,
//         specifiedLocation.longitude,
//         "m"
//       );
//       setIsInGeofence(distance <= 100);
//     }
//   };

//   const getDistance = (lat1, lon1, lat2, lon2, unit) => {
//     const radlat1 = (Math.PI * lat1) / 180;
//     const radlat2 = (Math.PI * lat2) / 180;
//     const radlon1 = (Math.PI * lon1) / 180;
//     const radlon2 = (Math.PI * lon2) / 180;
//     const theta = lon1 - lon2;
//     const radtheta = (Math.PI * theta) / 180;
//     let dist =
//       Math.sin(radlat1) * Math.sin(radlat2) +
//       Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
//     dist = Math.acos(dist);
//     dist = (dist * 180) / Math.PI;
//     dist = dist * 60 * 1.1515;
//     if (unit === "m") {
//       dist *= 1609.344; // Convert miles to meters
//     }
//     return dist;
//   };

//   return (
//     <View style={styles.container}>
//       {currentLocation && (
//         <View style={styles.mapContainer}>
//           <MapView
//             style={styles.map}
//             initialRegion={{
//               latitude: currentLocation.coords.latitude,
//               longitude: currentLocation.coords.longitude,
//               latitudeDelta: 0.02,
//               longitudeDelta: 0.02,
//             }}
//           >
//             <Marker
//               coordinate={{
//                 latitude: currentLocation.coords.latitude,
//                 longitude: currentLocation.coords.longitude,
//               }}
//             />
//             {specifiedLocation.latitude !== null &&
//               specifiedLocation.longitude !== null && (
//                 <Circle
//                   center={specifiedLocation}
//                   radius={100} // Specify the radius of the circle in meters
//                   fillColor={
//                     isInGeofence
//                       ? "rgba(0, 128, 0, 0.2)"
//                       : "rgba(255, 0, 0, 0.2)"
//                   } // Customize the circle's background color
//                   strokeColor={
//                     isInGeofence
//                       ? "rgba(0, 128, 0, 0.5)"
//                       : "rgba(255, 0, 0, 0.5)"
//                   } // Customize the circle's border color
//                 />
//               )}
//           </MapView>
//           {specifiedLocation.latitude !== null &&
//             specifiedLocation.longitude !== null && (
//               <View style={styles.geofenceStatusContainer}>
//                 <Text>
//                   Geofence Status:{" "}
//                   {isInGeofence ? "Inside Geofence" : "Outside Geofence"}
//                 </Text>
//               </View>
//             )}
//         </View>
//       )}
//       <View style={styles.inputContainer}>
//         <View style={styles.row}>
//           <TextInput
//             style={[styles.input, styles.inputLeft]}
//             placeholder="Latitude"
//             value={latitude}
//             onChangeText={(text) => setLatitude(text)}
//           />
//           <TextInput
//             style={[styles.input, styles.inputRight]}
//             placeholder="Longitude"
//             value={longitude}
//             onChangeText={(text) => setLongitude(text)}
//           />
//         </View>
//         <Button title="Set Location" onPress={handleSetLocation} />
//       </View>
//       <View style={styles.buttonContainer}>
//         <Button title="Get Location" onPress={getCurrentLocation} />
//         <Button title="Check Geofence" onPress={checkGeofence} />
//       </View>
//       {currentLocation && (
//         <View style={styles.locationContainer}>
//           <Text>Latitude: {currentLocation.coords.latitude}</Text>
//           <Text>Longitude: {currentLocation.coords.longitude}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const windowWidth = Dimensions.get("window").width;
// const windowHeight = Dimensions.get("window").height;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   mapContainer: {
//     width: windowWidth,
//     height: windowHeight * 0.6,
//     position: "relative",
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   buttonContainer: {
//     marginTop: 20,
//     borderRadius: 10,
//     marginBottom: 10,
//     width: windowWidth * 0.8,
//   },
//   inputContainer: {
//     marginTop: 10,
//     marginBottom: 10,
//     width: windowWidth * 0.8,
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   input: {
//     flex: 1,
//     height: 40,
//     borderColor: "gray",
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
//   inputLeft: {
//     marginRight: 5,
//   },
//   inputRight: {
//     marginLeft: 5,
//   },
//   locationContainer: {
//     alignItems: "center",
//   },
//   geofenceStatusContainer: {
//     position: "absolute",
//     bottom: 10,
//     left: 10,
//     backgroundColor: "#fff",
//     padding: 10,
//     borderRadius: 5,
//     elevation: 3,
//   },
// });

// export default App;

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  PermissionsAndroid,
  Dimensions,
  TextInput,
  ScrollView,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker, Circle } from "react-native-maps";

const App = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [specifiedLocation, setSpecifiedLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [isInGeofence, setIsInGeofence] = useState(false);

  useEffect(() => {
    requestLocationPermission();
    updateCurrentLocation();
    const intervalId = setInterval(updateCurrentLocation, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Geolocation Permission",
          message: "Can we access your location?",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      } else {
        console.log("Location permission denied");
      }
    } catch (error) {
      console.log("Error requesting location permission", error);
    }
  };

  const updateCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const currentPosition = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        setCurrentLocation(currentPosition);
        checkGeofence(currentPosition);
      } else {
        console.log("Permission denied");
      }
    } catch (error) {
      console.log("Error getting location", error);
    }
  };

  const handleSetLocation = () => {
    if (latitude !== "" && longitude !== "") {
      setSpecifiedLocation({
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      });
    }
  };

  const checkGeofence = (currentPosition) => {
    const distance = calculateDistance(
      currentPosition.coords.latitude,
      currentPosition.coords.longitude,
      specifiedLocation.latitude,
      specifiedLocation.longitude
    );
    setIsInGeofence(distance <= 100);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c * 1000; // Distance in meters
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  return (
    <View style={styles.container}>
      {currentLocation && (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            }}
          >
            <Marker
              coordinate={{
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
              }}
            />
            <Circle
              center={{
                latitude: specifiedLocation.latitude,
                longitude: specifiedLocation.longitude,
              }}
              radius={100}
              fillColor={
                isInGeofence ? "rgba(0, 255, 0, 0.3)" : "rgba(255, 0, 0, 0.3)"
              }
              strokeColor={
                isInGeofence ? "rgba(0, 255, 0, 0.5)" : "rgba(255, 0, 0, 0.5)"
              }
            />
          </MapView>
          <View style={styles.geofenceStatus}>
            <Text style={styles.geofenceStatusText}>
              {isInGeofence ? "Inside Geofence" : "Outside Geofence"}
            </Text>
          </View>
        </View>
      )}
      <ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Latitude"
            value={latitude}
            onChangeText={(text) => setLatitude(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Longitude"
            value={longitude}
            onChangeText={(text) => setLongitude(text)}
          />
          <Button title="Set Location" onPress={handleSetLocation} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Get Location" onPress={updateCurrentLocation} />
        </View>
        {currentLocation && (
          <View style={styles.locationContainer}>
            <Text>Latitude: {currentLocation.coords.latitude}</Text>
            <Text>Longitude: {currentLocation.coords.longitude}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapContainer: {
    width: windowWidth,
    height: windowHeight * 0.6,
    marginTop: 50,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 10,
    marginBottom: 10,
    width: windowWidth * 0.4,
    alignSelf: "center",
  },
  inputContainer: {
    marginTop: 20,
    marginBottom: 10,
    width: windowWidth * 0.8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  geofenceStatus: {
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  },
  geofenceStatusText: {
    fontWeight: "bold",
    color: "black",
  },
  locationContainer: {
    alignItems: "center",
  },
});

export default App;
