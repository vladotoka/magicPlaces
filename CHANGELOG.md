# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
