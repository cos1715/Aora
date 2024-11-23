import { FC } from "react";
import { View, Image, Text } from "react-native";
import { Tabs } from "expo-router";
import cn from "classnames";
import { icons } from "../../constants";

interface ITabIcon {
  focused: boolean;
  color: string;
  name: string;
  source: any;
}

const TabIcon: FC<ITabIcon> = ({ focused, color, name, source }) => {
  return (
    <View className="justify-center items-center gap-2 flex r-width-726pan r-height-h0d30l">
      <Image
        source={source}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={cn("font-pregular text-xs", { "font-psemibold": focused })}
        style={{ color }}
      >
        {name}
      </Text>
    </View>
  );
};

const tabsConfig = [
  { name: "home", title: "Home", icon: icons["home"] },
  { name: "bookmark", title: "Bookmark", icon: icons["bookmark"] },
  { name: "create", title: "Create", icon: icons["plus"] },
  { name: "profile", title: "Profile", icon: icons["profile"] },
];

export default function TabsLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#ffa001",
          tabBarInactiveTintColor: "#cdcde0",
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 84,
          },
        }}
      >
        {tabsConfig.map((tab) => (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              title: tab.title,
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  color={color}
                  focused={focused}
                  source={tab.icon}
                  name={tab.title}
                />
              ),
            }}
          />
        ))}
      </Tabs>
    </>
  );
}
