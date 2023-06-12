import { ReactNode } from 'react';
import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    Image
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';

import ColorModeToggle from './ColorMode';

import logo from '../assets/anime.png';
import { useState } from 'react';

import { FaUserCircle } from 'react-icons/fa'

// import { Link } from 'react-router-dom';

// const Links = ['Anime', 'Gêneros', 'Estúdios', 'Listas'];

// const NavLink = ({ children, linkTo }) => (
//     <Link
//         px={2}
//         py={1}
//         rounded={'md'}
//         _hover={{
//             textDecoration: 'none',
//             bg: useColorModeValue('gray.200', 'gray.700'),
//         }}
//         href={linkTo} >
//         {children}
//     </Link >


// );

export default function withAction() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [token, setToken] = useState(localStorage.getItem('access-token'));

    function logOut() {
        localStorage.removeItem("access-token")
        localStorage.removeItem("refresh-token")
        setToken('')
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
                            <Link px={2} py={1} rounded={'md'} _hover={{ textDecoration: 'none', bg: useColorModeValue('gray.200', 'gray.700'), }} href='anime'>
                                Anime
                            </Link >
                            <Link px={2} py={1} rounded={'md'} _hover={{ textDecoration: 'none', bg: useColorModeValue('gray.200', 'gray.700'), }} href='genero'>
                                Gêneros
                            </Link >
                            <Link px={2} py={1} rounded={'md'} _hover={{ textDecoration: 'none', bg: useColorModeValue('gray.200', 'gray.700'), }} href='estudio'>
                                Estudios
                            </Link >
                            <Link px={2} py={1} rounded={'md'} _hover={{ textDecoration: 'none', bg: useColorModeValue('gray.200', 'gray.700'), }} href='listas'>
                                Listas
                            </Link >
                            {/* {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))} */}
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
                        {token ? <>

                            <Button
                                variant={'solid'}
                                colorScheme={'red'}
                                size={'sm'}
                                mr={4}
                                leftIcon={<AddIcon />}>
                                Action
                            </Button>

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
                                    {/* <MenuItem>Link 1</MenuItem>
                                    <MenuItem>Link 2</MenuItem> 
                                    <MenuDivider /> */}
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
                                    bg={'pink.400'}
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
                            <Link px={2} py={1} rounded={'md'} _hover={{ textDecoration: 'none', bg: useColorModeValue('gray.200', 'gray.700'), }} href='anime'>
                                Anime
                            </Link >
                            <Link px={2} py={1} rounded={'md'} _hover={{ textDecoration: 'none', bg: useColorModeValue('gray.200', 'gray.700'), }} href='genero'>
                                Gêneros
                            </Link >
                            <Link px={2} py={1} rounded={'md'} _hover={{ textDecoration: 'none', bg: useColorModeValue('gray.200', 'gray.700'), }} href='estudio'>
                                Estudios
                            </Link >
                            <Link px={2} py={1} rounded={'md'} _hover={{ textDecoration: 'none', bg: useColorModeValue('gray.200', 'gray.700'), }} href='listas'>
                                Listas
                            </Link >
                            {/* {Links.map((link) => (
                                <NavLink key={link} linkTo='genero'>{link}</NavLink>
                            ))} */}
                        </Stack>
                    </Box>
                ) : null}
            </Box>

            {/* <Box p={4}>Main Content Here</Box> */}
        </>
    );
}