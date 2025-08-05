import { NewsArticle, mockNewsData } from '@/data/mockNews';
import { Bell, BookOpen, Globe, Search, TrendingUp, Users, X } from 'lucide-react-native';
import React, { useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const tabs = [
  { id: 'myfeed', title: 'My Feed' },
  { id: 'allnews', title: 'All News' },
  { id: 'topstories', title: 'Top Stories' },
  { id: 'trending', title: 'Trending' },
];

const insightsData = [
  {
    id: '1',
    title: 'Climate Action Trends',
    summary: 'Global initiatives show 40% increase in renewable energy adoption',
    icon: 'globe',
    imageUrl: 'https://images.pexels.com/photos/2990650/pexels-photo-2990650.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '2',
    title: 'Tech Innovation Report',
    summary: 'AI breakthroughs reshape healthcare and education sectors',
    icon: 'trending',
    imageUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '3',
    title: 'Social Impact Analysis',
    summary: 'Community-driven projects create lasting change worldwide',
    icon: 'users',
    imageUrl: 'https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [activeTab, setActiveTab] = useState('myfeed');
  const [isSearching, setIsSearching] = useState(false);
  const insets = useSafeAreaInsets();
  const searchScale = useSharedValue(1);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setIsSearching(false);
    }, 500);

    if (searchQuery) {
      setIsSearching(true);
    }

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter articles based on search query and active tab
  const filteredArticles = useMemo(() => {
    let articles = mockNewsData;
    
    // Filter by tab
    if (activeTab === 'topstories') {
      articles = articles.filter(article => article.category === 'topstories');
    } else if (activeTab === 'trending') {
      articles = articles.filter(article => article.category === 'trending');
    } else if (activeTab === 'myfeed') {
      // Show personalized content (for demo, show top stories and trending)
      articles = articles.filter(article => 
        article.category === 'topstories' || article.category === 'trending'
      );
    }

    // Filter by search query
    if (debouncedQuery.trim()) {
      const query = debouncedQuery.toLowerCase();
      articles = articles.filter(
        article =>
          article.headline.toLowerCase().includes(query) ||
          article.description.toLowerCase().includes(query) ||
          article.source.toLowerCase().includes(query)
      );
    }

    return articles;
  }, [debouncedQuery, activeTab]);

  // Highlight matching keywords
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => {
      if (part.toLowerCase() === query.toLowerCase()) {
        return (
          <Text key={index} style={styles.highlightedText}>
            {part}
          </Text>
        );
      }
      return part;
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const handleSearchPress = () => {
    searchScale.value = withSpring(0.95, {}, () => {
      searchScale.value = withSpring(1);
    });
  };

  const clearSearch = () => {
    setSearchQuery('');
    setDebouncedQuery('');
    Keyboard.dismiss();
  };

  const searchBarAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: searchScale.value }],
  }));

  const renderInsightCard = ({ item, index }: { item: any; index: number }) => {
    const getIcon = (iconName: string) => {
      switch (iconName) {
        case 'globe':
          return <Globe size={20} color="#2563EB" />;
        case 'trending':
          return <TrendingUp size={20} color="#2563EB" />;
        case 'users':
          return <Users size={20} color="#2563EB" />;
        default:
          return <BookOpen size={20} color="#2563EB" />;
      }
    };

    return (
      <Animated.View
        entering={FadeIn.delay(index * 100).springify()}
        style={styles.insightCard}
      >
        <TouchableOpacity activeOpacity={0.7}>
          <Image source={{ uri: item.imageUrl }} style={styles.insightImage} />
          <View style={styles.insightContent}>
            <View style={styles.insightHeader}>
              {getIcon(item.icon)}
              <Text style={styles.insightTitle} numberOfLines={1}>
                {item.title}
              </Text>
            </View>
            <Text style={styles.insightSummary} numberOfLines={2}>
              {item.summary}
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderNewsCard = ({ item, index }: { item: NewsArticle; index: number }) => (
    <Animated.View
      entering={FadeIn.delay(index * 100).springify()}
      exiting={FadeOut}
    >
      <TouchableOpacity
        style={styles.newsCard}
        activeOpacity={0.7}
        onPress={() => {
          console.log('Article pressed:', item.headline);
        }}
      >
        <Image source={{ uri: item.imageUrl }} style={styles.newsThumbnail} />
        <View style={styles.newsContent}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category.toUpperCase()}</Text>
          </View>
          <Text style={styles.newsTitle} numberOfLines={2}>
            {debouncedQuery ? highlightText(item.headline, debouncedQuery) : item.headline}
          </Text>
          <Text style={styles.newsDescription} numberOfLines={2}>
            {debouncedQuery ? highlightText(item.description, debouncedQuery) : item.description}
          </Text>
          <View style={styles.newsFooter}>
            <Text style={styles.newsSource}>
              {debouncedQuery ? highlightText(item.source, debouncedQuery) : item.source}
            </Text>
            <Text style={styles.newsDate}>{formatDate(item.publishedAt)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderEmptyState = () => (
    <Animated.View
      entering={FadeIn.delay(300)}
      style={styles.emptyState}
    >
      <Search size={64} color="#9CA3AF" />
      <Text style={styles.emptyTitle}>No results found</Text>
      <Text style={styles.emptyDescription}>
        Try searching with different keywords or check your spelling
      </Text>
    </Animated.View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      {/* Sticky Header */}
      <View style={styles.stickyHeader}>
        {/* Search Bar */}
        <Animated.View style={[styles.searchContainer, searchBarAnimatedStyle]}>
          <TouchableOpacity onPress={handleSearchPress} style={styles.searchIconContainer}>
            <Search size={20} color="#6B7280" />
          </TouchableOpacity>
          
          <TextInput
            style={styles.searchInput}
            placeholder="Search news, topics…"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            onSubmitEditing={() => Keyboard.dismiss()}
          />
          
          {searchQuery.length > 0 && (
            <Animated.View entering={FadeIn} exiting={FadeOut}>
              <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                <X size={20} color="#6B7280" />
              </TouchableOpacity>
            </Animated.View>
          )}
        </Animated.View>

        {/* Tab Menu */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabContainer}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tab,
                activeTab === tab.id && styles.activeTab
              ]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.id && styles.activeTabText
                ]}
              >
                {tab.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Notifications */}
        <View style={styles.notificationContainer}>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={20} color="#6B7280" />
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.notificationText}>You have 3 unread notifications</Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* News Results */}
        <View style={styles.newsSection}>
          {filteredArticles.length > 0 ? (
            <FlatList
              data={filteredArticles}
              renderItem={renderNewsCard}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.newsList}
            />
          ) : (
            !isSearching && renderEmptyState()
          )}
          
          {isSearching && (
            <Animated.View entering={FadeIn} style={styles.loadingState}>
              <Text style={styles.loadingText}>Searching...</Text>
            </Animated.View>
          )}
        </View>

        {/* Insights Section */}
        <View style={styles.insightsSection}>
          <Text style={styles.sectionTitle}>Insights for You</Text>
          <FlatList
            data={insightsData}
            renderItem={renderInsightCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.insightsList}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  stickyHeader: {
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
    paddingBottom: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchIconContainer: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
  },
  clearButton: {
    marginLeft: 12,
    padding: 4,
  },
  tabContainer: {
    paddingBottom: 16,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  activeTab: {
    backgroundColor: '#2563EB',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  notificationButton: {
    position: 'relative',
    marginRight: 12,
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#EF4444',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  notificationText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  content: {
    flex: 1,
  },
  newsSection: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  newsList: {
    paddingBottom: 16,
  },
  newsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    padding: 12,
    flexDirection: 'row',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  newsThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    marginRight: 12,
  },
  newsContent: {
    flex: 1,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#2563EB',
    letterSpacing: 0.5,
  },
  newsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    lineHeight: 20,
    marginBottom: 6,
  },
  newsDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 18,
    marginBottom: 8,
  },
  newsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  newsSource: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#2563EB',
  },
  newsDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  highlightedText: {
    backgroundColor: '#FEF3C7',
    color: '#92400E',
    fontFamily: 'Inter-SemiBold',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  loadingState: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  insightsSection: {
    paddingTop: 24,
    paddingBottom: 100, // Account for tab bar
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  insightsList: {
    paddingHorizontal: 16,
    gap: 12,
  },
  insightCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: 280,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  insightImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#F3F4F6',
  },
  insightContent: {
    padding: 16,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  insightTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    flex: 1,
  },
  insightSummary: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
  },
});