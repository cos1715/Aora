import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link
        href="/profile"
        style={{
          color: "blue",
          textDecorationLine: "underline",
          marginBottom: 10,
        }}
      >
        Profile
      </Link>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
