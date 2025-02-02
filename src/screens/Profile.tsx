import { useState } from "react";

import { ScrollView, TouchableOpacity } from "react-native";
import { Center, Heading, Text, VStack, useToast } from "@gluestack-ui/themed";

import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";

import { ScreenHeader } from "@/components/ScreenHeader";
import { UserPhoto } from "@/components/UserPhoto";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { ToastMessage } from "@/components/ToastMessage";

export function Profile() {
  const [userPhoto, setUserPhoto] = useState("https://github.com/LElTEDEV.png");
  const toast = useToast();

  async function handleUserPhotoSelect() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      if (photoSelected.canceled) {
        return;
      }

      const photoURI = photoSelected.assets[0].uri;

      if (photoURI) {
        const photoInfo = (await FileSystem.getInfoAsync(photoURI)) as {
          size: number;
        };

        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            placement: "top",
            render: ({ id }) => (
              <ToastMessage
                id={id}
                action="error"
                title="Arquivo acima do tamanho permitido!"
                description="Por favor, selecione um arquivo de no máximo 5MB"
                onClose={() => toast.close(id)}
              />
            ),
          });
        }

        toast.show({
          placement: "top",
          render: ({ id }) => (
            <ToastMessage
              id={id}
              title="Foto carregada com sucesso!"
              action="success"
              onClose={() => toast.close(id)}
            />
          ),
        });

        setUserPhoto(photoURI);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt="$6" px="$10">
          <UserPhoto
            source={{ uri: userPhoto }}
            alt="Foto do usuário"
            size="xl"
          />

          <TouchableOpacity onPress={handleUserPhotoSelect}>
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
