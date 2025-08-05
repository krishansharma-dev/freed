import { Post } from "@/types";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
dayjs.extend(relativeTime);

export default function PostListItem({ post }: { post: Post }) {
  return (
    <View className="flex-row items-start gap-3 p-4 border-b border-gray-700/50 bg-black">
      {/* Avatar */}
      <Image
        source={{ uri: post.user?.image || 'https://ui-avatars.com/api/?name=User' }}
        className="w-12 h-12 rounded-full bg-gray-800"
        resizeMode="cover"
      />
      {/* Main content */}


      
      <View className="flex-1">
        <View className="flex-row items-center gap-2">
          <Text className="text-white font-bold text-base">{post.user?.name || 'User'}</Text>
          <Text className="text-gray-500 text-xs">
            {dayjs(post.createdAt).fromNow()}
          </Text>
        </View>
        <Text className="text-white mt-1 text-base leading-relaxed">{post.content}</Text>
        {/* Actions */}
        <View className="flex-row mt-3 pr-8 gap-6">
          <TouchableOpacity className="flex-row items-center gap-1">
            <MaterialCommunityIcons name="message-outline" size={20} color="#d1d5db" />
            <Text className="text-gray-400 text-xs">{post.replies?.length || 0}</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center gap-1">
            <MaterialCommunityIcons name="repeat-variant" size={20} color="#d1d5db" />
            <Text className="text-gray-400 text-xs">0</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center gap-1">
            <MaterialCommunityIcons name="heart-outline" size={20} color="#d1d5db" />
            <Text className="text-gray-400 text-xs">0</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center gap-1">
            <MaterialCommunityIcons name="share-variant" size={20} color="#d1d5db" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}