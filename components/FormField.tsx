import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import { icons } from "../constants";

interface FormFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  handleChange: (text: string) => void;
  className?: string;
  keyboardType?: "default" | "email-address" | "numeric";
}

export const FormField = ({
  label,
  value,
  placeholder,
  handleChange,
  className,
  keyboardType = "default",
  ...props
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${className}`}>
      <Text className="text-base text-gray-100 font-pmedium">{label}</Text>

      <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChange}
          secureTextEntry={label === "Password" && !showPassword}
          keyboardType={keyboardType}
          {...props}
        />

        {label === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
