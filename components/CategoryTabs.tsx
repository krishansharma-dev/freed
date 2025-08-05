import { categories, mockNewsData } from '@/data/mockNews';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { VerticalNewsCarousel } from './VerticalNewsCarousel';

const renderScene = SceneMap({
  topstories: () => <VerticalNewsCarousel articles={mockNewsData.filter(article => article.category === 'topstories')} />,
  trending: () => <VerticalNewsCarousel articles={mockNewsData.filter(article => article.category === 'trending')} />,
  technology: () => <VerticalNewsCarousel articles={mockNewsData.filter(article => article.category === 'technology')} />,
  sports: () => <VerticalNewsCarousel articles={mockNewsData.filter(article => article.category === 'sports')} />,
});

export function CategoryTabs() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState(categories.map(cat => ({ key: cat.key, title: cat.title })));

  const renderTabBar = (props: any) => (
    <View style={styles.tabBarContainer}>
      <TabBar
        {...props}
        indicatorStyle={styles.indicator}
        style={styles.tabBar}
        labelStyle={styles.tabLabel}
        activeColor="#FFFFFF"
        inactiveColor="#94A3B8"
        scrollEnabled
        tabStyle={styles.tab}
        renderLabel={({
          route,
          focused,
          color,
        }: {
          route: { key: string; title: string };
          focused: boolean;
          color: string;
        }) => {
          const scale = useSharedValue(1);

          const animatedStyle = useAnimatedStyle(() => ({
            transform: [{ scale: withSpring(scale.value) }],
          }));

          return (
            <TouchableOpacity
              onPressIn={() => {
                scale.value = 0.95; // Scale down slightly on press
              }}
              onPressOut={() => {
                scale.value = 1; // Return to normal scale
                props.jumpTo(route.key); // Switch to the selected tab
              }}
              style={[styles.labelContainer, focused && styles.activeLabelContainer]}
            >
              <Animated.View style={animatedStyle}>
                <Text style={[styles.tabLabel, { color }, focused && styles.activeTabLabel]}>
                  {route.title}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
        swipeEnabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  tabBarContainer: {
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    paddingTop: 8,
    shadowColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tabBar: {
    backgroundColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
    height: 48,
  },
  indicator: {
    backgroundColor: '#FFFFFF',
    height: 3,
    borderRadius: 2,
    marginBottom: 2,
  },
  tab: {
    width: 'auto',
    minWidth: 80,
    paddingHorizontal: 4,
  },
  labelContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'transparent',
    minHeight: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeLabelContainer: {
    backgroundColor: '#1E293B',
  },
  tabLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    textTransform: 'capitalize',
    fontWeight: '500',
    color: '#FFFFFF',
  },
  activeTabLabel: {
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
  },
});