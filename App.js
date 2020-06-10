import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {useFonts} from '@use-expo/font'
import {AppLoading} from 'expo'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import ChapterList from './screens/ChapterList'
import ContentSlides from './screens/ContentSlides'
import Completed from './screens/Completed'
import colors from './constants/colors'

const Stack = createStackNavigator()

export default () => {
  let [fontsLoaded] = useFonts({
    'Montserrat-Black': require('./assets/fonts/Montserrat-Black.ttf'),
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
  })

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Daftar Materi" 
          style={styles.container}
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.primary
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontFamily: 'Montserrat-Black'            
            }
          }}
        >
          <Stack.Screen 
            name="Daftar Materi" 
            component={ChapterList} 
            options={{title: 'BLAJAR'}}
          />
          <Stack.Screen 
            name="Materi" 
            component={ContentSlides}
            options={({route}) => ({title: route.params.title})}
          />
          <Stack.Screen 
            name="Selesai" 
            component={Completed}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({

});
