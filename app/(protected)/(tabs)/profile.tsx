import PostListItem from '@/components/PostListItem';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Profile() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={styles.avatar}
          />
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.username}>@johndoe</Text>
          <Text style={styles.bio}>Just a simple Facebook clone bio ✌️</Text>
        </View>

        {/* User Posts */}
        <View style={styles.postsSection}>
          <PostListItem
            post={{
              id: '1',
              createdAt: '2025-08-04',
              content: 'Hello world! This is my first post!',
              userId: '1',
              user: {
                id: '1',
                username: 'johndoe',
                name: 'John Doe',
                image: undefined,
                bio: undefined,
              },
              parentId: undefined,
              parent: undefined,
              replies: undefined,
            }}
          />
          {/* Add more PostListItem components here as needed */}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 14,
    color: '#555',
  },
  bio: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  postsSection: {
    gap: 16,
  },
});
