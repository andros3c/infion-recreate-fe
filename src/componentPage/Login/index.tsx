"use client";

import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { cloneDeep } from "lodash";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { LoginRegisterSideContent } from "../../components/LoginRegisterSideContent";
import { useAuthContext } from "../../contexts/auth";
import { checkIsValueValid } from "../../utils/validation/checkIsValueValid";

const LoginPageContent = () => {
  const initialLoginField = {
    identifier: { value: "", error: "" },
    password: { value: "", error: "" },
  };
  const [show, setShow] = useState(false);
  const { push } = useRouter();
  const { handleUserLogin } = useAuthContext();
  const [loginField, setLoginField] = useState(initialLoginField);
  const handleClickLogin = () => {
    const {
      identifier: { value: identifier },
      password: { value: password },
    } = loginField;
    handleUserLogin({ identifier, password });
    setLoginField(initialLoginField);
  };
  const handleFieldOnChange = (key, value) => {
    const copyValue = cloneDeep(loginField);
    copyValue[key].value = value;
    !checkIsValueValid(value)
      ? (copyValue[key].error = "must be filled")
      : (copyValue[key].error = "");

    setLoginField(copyValue);
  };
  const isFieldsValid = Object.values(loginField).every(
    (field) => field.value && field.error === ""
  );

  return (
    <Flex h="100%" w="100%">
      <LoginRegisterSideContent />
      <Flex
        w="60%"
        bgColor={"#EBEBEB"}
        justifyContent={"center"}
        align={"center"}
      >
        <Flex
          p="3em"
          borderRadius={"35px"}
          bgColor={"white"}
          direction={"column"}
          gap="2em"
          boxShadow="lg"
        >
          <Text fontWeight={"bold"} fontSize="large" align="center">
            Login
          </Text>
          <Flex direction={"column"}>
            <Text>Email or Username</Text>
            <Input
              type="text"
              value={loginField.identifier.value}
              onChange={(e) =>
                handleFieldOnChange("identifier", e.target.value)
              }
            />
            <Text fontSize="small" color="red">
              {loginField.identifier.error}
            </Text>
          </Flex>
          <Flex direction={"column"}>
            <Text>Password</Text>
            <InputGroup>
              <Input
                type={show ? "text" : "password"}
                value={loginField.password.value}
                onChange={(e) =>
                  handleFieldOnChange("password", e.target.value)
                }
              />
              <InputRightElement width="4.5rem">
                <Button
                  fontSize={"small"}
                  h="1.75rem"
                  size="sm"
                  colorScheme="black"
                  variant={"transparent"}
                  onClick={() => setShow((prev) => !prev)}
                >
                  show
                </Button>
              </InputRightElement>
            </InputGroup>
            <Text fontSize="small" color="red">
              {loginField.password.error}
            </Text>
          </Flex>
          <Text as={"a"} fontSize="smaller" color={"green"}>
            Forgot Password?
          </Text>
          <Flex direction={"column"} gap=".8em" mt="2em">
            <Button
              colorScheme={"blue"}
              onClick={() => handleClickLogin()}
              isDisabled={!isFieldsValid}
            >
              Login
            </Button>
            <Text
              as={"a"}
              href="/"
              fontSize={"smaller"}
              align={"center"}
            >{`Don't have any account?`}</Text>
            <Button
              colorScheme={"yellow"}
              onClick={() => push("/register")}
              variant="light"
            >
              Register
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

const LoginPage = () => {
  return <LoginPageContent />;
};
export default LoginPage;
