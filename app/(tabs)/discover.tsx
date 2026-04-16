import AthleteCard from "@/components/AthleteCard";
import FilterChips from "@/components/FilterChips";
import SearchBar from "@/components/SearchBar";
import athletes from "@/data/athletes";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, Pressable } from "react-native";

export default function DiscoverScreen() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [sport, setSport] = useState("All");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortByScore, setSortByScore] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const filteredAthletes = athletes
    .filter((a) => {
      const query = debouncedSearch.trim().toLowerCase();
      const matchesSearch = a.name.toLowerCase().startsWith(query);
      const matchesSport = sport === "All" || a.sport === sport;
      return matchesSearch && matchesSport;
    })
    .sort((a, b) => {
      if (!sortByScore) return 0;
      return (b.score || 0) - (a.score || 0);
    });

  return (
    <View style={styles.container}>
      <SearchBar value={search} onChange={setSearch} />
      <FilterChips selected={sport} onSelect={setSport} />

      <Pressable
        onPress={() => setSortByScore(!sortByScore)}
        style={[
          styles.sortButton,
          sortByScore && styles.sortButtonActive,
        ]}
      >
        <Text
          style={[
            styles.sortText,
            sortByScore && styles.sortTextActive,
          ]}
        >
          Sort by Score {sortByScore ? "(High → Low)" : ""}
        </Text>
      </Pressable>

      <Text style={styles.count}>{filteredAthletes.length} results</Text>

      <FlatList
        data={filteredAthletes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <AthleteCard
            athlete={item}
            onPress={() => router.push(`/profile/${item.id}`)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No athletes found</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  sortButton: {
    marginHorizontal: 12,
    marginBottom: 8,
    padding: 10,
    backgroundColor: "#e5e5e5",
    borderRadius: 8,
  },
  sortButtonActive: { backgroundColor: "#2563eb" },
  sortText: { color: "#111" },
  sortTextActive: { color: "white" },
  count: { marginHorizontal: 12, marginBottom: 6 },
  empty: { textAlign: "center", marginTop: 40 },
});