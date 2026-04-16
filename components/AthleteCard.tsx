import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  athlete: any;
  onPress: () => void;
};

export default function AthleteCard({ athlete, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.name}>{athlete.name || "Unknown"}</Text>
      <Text>
        {athlete.sport} • {athlete.position}
      </Text>
      <Text>Age: {athlete.age}</Text>
      <Text style={styles.score}>Score: {athlete.score || 0}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 12,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111",
  },
  score: {
    marginTop: 6,
    color: "#16a34a",
    fontWeight: "600",
  },
});
