import PostListItem from '@/components/PostListItem';
import { dummyPosts } from '@/dummydata';
import { FlatList } from 'react-native';

export default function Page() {
  return (
    <FlatList
      data={dummyPosts}
      keyExtractor={(item) => item.id} // Added keyExtractor for unique keys
      renderItem={({ item }) => (
       <PostListItem post={item} />
      )}
    />
  );
}