import {
  Button as GluestackButton,
  Text,
  ButtonSpinner,
} from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof GluestackButton> & {
  title: string;
  variant?: "solid" | "outline";
  isLoading?: boolean;
};

export function Button({
  title,
  isLoading = false,
  variant = "solid",
  ...rest
}: Props) {
  return (
    <GluestackButton
      w="$full"
      h="$14"
      bg={variant === "outline" ? "transparent" : "$green700"}
      borderWidth={variant === "outline" ? "$1" : "$0"}
      borderColor="$green500"
      borderRadius="$sm"
      $active-bg={variant === "outline" ? "$gray500" : "$green500"}
      disabled={isLoading}
      {...rest}
    >
      <Text color="$white" fontFamily="$heading" fontSize="$sm">
        {isLoading ? (
          <ButtonSpinner />
        ) : (
          <Text
            color={variant === "outline" ? "$green500" : "$white"}
            fontFamily="$heading"
            fontSize="$sm"
          >
            {title}
          </Text>
        )}
      </Text>
    </GluestackButton>
  );
}
