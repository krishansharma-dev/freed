

import { Link } from 'expo-router'
import { Text, View } from 'react-native'

export default function Page() {
 
  return (
    <View>
      <Link href="/welcome">hello</Link>

      <Text>Hello</Text>
    </View>
  )
}