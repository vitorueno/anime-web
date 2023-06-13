import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalCloseButton,
    ModalBody,
    Button
} from '@chakra-ui/react'

export default function MyModal(props) {
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{props.title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {props.children}
                </ModalBody>
                <ModalFooter display='flex' justifyContent='space-between'>
                    <Button variant='ghost' mr={3} onClick={props.onClose}>
                        Fechar
                    </Button>
                    <Button onClick={props.onSubmit} colorScheme='red'>{props.action}</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}