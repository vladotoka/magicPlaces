# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.1.46]-beta/not builded (last update 2023-06-22)

### Other Fixes
* SQLite DB schema- version 2: new column dateOfCreation and new table schema-version

### Packages Updates
*    "react-native": "0.71.8",

### Known Issues 
* bad logic for api calls- astro and bgcalendar
* select location option start from map centered in Burgas
* 'createStore' is deprecated. Redux team recommend using the configureStore method of the @reduxjs/toolkit package, which replaces createStore


# [1.1.45] (2023-03-21)

### Packages Updates
*   "expo": "^48.0.7",
*   "expo-application": "~5.1.1",
*   "expo-clipboard": "~4.1.2",
*   "expo-constants": "~14.2.1",
*   "expo-file-system": "~15.2.2",
*   "expo-image-manipulator": "~11.1.1",
*   "expo-image-picker": "~14.1.1",
*   "expo-location": "~15.1.1",
*   "expo-sqlite": "~11.1.1",
*   "expo-status-bar": "~1.4.4",
*   "react": "18.2.0",
*   "react-dom": "18.2.0",
*   "react-native": "0.71.4"
*   "react-native-gesture-handler": "~2.9.0",
*   "react-native-safe-area-context": "4.5.0",
*   "react-native-screens": "~3.20.0",

### Known Issues 
* bad logic for api calls- astro and bgcalendar
* select location option start from map centered in Burgas

# [1.1.43] (2022-12-08)

### Other Fixes
* removed dummy fixing bug in EXPO SDK46
    - in ImagePicker.js
        - removed middleware hack with ImageManipulator.manipulateAsync
* fixed app crash during rendering the map view
    - in MapScreen.js
        - added PROVIDER_GOOGLE
    - in  app.json
        - added  apiKey

### Deprecated Fixes
* replaced deprecated uri key in the image picker result with uri key in the new "asserts" array
    -in ImagePicker.js

# [1.1.42] (2022-11-22)

### Deprecated Fixes
* in  PlaceDetailScreen.js @const coordsToClipboard
Clipboard.setString() --> Clipboard.setStringAsync()

### Bug Fixes

* in  PlacesListScreen.js @ useLayoutEffect
[props.navigaton] -> [props.navigation]


### Packages Updates
* expo-image-picker@~14.0.2
* @react-navigation/native: ^6.0.14
* @react-navigation/stack: ^6.3.5

### Known Issues 
