import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

export const ModalComponent = ({
  description,
  title,
  isOpen,
  onClose,
  proceed,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent w={"max-content"} px="1em" py="1.5em" borderRadius={"20px"}>
        <Flex
          justifyContent={"center"}
          direction={"column"}
          alignItems={"center"}
        >
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{description}</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme={"yellow"}
              variant={"light"}
              onClick={() => proceed()}
            >
              Continue
            </Button>
          </ModalFooter>
        </Flex>
      </ModalContent>
    </Modal>
  );
};
