import { FC } from "react";
import classNames from "classnames";
import { TouchableOpacity, Text } from "react-native";

interface ICustomButton {
  className?: string;
  textClassName?: string;
  isLoading?: boolean;
  children: React.ReactNode;
  handlePress?: () => void;
}

export const CustomButton: FC<ICustomButton> = ({
  children,
  handlePress,
  className,
  textClassName,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
      className={classNames(
        "bg-secondary rounded-xl min-h-[62px] justify-center items-center",
        className,
        { "opacity-50": isLoading }
      )}
    >
      <Text
        className={classNames(
          "text-primary font-psemibold text-lg",
          textClassName
        )}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};
