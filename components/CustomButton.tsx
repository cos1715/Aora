import classNames from "classnames";
import { TouchableOpacity, Text } from "react-native";

interface ICustomButton {
  containerClassName?: string;
  textClassName?: string;
  isLoading?: boolean;
  title: string;
  handlePress?: () => void;
}

export const CustomButton = ({
  title,
  handlePress,
  containerClassName,
  textClassName,
  isLoading,
}: ICustomButton) => {
  const wrapperClass = classNames(
    "bg-secondary rounded-xl min-h-[62px] justify-center items-center",
    containerClassName,
    { "opacity-50": isLoading }
  );

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
      className={wrapperClass}
    >
      <Text
        className={classNames(
          "text-primary font-psemibold text-lg",
          textClassName
        )}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
