import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  selected: string;
  onSelect: (sport: string) => void;
};

const sports = ["All", "Football", "Basketball", "Cricket"];

export default function FilterChips({ selected, onSelect }: Props) {
  return (
    <View style={styles.container}>
      {sports.map((sport) => (
        <Pressable
          key={sport}
          style={[styles.chip, selected === sport && styles.activeChip]}
          onPress={() => onSelect(sport)}
        >
          <Text style={[styles.text, selected === sport && styles.activeText]}>
            {sport}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 12,
    marginBottom: 8,
    gap: 8,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#e5e5e5",
    borderRadius: 20,
  },
  activeChip: {
    backgroundColor: "#2563eb",
  },
  text: {
    color: "#111",
  },
  activeText: {
    color: "white",
  },
});
