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
import { checkIsValueValid } from "../../utils/validation/checkIsValueValid";
import { passwordValidation } from "../../utils/validation/passwordValidation";
import { useUserRegisterMutation } from "../../hooks/queries/mutations/useUserRegisterMutation";
import { useCreateToast } from "../../hooks/useCreateToast";
import { LoginRegisterSideContent } from "../../components/LoginRegisterSideContent";

const RegisterPage = () => {
  const [show, setShow] = useState({
    password: false,
    passConfirmation: false,
  });
  const defaultRegisterField = {
    username: { label: "Username", value: "", error: "" },
    email: { label: "Email", value: "", error: "" },
    password: { label: "Password", value: "", error: "" },
    passwordConfirmation: {
      label: "Password Confirmation",
      value: "",
      error: "",
    },
  };
  const [registerField, setRegisterField] = useState(defaultRegisterField);
  const handleFieldOnChange = ({ key, value }) => {
    const copyValue = cloneDeep(registerField);
    copyValue[key].value = value;
    copyValue[key].error = !checkIsValueValid(value)
      ? `${copyValue[key].label} must be filled`
      : "";

    if (key === "email") {
      copyValue.email.error = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        value
      )
        ? "wrong email format"
        : "";
    }

    if (key === "password") {
      copyValue.password.error = passwordValidation(value);
    }
    if (key === "passwordConfirmation") {
      copyValue.passwordConfirmation.error =
        copyValue.password.value !== copyValue.passwordConfirmation.value
          ? "Password not match"
          : "";
    }

    setRegisterField(copyValue);
  };
  const isFieldsValid = Object.values(registerField).every(
    (field) => field.value && field.error === ""
  );
  const { createSuccessToast } = useCreateToast();

  const { mutateAsync: _handleRegisterUser } = useUserRegisterMutation({
    config: {
      onSuccess: () => createSuccessToast("Success"),
    },
  });
  const handleClickRegister = () => {
    const {
      username: { value: username },
      password: { value: password },
      email: { value: email },
    } = registerField;
    _handleRegisterUser({ username, password, email });
    setRegisterField(defaultRegisterField);
  };
  const { push } = useRouter();
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
          gap=".5em"
          boxShadow="lg"
        >
          <Text fontWeight={"bold"} fontSize="large" align="center">
            Register
          </Text>

          <Flex direction={"column"}>
            <Text>Username</Text>
            <Input
              type="text"
              value={registerField.username.value}
              onChange={(e) =>
                handleFieldOnChange({ key: "username", value: e.target.value })
              }
            />
            <Text fontSize="small" color="red">
              {registerField.username.error}
            </Text>
          </Flex>

          <Flex direction={"column"}>
            <Text>Email</Text>
            <Input
              type="email"
              value={registerField.email.value}
              onChange={(e) =>
                handleFieldOnChange({ key: "email", value: e.target.value })
              }
            />
            <Text fontSize="small" color="red">
              {registerField.email.error}
            </Text>
          </Flex>
          <Flex direction={"column"}>
            <Text>Password</Text>
            <InputGroup>
              <Input
                type={show.password ? "text" : "password"}
                value={registerField.password.value}
                onChange={(e) =>
                  handleFieldOnChange({
                    key: "password",
                    value: e.target.value,
                  })
                }
              />
              <InputRightElement width="4.5rem">
                <Button
                  fontSize={"small"}
                  h="1.75rem"
                  size="sm"
                  colorScheme="black"
                  variant={"transparent"}
                  onClick={() =>
                    setShow((prev) => ({
                      ...prev,
                      password: !prev.password,
                    }))
                  }
                >
                  {show.password ? "hide" : "show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Text fontSize="small" color="red">
              {registerField.password.error}
            </Text>
          </Flex>
          <Flex direction={"column"}>
            <Text>Password Confirmation</Text>
            <InputGroup>
              <Input
                type={show.passConfirmation ? "text" : "password"}
                value={registerField.passwordConfirmation.value}
                onChange={(e) =>
                  handleFieldOnChange({
                    key: "passwordConfirmation",
                    value: e.target.value,
                  })
                }
              />
              <InputRightElement width="4.5rem">
                <Button
                  fontSize={"small"}
                  h="1.75rem"
                  size="sm"
                  colorScheme="black"
                  variant={"transparent"}
                  onClick={() =>
                    setShow((prev) => ({
                      ...prev,
                      passConfirmation: !prev.passConfirmation,
                    }))
                  }
                >
                  {show.passConfirmation ? "hide" : "show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Text fontSize="small" color="red">
              {registerField.passwordConfirmation.error}
            </Text>
          </Flex>

          <Text as={"a"} fontSize="smaller" color={"green"}>
            Forgot Password?
          </Text>
          <Flex direction={"column"} gap=".8em" mt="2em">
            <Button
              colorScheme={"yellow"}
              isDisabled={!isFieldsValid}
              onClick={() => handleClickRegister()}
            >
              Register
            </Button>
            <Text
              as={"a"}
              href="/"
              fontSize={"smaller"}
              align={"center"}
            >{`Already have account?`}</Text>
            <Button
              colorScheme={"blue"}
              onClick={() => push("/")}
              variant="light"
            >
              Login
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default RegisterPage;
