"use client";

import { LoginRegisterSideContent } from "@/components/LoginRegisterSideContent";
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

import { useState } from "react";

const RegisterPage = () => {
  const [show, setShow] = useState({
    password: false,
    passConfirmation: false,
  });
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
            <Input type="text" />
          </Flex>

          <Flex direction={"column"}>
            <Text>Email</Text>
            <Input type="email" />
          </Flex>
          <Flex direction={"column"}>
            <Text>Password</Text>
            <InputGroup>
              <Input type={show.password ? "text" : "password"} />
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
                  show
                </Button>
              </InputRightElement>
            </InputGroup>
          </Flex>
          <Flex direction={"column"}>
            <Text>Password Confirmation</Text>
            <InputGroup>
              <Input type={show.passConfirmation ? "text" : "password"} />
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
                  show
                </Button>
              </InputRightElement>
            </InputGroup>
          </Flex>

          <Text as={"a"} fontSize="smaller" color={"green"}>
            Forgot Password?
          </Text>
          <Flex direction={"column"} gap=".8em" mt="2em">
            <Button colorScheme={"yellow"}>Register</Button>
            <Text
              as={"a"}
              href="/"
              fontSize={"smaller"}
              align={"center"}
            >{`Don't have any account?`}</Text>
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
