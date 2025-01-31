import { ScrollView, TouchableOpacity } from "react-native";
import { Center, Heading, Text, VStack } from "@gluestack-ui/themed";
import { ScreenHeader } from "@/components/ScreenHeader";
import { UserPhoto } from "@/components/UserPhoto";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export function Profile() {
  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt="$6" px="$10">
          <UserPhoto
            source={{ uri: "https://github.com/LElTEDEV.png" }}
            alt="Foto do usuário"
            size="xl"
          />

          <TouchableOpacity>
            <Text
              color="$green500"
              fontFamily="$heading"
              fontSize="$md"
              mt="$2"
              mb="$8"
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Center w="$full" gap="$4">
            <Input placeholder="Nome" bg="$gray600" />
            <Input value="igor@igor.com" bg="$gray600" isReadOnly />
          </Center>

          <Heading
            alignSelf="flex-start"
            fontFamily="$heading"
            fontSize="$md"
            color="$gray200"
            mt="$12"
            mb="$2"
          >
            Alterar senha
          </Heading>

          <Center w="$full" gap="$4">
            <Input bg="$gray600" placeholder="Senha antiga" secureTextEntry />
            <Input bg="$gray600" placeholder="Nova senha" secureTextEntry />
            <Input
              bg="$gray600"
              placeholder="Confirme a nova senha"
              secureTextEntry
            />

            <Button title="Atualizar" />
          </Center>
        </Center>
      </ScrollView>
    </VStack>
  );
}
