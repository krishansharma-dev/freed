import PostListItem from '@/components/PostListItem'
import { View } from 'react-native'

export default function Profile() {
  return (
    <View>
    <PostListItem post={{
        id: '',
        createdAt: '',
        content: '',
        userId: '',
        user: {
          id: '',
          username: '',
          name: '',
          image: undefined,
          bio: undefined
        },
        parentId: undefined,
        parent: undefined,
        replies: undefined
      }} />
    </View>
  )
}