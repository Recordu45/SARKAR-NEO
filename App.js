import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const PURPLE = "#C84CFF";
const PINK = "#FF4DDE";
const BG = "#05030B";
const CARD = "#100B19";

const trending = [
  ["Artificial Intelligence", "Technology"],
  ["SpaceX Starship Launch", "Science"],
  ["Quantum Computing", "Technology"],
  ["Black Hole", "Science"]
];

export default function App() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("Home");
  const [history, setHistory] = useState([]);

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];

    return [
      `${query} news`,
      `${query} latest`,
      `what is ${query}`
    ];
  }, [query]);

  const runSearch = (value = query) => {
    const q = value.trim();

    if (!q) return;

    setHistory((old) =>
      [q, ...old.filter((x) => x !== q)].slice(0, 20)
    );

    setQuery(q);
    setActive("Search");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={BG}
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topbar}>
            <Pressable style={styles.iconButton}>
              <Ionicons
                name="menu-outline"
                size={25}
                color="#F4EAFE"
              />
            </Pressable>

            <Text style={styles.logo}>
              SARKAR
            </Text>

            <Pressable style={styles.iconButton}>
              <Ionicons
                name="notifications-outline"
                size={23}
                color="#F4EAFE"
              />

              <View style={styles.notificationDot} />
            </Pressable>
          </View>

          {active === "Home" && (
            <>
              <View style={styles.hero}>
                <LinearGradient
                  colors={[
                    "#2A0840",
                    "#10051B",
                    "#05030B"
                  ]}
                  style={styles.orbit}
                >
                  <View
                    style={styles.orbitRingOuter}
                  />

                  <View
                    style={styles.orbitRingMiddle}
                  />

                  <View
                    style={styles.orbitRingInner}
                  >
                    <Ionicons
                      name="search"
                      size={62}
                      color="#FFFFFF"
                    />
                  </View>
                </LinearGradient>

                <Text style={styles.heroTitle}>
                  SARKAR SEARCH
                </Text>

                <Text style={styles.heroSubtitle}>
                  Everything. Everywhere.
                </Text>
              </View>

              <SearchBox
                query={query}
                setQuery={setQuery}
                onSearch={() => runSearch()}
              />

              {suggestions.length > 0 && (
                <View style={styles.suggestionBox}>
                  {suggestions.map((item) => (
                    <Pressable
                      key={item}
                      onPress={() =>
                        runSearch(item)
                      }
                      style={styles.suggestion}
                    >
                      <Ionicons
                        name="search-outline"
                        size={17}
                        color="#BBA9C7"
                      />

                      <Text
                        style={
                          styles.suggestionText
                        }
                      >
                        {item}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              )}

              <CategoryRow />

              <Text style={styles.sectionTitle}>
                TRENDING SEARCHES
              </Text>

              <View style={styles.card}>
                {trending.map(
                  ([title, category], index) => (
                    <Pressable
                      key={title}
                      onPress={() =>
                        runSearch(title)
                      }
                      style={[
                        styles.trendingRow,
                        index !==
                          trending.length - 1 &&
                          styles.rowBorder
                      ]}
                    >
                      <View
                        style={styles.trendIcon}
                      >
                        <Ionicons
                          name="sparkles-outline"
                          size={17}
                          color={PURPLE}
                        />
                      </View>

                      <View
                        style={styles.trendText}
                      >
                        <Text
                          style={styles.trendTitle}
                        >
                          {title}
                        </Text>

                        <Text
                          style={
                            styles.trendCategory
                          }
                        >
                          {category}
                        </Text>
                      </View>

                      <Ionicons
                        name="arrow-up-outline"
                        size={20}
                        color={PINK}
                      />
                    </Pressable>
                  )
                )}
              </View>

              <View style={styles.featureRow}>
                <Feature
                  icon="search"
                  text={"POWERFUL\nSEARCH"}
                />

                <Feature
                  icon="planet-outline"
                  text={"ALIEN\nTECHNOLOGY"}
                />

                <Feature
                  icon="flash-outline"
                  text={"LIGHTNING\nFAST"}
                />

                <Feature
                  icon="lock-closed-outline"
                  text={"PRIVATE &\nSECURE"}
                />
              </View>
            </>
          )}

          {active === "Search" && (
            <SearchScreen
              query={query}
              onBack={() => setActive("Home")}
            />
          )}

          {active === "History" && (
            <HistoryScreen
              history={history}
              onSelect={runSearch}
            />
          )}

          {active === "Profile" && (
            <ProfileScreen />
          )}
        </ScrollView>

        <BottomNav
          active={active}
          setActive={setActive}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function SearchBox({
  query,
  setQuery,
  onSearch
}) {
  return (
    <View style={styles.searchBox}>
      <Ionicons
        name="search-outline"
        size={21}
        color="#C5B4D0"
      />

      <TextInput
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={onSearch}
        placeholder="Search anything..."
        placeholderTextColor="#776B82"
        style={styles.input}
        returnKeyType="search"
      />

      <Pressable onPress={onSearch}>
        <Ionicons
          name="mic-outline"
          size={21}
          color={PINK}
        />
      </Pressable>

      <Pressable onPress={onSearch}>
        <Ionicons
          name="scan-outline"
          size={21}
          color="#C5B4D0"
        />
      </Pressable>
    </View>
  );
}

function CategoryRow() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.categories}
    >
      {[
        "All",
        "Web",
        "News",
        "Images",
        "Videos",
        "Books"
      ].map((item, i) => (
        <Pressable
          key={item}
          style={[
            styles.chip,
            i === 0 && styles.chipActive
          ]}
        >
          <Text
            style={[
              styles.chipText,
              i === 0 &&
                styles.chipTextActive
            ]}
          >
            {item}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

function SearchScreen({
  query,
  onBack
}) {
  const results = [
    [
      "Artificial Intelligence - Wikipedia",
      "https://en.wikipedia.org/wiki/Artificial_intelligence"
    ],
    [
      "What is Artificial Intelligence? - IBM",
      "https://www.ibm.com/topics/artificial-intelligence"
    ],
    [
      "Artificial Intelligence News - ScienceDaily",
      "https://www.sciencedaily.com/news/computers_math/artificial_intelligence/"
    ]
  ];

  return (
    <>
      <View style={styles.screenHeader}>
        <Pressable
          onPress={onBack}
          style={styles.iconButton}
        >
          <Ionicons
            name="arrow-back"
            size={23}
            color="#F4EAFE"
          />
        </Pressable>

        <Text style={styles.screenTitle}>
          Search Results
        </Text>

        <Ionicons
          name="options-outline"
          size={22}
          color="#F4EAFE"
        />
      </View>

      <View style={styles.searchBox}>
        <Ionicons
          name="search-outline"
          size={21}
          color="#C5B4D0"
        />

        <Text style={styles.resultQuery}>
          {query || "Search"}
        </Text>

        <Ionicons
          name="mic-outline"
          size={21}
          color={PINK}
        />
      </View>

      <CategoryRow />

      {results.map(([title, url]) => (
        <Pressable
          key={title}
          style={styles.resultCard}
        >
          <Text style={styles.resultTitle}>
            {title}
          </Text>

          <Text style={styles.resultUrl}>
            {url}
          </Text>

          <Text
            style={styles.resultDescription}
          >
            Real search results will be
            connected here through the SARKAR
            backend and search provider.
          </Text>

          <Ionicons
            name="arrow-forward-outline"
            size={18}
            color={PINK}
          />
        </Pressable>
      ))}

      <Text style={styles.sectionTitle}>
        PEOPLE ALSO ASK
      </Text>

      {[
        "What is AI?",
        "How does AI work?",
        "What are the types of AI?"
      ].map((x) => (
        <View
          key={x}
          style={styles.questionRow}
        >
          <Text style={styles.questionText}>
            {x}
          </Text>

          <Ionicons
            name="chevron-down"
            size={18}
            color="#A99CAF"
          />
        </View>
      ))}
    </>
  );
}

function HistoryScreen({
  history,
  onSelect
}) {
  return (
    <>
      <Text style={styles.pageTitle}>
        Search History
      </Text>

      {history.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons
            name="time-outline"
            size={45}
            color={PURPLE}
          />

          <Text style={styles.emptyTitle}>
            No searches yet
          </Text>

          <Text style={styles.emptyText}>
            Your recent SARKAR searches will
            appear here.
          </Text>
        </View>
      ) : (
        history.map((item) => (
          <Pressable
            key={item}
            style={styles.historyRow}
            onPress={() => onSelect(item)}
          >
            <Ionicons
              name="time-outline"
              size={19}
              color="#8E7C99"
            />

            <Text style={styles.historyText}>
              {item}
            </Text>

            <Ionicons
              name="arrow-up-outline"
              size={18}
              color="#BCA9C8"
            />
          </Pressable>
        ))
      )}
    </>
  );
}

function ProfileScreen() {
  return (
    <>
      <Text style={styles.pageTitle}>
        SARKAR
      </Text>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Ionicons
            name="person"
            size={27}
            color="#FFFFFF"
          />
        </View>

        <Text style={styles.profileName}>
          SARKAR User
        </Text>

        <Text style={styles.profileSub}>
          Search experience and preferences
        </Text>
      </View>

      {[
        "Voice Search",
        "Bookmarks",
        "Downloads",
        "Settings",
        "About SARKAR"
      ].map((x, i) => (
        <Pressable
          key={x}
          style={styles.menuRow}
        >
          <Ionicons
            name={[
              "mic-outline",
              "bookmark-outline",
              "download-outline",
              "settings-outline",
              "information-circle-outline"
            ][i]}
            size={21}
            color={PINK}
          />

          <Text style={styles.menuText}>
            {x}
          </Text>

          <Ionicons
            name="chevron-forward"
            size={18}
            color="#776B82"
          />
        </Pressable>
      ))}
    </>
  );
}

function Feature({
  icon,
  text
}) {
  return (
    <View style={styles.feature}>
      <Ionicons
        name={icon}
        size={24}
        color={PINK}
      />

      <Text style={styles.featureText}>
        {text}
      </Text>
    </View>
  );
}

function BottomNav({
  active,
  setActive
}) {
  const items = [
    ["Home", "home-outline"],
    ["Search", "search-outline"],
    ["Core", "planet-outline"],
    ["History", "time-outline"],
    ["Profile", "person-outline"]
  ];

  return (
    <View style={styles.bottomNav}>
      {items.map(([label, icon]) => {
        const selected =
          active === label;

        return (
          <Pressable
            key={label}
            onPress={() =>
              label !== "Core" &&
              setActive(label)
            }
            style={styles.navItem}
          >
            <View
              style={[
                styles.navIcon,
                selected &&
                  styles.navIconActive
              ]}
            >
              <Ionicons
                name={icon}
                size={21}
                color={
                  selected
                    ? "#FFFFFF"
                    : "#766B80"
                }
              />
            </View>

            <Text
              style={[
                styles.navText,
                selected &&
                  styles.navTextActive
              ]}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BG
  },

  flex: {
    flex: 1
  },

  container: {
    padding: 18,
    paddingBottom: 105
  },

  topbar: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  logo: {
    color: "#F4C8FF",
    fontSize: 27,
    fontWeight: "900",
    letterSpacing: 2
  },

  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center"
  },

  notificationDot: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: PINK
  },

  hero: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 18
  },

  orbit: {
    width: 190,
    height: 190,
    borderRadius: 95,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },

  orbitRingOuter: {
    position: "absolute",
    width: 175,
    height: 175,
    borderRadius: 88,
    borderWidth: 2,
    borderColor: "rgba(200,76,255,.5)"
  },

  orbitRingMiddle: {
    position: "absolute",
    width: 135,
    height: 135,
    borderRadius: 68,
    borderWidth: 2,
    borderColor: "rgba(255,77,222,.75)"
  },

  orbitRingInner: {
    width: 92,
    height: 92,
    borderRadius: 46,
    borderWidth: 2,
    borderColor: PURPLE,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#170A22"
  },

  heroTitle: {
    color: "#F4C8FF",
    fontSize: 18,
    fontWeight: "800",
    marginTop: 14,
    letterSpacing: 1
  },

  heroSubtitle: {
    color: "#8F8199",
    marginTop: 4
  },

  searchBox: {
    minHeight: 54,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#8730A7",
    backgroundColor: "#0D0814",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    gap: 10,
    shadowColor: PURPLE,
    shadowOpacity: 0.18,
    shadowRadius: 15,
    elevation: 8
  },

  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 15
  },

  resultQuery: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 15
  },

  categories: {
    gap: 9,
    paddingVertical: 15
  },

  chip: {
    paddingHorizontal: 17,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#110B18",
    justifyContent: "center"
  },

  chipActive: {
    backgroundColor: "#8D2BD0"
  },

  chipText: {
    color: "#9D90A8",
    fontSize: 13
  },

  chipTextActive: {
    color: "#FFFFFF",
    fontWeight: "700"
  },

  sectionTitle: {
    color: "#82758D",
    fontSize: 12,
    letterSpacing: 1.3,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "700"
  },

  card: {
    backgroundColor: CARD,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#20142A",
    overflow: "hidden"
  },

  trendingRow: {
    minHeight: 70,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    gap: 12
  },

  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#21172A"
  },

  trendIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#1A0D24",
    alignItems: "center",
    justifyContent: "center"
  },

  trendText: {
    flex: 1
  },

  trendTitle: {
    color: "#F1E9F5",
    fontSize: 14,
    fontWeight: "600"
  },

  trendCategory: {
    color: "#7D7087",
    fontSize: 11,
    marginTop: 4
  },

  featureRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 22
  },

  feature: {
    alignItems: "center",
    width: "24%"
  },

  featureText: {
    color: "#B8A9C0",
    fontSize: 8,
    textAlign: "center",
    marginTop: 7,
    lineHeight: 11
  },

  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 82,
    backgroundColor: "#08050D",
    borderTopWidth: 1,
    borderTopColor: "#21152A",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },

  navItem: {
    alignItems: "center",
    width: 68
  },

  navIcon: {
    width: 38,
    height: 32,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center"
  },

  navIconActive: {
    backgroundColor: "#7722A7",
    shadowColor: PINK,
    shadowOpacity: 0.45,
    shadowRadius: 12
  },

  navText: {
    color: "#71667A",
    fontSize: 9,
    marginTop: 3
  },

  navTextActive: {
    color: "#F0B7FF"
  },

  suggestionBox: {
    backgroundColor: "#0E0914",
    borderRadius: 14,
    marginTop: 7,
    borderWidth: 1,
    borderColor: "#24172E",
    overflow: "hidden"
  },

  suggestion: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#1D1325"
  },

  suggestionText: {
    color: "#D7CEDB",
    flex: 1
  },

  screenHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14
  },

  screenTitle: {
    color: "#F2E9F5",
    fontSize: 17,
    fontWeight: "700"
  },

  resultCard: {
    backgroundColor: CARD,
    borderRadius: 17,
    padding: 16,
    marginBottom: 11,
    borderWidth: 1,
    borderColor: "#21152A"
  },

  resultTitle: {
    color: "#F2D8FF",
    fontSize: 15,
    fontWeight: "700"
  },

  resultUrl: {
    color: "#A44BCA",
    fontSize: 10,
    marginTop: 6
  },

  resultDescription: {
    color: "#918494",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8,
    marginBottom: 8
  },

  questionRow: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#21152A",
    flexDirection: "row",
    justifyContent: "space-between"
  },

  questionText: {
    color: "#D9CEDF",
    fontSize: 13
  },

  pageTitle: {
    color: "#F2D8FF",
    fontSize: 26,
    fontWeight: "800",
    marginTop: 15,
    marginBottom: 20
  },

  empty: {
    alignItems: "center",
    paddingVertical: 80
  },

  emptyTitle: {
    color: "#EEE5F1",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 15
  },

  emptyText: {
    color: "#817487",
    textAlign: "center",
    marginTop: 8
  },

  historyRow: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1D1424"
  },

  historyText: {
    color: "#D6CADB",
    flex: 1
  },

  profileCard: {
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: "#24172E",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    marginBottom: 12
  },

  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#7621A5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },

  profileName: {
    color: "#F3E9F6",
    fontSize: 17,
    fontWeight: "700"
  },

  profileSub: {
    color: "#83758C",
    fontSize: 11,
    marginTop: 5
  },

  menuRow: {
    minHeight: 57,
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#1D1424"
  },

  menuText: {
    color: "#D5CADB",
    flex: 1
  }
});
