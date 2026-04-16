import athletes from "@/data/athletes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const SHORTLIST_KEY = "scoutiq_shortlist";

export default function ShortlistScreen() {
  const [shortlistedIds, setShortlistedIds] = useState<number[]>([]);
  const router = useRouter();

  const loadShortlist = async () => {
    try {
      const raw = await AsyncStorage.getItem(SHORTLIST_KEY);
      const list = raw ? JSON.parse(raw) : [];
      setShortlistedIds(list);
    } catch {
      setShortlistedIds([]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadShortlist();
    }, []),
  );

  const shortlistedAthletes = athletes.filter((a) =>
    shortlistedIds.includes(a.id),
  );

  const removeFromShortlist = async (id: number) => {
    try {
      const updated = shortlistedIds.filter((x) => x !== id);
      await AsyncStorage.setItem(SHORTLIST_KEY, JSON.stringify(updated));
      setShortlistedIds(updated);
    } catch {}
  };

  const avgScore =
    shortlistedAthletes.length === 0
      ? 0
      : Math.round(
          shortlistedAthletes.reduce((sum, a) => sum + a.score, 0) /
            shortlistedAthletes.length,
        );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shortlisted Athletes</Text>

      <View style={styles.stats}>
        <Text>{shortlistedAthletes.length} athletes</Text>
        <Text>Avg Score: {avgScore}</Text>
      </View>

      <FlatList
        data={shortlistedAthletes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              onPress={() => router.push(`/profile/${item.id}`)}
            >
              <Text style={styles.name}>{item.name}</Text>
              <Text>
                {item.sport} • {item.position}
              </Text>
              <Text style={styles.score}>Score: {item.score}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => removeFromShortlist(item.id)}>
              <Text style={styles.remove}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No athletes shortlisted yet</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 12,
    marginBottom: 10,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 12,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "white",
    marginHorizontal: 12,
    marginBottom: 10,
    padding: 14,
    borderRadius: 10,
    elevation: 2,
  },
  name: {
    fontWeight: "600",
  },
  score: {
    marginTop: 4,
    color: "#16a34a",
  },
  remove: {
    marginTop: 8,
    color: "#dc2626",
    fontWeight: "600",
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#666",
  },
});
