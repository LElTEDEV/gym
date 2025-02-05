import {
  FormControl,
  Input as GluestackInput,
  InputField,
} from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof InputField> & {
  isReadOnly?: boolean;
  isInvalid?: string | undefined;
};

export function Input({ isInvalid, isReadOnly = false, ...rest }: Props) {
  const isinvalid = isInvalid ?? false;

  return (
    <FormControl isInvalid={isinvalid} w="$full">
      <GluestackInput
        h="$14"
        borderWidth="$0"
        borderRadius="$md"
        $focus={{ borderWidth: 1, borderColor: "$green500" }}
        $invalid={{ borderWidth: 1, borderColor: "$red500" }}
        isReadOnly={isReadOnly}
        opacity={isReadOnly ? 0.4 : 1}
      >
        <InputField
          px="$4"
          bg="$gray700"
          color="$white"
          fontFamily="$body"
          placeholderTextColor="$gray300"
          {...rest}
        />
      </GluestackInput>
    </FormControl>
  );
}
