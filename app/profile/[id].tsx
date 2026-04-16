import athletes from "@/data/athletes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const SHORTLIST_KEY = "scoutiq_shortlist";

function scoreColor(score: number) {
  if (score >= 80) return "#22C55E";
  if (score >= 60) return "#F59E0B";
  return "#EF4444";
}

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <View style={styles.progressTrack}>
      <View
        style={[
          styles.progressFill,
          { width: `${value}%`, backgroundColor: color },
        ]}
      />
    </View>
  );
}

export default function ProfileScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const athlete = athletes.find((a) => a.id === Number(id));
  const [isShortlisted, setIsShortlisted] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(SHORTLIST_KEY);
        const list = raw ? JSON.parse(raw) : [];
        setIsShortlisted(list.includes(Number(id)));
      } catch {
        setIsShortlisted(false);
      }
    })();
  }, [id]);

  const toggleShortlist = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(SHORTLIST_KEY);
      let list = raw ? JSON.parse(raw) : [];

      if (isShortlisted) {
        list = list.filter((x: number) => x !== Number(id));
      } else {
        if (!list.includes(Number(id))) {
          list.push(Number(id));
        }
      }

      await AsyncStorage.setItem(SHORTLIST_KEY, JSON.stringify(list));
      setIsShortlisted(!isShortlisted);
    } catch {}
  }, [id, isShortlisted]);

  if (!athlete) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0f172a" }}>
        <Text style={{ color: "white" }}>Athlete not found</Text>
      </View>
    );
  }

  const statEntries = Object.entries(athlete.stats || {});

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView style={styles.container}>
        <View style={styles.hero}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.back}>←</Text>
          </TouchableOpacity>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitials(athlete.name)}</Text>
          </View>

          <Text style={styles.name}>{athlete.name}</Text>
          <Text style={styles.meta}>
            {athlete.sport} • {athlete.position} • Age {athlete.age}
          </Text>
        </View>

        <View style={styles.stats}>
          {statEntries.map(([key, value]) => (
            <View key={key} style={styles.statBox}>
              <Text style={styles.statValue}>{value}</Text>
              <Text style={styles.statLabel}>{key}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.section}>Readiness Score</Text>

        <ProgressBar value={athlete.score || 0} color={scoreColor(athlete.score || 0)} />

        <Text style={styles.scoreText}>{athlete.score || 0} / 100</Text>

        <TouchableOpacity style={styles.button} onPress={toggleShortlist}>
          <Text style={styles.buttonText}>
            {isShortlisted ? "★ Remove from Shortlist" : "☆ Add to Shortlist"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a" },
  hero: { padding: 20, alignItems: "center" },
  back: { alignSelf: "flex-start", color: "white", fontSize: 20 },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#1e3a8a",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  avatarText: { color: "white", fontWeight: "bold" },
  name: { color: "white", fontSize: 18, fontWeight: "600" },
  meta: { color: "#cbd5f5", marginTop: 4 },
  stats: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 12,
    gap: 10,
  },
  statBox: {
    width: "30%",
    backgroundColor: "#1e293b",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  statValue: { color: "white", fontWeight: "bold" },
  statLabel: { color: "#94a3b8", fontSize: 12 },
  section: { margin: 12, color: "white", fontWeight: "600" },
  progressTrack: {
    height: 10,
    backgroundColor: "#334155",
    borderRadius: 10,
    marginHorizontal: 12,
    overflow: "hidden",
  },
  progressFill: { height: "100%", borderRadius: 10 },
  scoreText: { margin: 12, color: "white" },
  button: {
    backgroundColor: "#2563eb",
    margin: 12,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "600" },
});