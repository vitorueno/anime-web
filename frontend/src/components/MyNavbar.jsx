import { useState } from 'react';

import {
    NavLink,
    useNavigate
} from 'react-router-dom'

import {
    Box,
    Flex,
    HStack,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useDisclosure,
    useColorModeValue,
    Stack,
    Image,
} from '@chakra-ui/react';

import ColorModeToggle from './ColorMode';

import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { FaUserCircle } from 'react-icons/fa'
import logo from '../assets/anime.png';



export default function withAction() {
    const navigate = useNavigate();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [token, setToken] = useState(localStorage.getItem('access-token'));

    function logOut() {
        localStorage.removeItem("access-token")
        localStorage.removeItem("refresh-token")
        setToken('')
        window.location.reload()
    }


    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box>
                            <Image src={logo} boxSize='130px' objectFit='cover' borderRadius='full' />

                        </Box>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}>
                            <NavLink to='/anime'>
                                <Box px={2} py={1} rounded={'md'} _hover={{ textDecoration: 'none', bg: useColorModeValue('gray.200', 'gray.700'), }}>
                                    Anime
                                </Box>
                            </NavLink >
                            <NavLink to='/genero'>
                                <Box px={2} py={1} rounded={'md'} _hover={{ textDecoration: 'none', bg: useColorModeValue('gray.200', 'gray.700'), }}>
                                    Gêneros
                                </Box>
                            </NavLink >
                            <NavLink to='/estudio'>
                                <Box px={2} py={1} rounded={'md'} _hover={{ textDecoration: 'none', bg: useColorModeValue('gray.200', 'gray.700'), }}>
                                    Estudios
                                </Box>
                            </NavLink >
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
                        {token ? <>



                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={'full'}
                                    variant={'link'}
                                    cursor={'pointer'}
                                    minW={0}
                                    mr={5}
                                >
                                    <FaUserCircle></FaUserCircle>

                                </MenuButton>
                                <MenuList>

                                    <MenuItem onClick={logOut}>LogOut</MenuItem>
                                </MenuList>
                            </Menu>

                        </>
                            :
                            <>
                                <Button
                                    mr={4}
                                    as={'a'}
                                    fontSize={'sm'}
                                    fontWeight={400}
                                    variant={'link'}
                                    href={'login'}>
                                    Sign In
                                </Button>
                                <Button
                                    mr={4}
                                    as={'a'}
                                    display={{ base: 'none', md: 'inline-flex' }}
                                    fontSize={'sm'}
                                    fontWeight={600}
                                    color={'white'}
                                    colorScheme='red'
                                    href={'cadastrar'}
                                    _hover={{
                                        bg: 'pink.300',
                                    }}>
                                    Sign Up
                                </Button>
                            </>
                        }

                        <ColorModeToggle ></ColorModeToggle>


                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            <NavLink to='/anime'>
                                <Box px={2} py={1} rounded={'md'} _hover={{ textDecoration: 'none', bg: useColorModeValue('gray.200', 'gray.700'), }}>
                                    Anime
                                </Box>
                            </NavLink >
                            <NavLink to='/genero'>
                                <Box px={2} py={1} rounded={'md'} _hover={{ textDecoration: 'none', bg: useColorModeValue('gray.200', 'gray.700'), }}>
                                    Gêneros
                                </Box>
                            </NavLink >
                            <NavLink to='/estudio'>
                                <Box px={2} py={1} rounded={'md'} _hover={{ textDecoration: 'none', bg: useColorModeValue('gray.200', 'gray.700'), }}>
                                    Estudios
                                </Box>
                            </NavLink >
                        </Stack>
                    </Box>
                ) : null}
            </Box>


        </>
    );
}