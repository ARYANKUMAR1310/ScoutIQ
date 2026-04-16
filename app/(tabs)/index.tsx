import athletes from "@/data/athletes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

const SHORTLIST_KEY = "scoutiq_shortlist";

export default function HomeScreen() {
  const router = useRouter();

  const [shortlistedCount, setShortlistedCount] = useState(0);

  const loadShortlist = async () => {
    const raw = await AsyncStorage.getItem(SHORTLIST_KEY);
    const list = raw ? JSON.parse(raw) : [];
    setShortlistedCount(list.length);
  };

  useFocusEffect(
    useCallback(() => {
      loadShortlist();
    }, []),
  );

  const topAthletes = [...athletes]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ScoutIQ</Text>
      <Text style={styles.subtitle}>Welcome, Scout</Text>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{athletes.length}</Text>
          <Text style={styles.statLabel}>Athletes</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{shortlistedCount}</Text>
          <Text style={styles.statLabel}>Shortlisted</Text>
        </View>
      </View>

      <Pressable style={styles.card} onPress={() => router.push("/discover")}>
        <Text style={styles.cardTitle}>Browse Athletes</Text>
        <Text style={styles.cardText}>Explore and evaluate talent</Text>
      </Pressable>

      <Pressable style={styles.card} onPress={() => router.push("/shortlist")}>
        <Text style={styles.cardTitle}>View Shortlist</Text>
        <Text style={styles.cardText}>Manage selected athletes</Text>
      </Pressable>

      <Text style={styles.sectionTitle}>Top Athletes</Text>

      <FlatList
        data={topAthletes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.previewCard}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>
              {item.sport} • {item.position}
            </Text>
            <Text style={styles.score}>Score: {item.score}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    marginBottom: 16,
    color: "#555",
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  statBox: {
    flex: 1,
    backgroundColor: "white",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    elevation: 2,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#666",
  },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  cardText: {
    color: "#666",
    marginTop: 4,
  },
  sectionTitle: {
    marginTop: 10,
    marginBottom: 8,
    fontWeight: "600",
  },
  previewCard: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    elevation: 1,
  },
  name: {
    fontWeight: "600",
  },
  score: {
    marginTop: 4,
    color: "#16a34a",
  },
});
