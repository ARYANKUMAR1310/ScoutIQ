import { StyleSheet, TextInput, View } from "react-native";

type Props = {
  value: string;
  onChange: (text: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search athletes..."
        value={value}
        onChangeText={onChange}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 12,
  },
  input: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
  },
});
