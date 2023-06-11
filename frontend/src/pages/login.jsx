import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Alert,
    AlertIcon,
    Link
} from '@chakra-ui/react';

import { useState } from 'react';
import auth from '../services/auth'


export default function SimpleCard() {

    const [nome, setNome] = useState()
    const [senha, setSenha] = useState()
    const [showAlert, setShowAlert] = useState(false)
    const [alertContent, setAlertContent] = useState("")

    async function login() {
        try {
            if (!nome || !senha) {
                setAlertContent("Por favor, preencha os dois campos")
                setShowAlert(true)
            } else {
                await auth.signIn(nome, senha)
                window.location.replace("/")
            }
        } catch (error) {
            setAlertContent("Usuário ou senha inválido")
            setShowAlert(true)
        }

    }

    return (
        <Flex
            minH={'90vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={6} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Login</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        Para aproveitar todos os recursos ✌️
                    </Text>
                </Stack>

                <Stack align='center'>
                    {
                        showAlert &&
                        <Alert status='error'>
                            <AlertIcon />
                            {alertContent}
                        </Alert>
                    }
                </Stack>

                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="email" isRequired>
                            <FormLabel>Usuario</FormLabel>
                            <Input value={nome} onChange={(e) => { setNome(e.target.value) }} type="text" />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Senha</FormLabel>
                            <Input value={senha} onChange={(e) => { setSenha(e.target.value) }} type="password" />
                        </FormControl>
                        <Stack spacing={10}>
                            <Button
                                onClick={login}
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Sign in
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Não está cadastrado? <Link color={'blue.400'} href='/cadastrar'>Cadastrar</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}