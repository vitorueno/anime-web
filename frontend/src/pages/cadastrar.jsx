import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    Alert,
    AlertIcon
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { api } from '../services/api'

export default function SignupCard() {
    const [showPassword, setShowPassword] = useState(false);
    const [nome, setNome] = useState();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [showAlert, setShowAlert] = useState(false);
    const [alertContent, setAlertContent] = useState("");

    async function signUp() {
        try {
            if (!nome || !senha || !email) {
                setAlertContent("Por favor, preencha os três campos")
                setShowAlert(true)
            } else {
                await api.post("/user", { name: nome, password: senha, email })
                window.location.replace("/login")
            }
        } catch (error) {
            setAlertContent("Nome de usuario indisponível.")
            setShowAlert(true)
        }

    }

    return (
        <Flex
            minH={'90vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Cadastrar
                    </Heading>
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

                        <FormControl id="firstName" isRequired>
                            <FormLabel>Nome</FormLabel>
                            <Input value={nome} onChange={(e) => { setNome(e.target.value) }} type="text" />
                        </FormControl>

                        <FormControl id="email" isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Senha</FormLabel>
                            <InputGroup>
                                <Input value={senha} onChange={(e) => { setSenha(e.target.value) }} type={showPassword ? 'text' : 'password'} />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() =>
                                            setShowPassword((showPassword) => !showPassword)
                                        }>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                onClick={signUp}
                                loadingText="Submitting"
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Sign up
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Já é um usuário? <Link color={'blue.400'} href='/login'>Login</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}