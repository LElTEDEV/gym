import {
  VStack,
  Image,
  Center,
  Text,
  Heading,
  ScrollView,
  onChange,
  useToast,
} from "@gluestack-ui/themed";

import { useForm, Controller } from "react-hook-form";

import backgroundImg from "@/assets/background.png";
import Logo from "@/assets/logo.svg";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@/routes/auth.routes";

import { api } from "@/service/api";
import { Alert } from "react-native";
import { AppError } from "@/utils/AppError";
import { ToastMessage } from "@/components/ToastMessage";
type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

export function SignUp() {
  const navigate = useNavigation<AuthNavigatorRoutesProps>();

  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirm: "",
    },
  });

  async function handleOnSubmit({
    name,
    email,
    password,
    password_confirm,
  }: FormDataProps) {
    try {
      const response = await api.post("/users", {
        name,
        email,
        password,
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const titulo = isAppError
        ? error.message
        : "Não foi possível criar a conta. Tente novamente mais tarde";

      return toast.show({
        placement: "bottom",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title="ERRO"
            action="error"
            description={titulo}
            onClose={() => toast.close(id)}
          />
        ),
      });
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} bg="$gray700">
        <Image
          w="$full"
          h={624}
          defaultSource={backgroundImg}
          source={backgroundImg}
          alt="Pessoas treinando"
          position="absolute"
        />

        <VStack flex={1} px="$10" pb="$16">
          <Center my="$24">
            <Logo />

            <Text color="$gray100" fontSize="$sm">
              Treine sua mente e o seu corpo.
            </Text>
          </Center>

          <Center gap="$2" flex={1}>
            <Heading color="$gray100">Crie sua conta</Heading>

            {errors.name?.message && (
              <Text color="$red500">{errors.name.message}</Text>
            )}
            <Controller
              control={control}
              name="name"
              rules={{
                required: "Por favor, preencha o nome",
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Nome"
                  onChangeText={onChange}
                  value={value}
                  isInvalid={errors.name?.message}
                />
              )}
            />

            {errors.email?.message && (
              <Text color="$red500">{errors.email.message}</Text>
            )}
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Por favor, preencha o e-mail",
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                  isInvalid={errors.email?.message}
                />
              )}
            />

            {errors.password?.message && (
              <Text color="$red500">{errors.password.message}</Text>
            )}
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Por favor, digite uma senha",
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Senha"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  isInvalid={errors.password?.message}
                />
              )}
            />

            {errors.password_confirm?.message && (
              <Text color="$red500">{errors.password_confirm.message}</Text>
            )}
            <Controller
              name="password_confirm"
              control={control}
              rules={{
                required: "Por favor, confirme a sua senha",
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Confirme a senha"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  onSubmitEditing={handleSubmit(handleOnSubmit)}
                  returnKeyType="send"
                  isInvalid={errors.password_confirm?.message}
                />
              )}
            />

            <Button
              title="Criar e acessar"
              onPress={handleSubmit(handleOnSubmit)}
            />
          </Center>

          <Button
            title="Voltar para o login"
            variant="outline"
            mt="$12"
            onPress={() => navigate.navigate("signIn")}
          />
        </VStack>
      </VStack>
    </ScrollView>
  );
}
