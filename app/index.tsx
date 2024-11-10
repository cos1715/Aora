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
      <Link href="/profile" className="text-blue-500 mb-2 text-xl">
        Profile
      </Link>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
