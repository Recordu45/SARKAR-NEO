import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function App() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [history, setHistory] = useState([]);

  const pulse = useRef(new Animated.Value(1)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const glow = useRef(new Animated.Value(0.35)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.08,
          duration: 1400,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1400,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 9000,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glow, {
          toValue: 0.8,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(glow, {
          toValue: 0.3,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const rotation = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const performSearch = () => {
    const text = query.trim();

    if (!text) return;

    setHistory((old) => [
      text,
      ...old.filter((item) => item !== text),
    ]);

    setQuery("");
  };

  const tabs = ["All", "Web", "News", "Images", "Videos", "Books"];

  const trending = [
    {
      icon: "sparkles-outline",
      title: "Artificial Intelligence",
      subtitle: "Explore the latest AI information",
    },
    {
      icon: "globe-outline",
      title: "Technology",
      subtitle: "Discover what's happening worldwide",
    },
    {
      icon: "newspaper-outline",
      title: "Latest News",
      subtitle: "Stay updated with current events",
    },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#050309"
      />

      <View style={styles.container}>

        {/* Background glow */}
        <Animated.View
          style={[
            styles.backgroundGlow,
            {
              opacity: glow,
              transform: [{ scale: pulse }],
            },
          ]}
        />

        <Animated.View
          style={[
            styles.backgroundGlowTwo,
            {
              opacity: glow,
              transform: [{ scale: pulse }],
            },
          ]}
        />

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.smallBrand}>SARKAR</Text>
            <Text style={styles.tagline}>
              INTELLIGENT SEARCH
            </Text>
          </View>

          <TouchableOpacity style={styles.headerButton}>
            <Ionicons
              name="notifications-outline"
              size={22}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >

          {/* Main Logo */}
          <View style={styles.logoArea}>
            <Text style={styles.logo}>SARKAR</Text>
            <Text style={styles.logoSub}>
              SEARCH • DISCOVER • KNOW
            </Text>
          </View>

          {/* Core */}
          <View style={styles.coreArea}>

            <Animated.View
              style={[
                styles.orbitOuter,
                {
                  transform: [
                    { rotate: rotation },
                    { scale: pulse },
                  ],
                },
              ]}
            >
              <View style={styles.orbitDot} />
              <View style={styles.orbitDotTwo} />
            </Animated.View>

            <Animated.View
              style={[
                styles.coreGlow,
                {
                  transform: [{ scale: pulse }],
                },
              ]}
            />

            <Animated.View
              style={[
                styles.core,
                {
                  transform: [{ scale: pulse }],
                },
              ]}
            >
              <Ionicons
                name="search"
                size={42}
                color="#ffffff"
              />
              <Text style={styles.coreText}>CORE</Text>
            </Animated.View>

          </View>

          {/* Search box */}
          <View style={styles.searchBox}>
            <Ionicons
              name="search-outline"
              size={24}
              color="#b85cff"
            />

            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Ask SARKAR anything..."
              placeholderTextColor="#81758d"
              style={styles.input}
              returnKeyType="search"
              onSubmitEditing={performSearch}
            />

            <TouchableOpacity
              style={styles.voiceButton}
              onPress={() => {}}
            >
              <Ionicons
                name="mic-outline"
                size={23}
                color="#fff"
              />
            </TouchableOpacity>
          </View>

          {/* Search button */}
          <TouchableOpacity
            style={styles.searchButton}
            onPress={performSearch}
          >
            <Ionicons
              name="sparkles"
              size={19}
              color="#fff"
            />
            <Text style={styles.searchButtonText}>
              SEARCH WITH SARKAR
            </Text>
          </TouchableOpacity>

          {/* Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabs}
          >
            {tabs.map((tab) => {
              const active = activeTab === tab;

              return (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  style={[
                    styles.tab,
                    active && styles.activeTab,
                  ]}
                >
                  <Text
                    style={[
                      styles.tabText,
                      active && styles.activeTabText,
                    ]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Trending */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              TRENDING SEARCHES
            </Text>

            <Ionicons
              name="trending-up-outline"
              size={20}
              color="#c15cff"
            />
          </View>

          {trending.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.trendingCard}
              onPress={() => {
                setQuery(item.title);
              }}
            >
              <View style={styles.trendingIcon}>
                <Ionicons
                  name={item.icon}
                  size={25}
                  color="#d15cff"
                />
              </View>

              <View style={styles.trendingText}>
                <Text style={styles.trendingTitle}>
                  {item.title}
                </Text>

                <Text style={styles.trendingSubtitle}>
                  {item.subtitle}
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color="#6f6577"
              />
            </TouchableOpacity>
          ))}

          {/* Recent searches */}
          {history.length > 0 && (
            <>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                  RECENT SEARCHES
                </Text>

                <TouchableOpacity
                  onPress={() => setHistory([])}
                >
                  <Text style={styles.clearText}>
                    CLEAR
                  </Text>
                </TouchableOpacity>
              </View>

              {history.slice(0, 5).map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.historyItem}
                  onPress={() => setQuery(item)}
                >
                  <Ionicons
                    name="time-outline"
                    size={19}
                    color="#8d7d99"
                  />

                  <Text style={styles.historyText}>
                    {item}
                  </Text>

                  <Ionicons
                    name="arrow-up-outline"
                    size={18}
                    color="#8d7d99"
                  />
                </TouchableOpacity>
              ))}
            </>
          )}

          {/* Bottom info */}
          <View style={styles.statusCard}>
            <View style={styles.statusDot} />

            <View>
              <Text style={styles.statusTitle}>
                SARKAR CORE ONLINE
              </Text>

              <Text style={styles.statusSubtitle}>
                Intelligent search engine ready
              </Text>
            </View>
          </View>

        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>

          <NavItem
            icon="home"
            label="Home"
            active
          />

          <NavItem
            icon="search-outline"
            label="Search"
          />

          <TouchableOpacity style={styles.centerNav}>
            <View style={styles.centerNavCircle}>
              <Ionicons
                name="sparkles"
                size={24}
                color="#fff"
              />
            </View>
            <Text style={styles.centerNavText}>
              Core
            </Text>
          </TouchableOpacity>

          <NavItem
            icon="time-outline"
            label="History"
          />

          <NavItem
            icon="person-outline"
            label="Profile"
          />

        </View>
      </View>
    </SafeAreaView>
  );
}

function NavItem({ icon, label, active }) {
  return (
    <TouchableOpacity style={styles.navItem}>
      <Ionicons
        name={icon}
        size={22}
        color={active ? "#d45cff" : "#706677"}
      />

      <Text
        style={[
          styles.navLabel,
          active && styles.navLabelActive,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#050309",
  },

  container: {
    flex: 1,
    backgroundColor: "#050309",
  },

  backgroundGlow: {
    position: "absolute",
    width: 330,
    height: 330,
    borderRadius: 200,
    backgroundColor: "#7416a8",
    top: 40,
    left: width / 2 - 165,
    opacity: 0.25,
  },

  backgroundGlowTwo: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 200,
    backgroundColor: "#d11c98",
    bottom: 160,
    right: -120,
    opacity: 0.2,
  },

  header: {
    height: 75,
    paddingHorizontal: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#17101d",
  },

  smallBrand: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 4,
  },

  tagline: {
    color: "#8e7897",
    fontSize: 8,
    letterSpacing: 2,
    marginTop: 3,
  },

  headerButton: {
    width: 43,
    height: 43,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#40204d",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0d0811",
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 130,
  },

  logoArea: {
    alignItems: "center",
    marginTop: 4,
  },

  logo: {
    color: "#ffffff",
    fontSize: 43,
    fontWeight: "900",
    letterSpacing: 8,
    textShadowColor: "#c438ff",
    textShadowOffset: {
      width: 0,
      height: 0,
    },
    textShadowRadius: 18,
  },

  logoSub: {
    color: "#9c83a7",
    fontSize: 9,
    letterSpacing: 3,
    marginTop: 5,
  },

  coreArea: {
    height: 235,
    alignItems: "center",
    justifyContent: "center",
  },

  orbitOuter: {
    position: "absolute",
    width: 205,
    height: 205,
    borderRadius: 110,
    borderWidth: 1,
    borderColor: "#8734a6",
    borderStyle: "dashed",
  },

  orbitDot: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ff4edb",
    top: 15,
    right: 38,
  },

  orbitDotTwo: {
    position: "absolute",
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#9b4dff",
    bottom: 22,
    left: 42,
  },

  coreGlow: {
    position: "absolute",
    width: 145,
    height: 145,
    borderRadius: 80,
    backgroundColor: "#9b24c5",
    opacity: 0.2,
  },

  core: {
    width: 105,
    height: 105,
    borderRadius: 55,
    backgroundColor: "#12091a",
    borderWidth: 2,
    borderColor: "#b936dc",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#d53cff",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 22,
    elevation: 15,
  },

  coreText: {
    color: "#bfa8c8",
    fontSize: 8,
    letterSpacing: 3,
    marginTop: 3,
  },

  searchBox: {
    height: 62,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#7d2ba0",
    backgroundColor: "#0d0812",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    shadowColor: "#bd37ff",
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 8,
  },

  input: {
    flex: 1,
    color: "#ffffff",
    fontSize: 16,
    marginLeft: 11,
  },

  voiceButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#21102b",
    alignItems: "center",
    justifyContent: "center",
  },

  searchButton: {
    height: 52,
    marginTop: 12,
    borderRadius: 17,
    backgroundColor: "#8d26b9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    shadowColor: "#c933ff",
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 8,
  },

  searchButtonText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 1,
  },

  tabs: {
    paddingTop: 20,
    paddingBottom: 22,
    gap: 9,
  },

  tab: {
    paddingHorizontal: 18,
    height: 39,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#2b1b35",
    backgroundColor: "#0d0911",
    alignItems: "center",
    justifyContent: "center",
  },

  activeTab: {
    backgroundColor: "#9829c5",
    borderColor: "#c74df2",
    shadowColor: "#d735ff",
    shadowOpacity: 0.35,
    shadowRadius: 10,
  },

  tabText: {
    color: "#8b7c92",
    fontSize: 12,
    fontWeight: "700",
  },

  activeTabText: {
    color: "#ffffff",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 12,
  },

  sectionTitle: {
    color: "#9d8ca6",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
  },

  clearText: {
    color: "#bd4ee3",
    fontSize: 10,
    fontWeight: "800",
  },

  trendingCard: {
    minHeight: 76,
    borderRadius: 17,
    backgroundColor: "#0d0911",
    borderWidth: 1,
    borderColor: "#211529",
    marginBottom: 10,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
  },

  trendingIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: "#1c0c25",
    alignItems: "center",
    justifyContent: "center",
  },

  trendingText: {
    flex: 1,
    marginLeft: 13,
  },

  trendingTitle: {
    color: "#eee7f0",
    fontSize: 14,
    fontWeight: "800",
  },

  trendingSubtitle: {
    color: "#75697d",
    fontSize: 11,
    marginTop: 4,
  },

  historyItem: {
    height: 55,
    borderBottomWidth: 1,
    borderBottomColor: "#19121c",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
    gap: 12,
  },

  historyText: {
    flex: 1,
    color: "#c7bdcb",
    fontSize: 13,
  },

  statusCard: {
    marginTop: 25,
    padding: 15,
    borderRadius: 16,
    backgroundColor: "#0b1010",
    borderWidth: 1,
    borderColor: "#18352d",
    flexDirection: "row",
    alignItems: "center",
  },

  statusDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#35e890",
    marginRight: 12,
  },

  statusTitle: {
    color: "#d6f7e8",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
  },

  statusSubtitle: {
    color: "#65786f",
    fontSize: 10,
    marginTop: 3,
  },

  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 82,
    backgroundColor: "#09060d",
    borderTopWidth: 1,
    borderTopColor: "#211529",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 7,
  },

  navItem: {
    width: 62,
    alignItems: "center",
    justifyContent: "center",
  },

  navLabel: {
    color: "#625867",
    fontSize: 9,
    marginTop: 5,
  },

  navLabelActive: {
    color: "#c94eff",
    fontWeight: "800",
  },

  centerNav: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: -28,
  },

  centerNavCircle: {
    width: 56,
    height: 56,
    borderRadius: 30,
    backgroundColor: "#8d27b9",
    borderWidth: 3,
    borderColor: "#d052ff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#d33cff",
    shadowOpacity: 0.7,
    shadowRadius: 18,
    elevation: 12,
  },

  centerNavText: {
    color: "#9c8ca4",
    fontSize: 9,
    marginTop: 4,
  },
});
