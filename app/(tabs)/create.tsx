import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Create() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href="/" className="text-primary mb-2 text-xl">
        Go to index
      </Link>
    </View>
  );
}
