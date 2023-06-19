import MyCard from '../components/MyCard';
import { SimpleGrid } from '@chakra-ui/react'
import { api } from "../services/api"
import { useEffect, useState } from 'react';
import {
    Heading,
    Text,
    Button,
    Stack,
    Flex,
    useDisclosure,
    FormControl,
    Input,
    FormLabel,
    Alert,
    AlertIcon,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    Box,
    AccordionIcon
} from '@chakra-ui/react'

import {
    Paginator,
    Container,
    Previous,
    usePaginator,
    Next,
    PageGroup
} from "chakra-paginator";

import { IoMdAddCircle } from 'react-icons/io'
import MyModal from '../components/Modal';


export default function Genero() {
    const [limite, setLimite] = useState(10);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [generos, setGeneros] = useState([])
    const [token, setToken] = useState(localStorage.getItem('access-token'));
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isUpdate, setIsUpdate] = useState(false);

    const [showAlert, setShowAlert] = useState(false);
    const [alertContent, setAlertContent] = useState("");

    const { currentPage, setCurrentPage } = usePaginator({
        initialState: { currentPage: 1 }
    });
    const { isOpen, onOpen, onClose } = useDisclosure();


    useEffect(() => {
        if (isUpdate) {
            setTitle(isUpdate.title)
            setDescription(isUpdate.description)

            onOpen()
        }
    }, [isUpdate])

    useEffect(() => {
        if (!isOpen) {
            setIsUpdate(false)
        }
    }, [isOpen])

    useEffect(() => {
        async function query() {
            const { results, total } = (await api.get(`/genre?page=${currentPage}&limit=${limite}`)).data
            setTotalPaginas(Math.ceil(total / limite))
            setGeneros(results)
        }
        query()
    }, [currentPage, limite])


    async function enviarDados() {
        try {

            if (!title) {
                showAlert(true);
                setAlertContent("Preencha o título");
            }

            if (isUpdate) {
                await api.put(`/genre/${isUpdate._id}`, {
                    title,
                    description
                })
            } else {
                await api.post("/genre/", {
                    title,
                    description
                })
            }


            window.location.reload()

        } catch (error) {
            console.log(error)
        }
    }



    return (
        <>
            <Flex justifyContent='space-between' mt={10}>
                <Heading ml={14}>Gêneros</Heading>
                {
                    token &&
                    <Button mr={10} colorScheme='red' onClick={onOpen}><IoMdAddCircle /> <Text ml={2}>Adicionar</Text></Button>
                }
            </Flex>
            <SimpleGrid spacing={10} padding={10} columns={5} minH='90vh'>
                {
                    generos.map((genero, i) => {
                        return <MyCard key={i} objeto={genero} entidade='genre' setIsUpdate={setIsUpdate}>
                            <Stack mt='6' spacing='3'>
                                <Heading size='md' color="red.400">{genero.title}</Heading>
                                {genero.description &&
                                    <Accordion allowMultiple>
                                        <AccordionItem>
                                            <AccordionButton>
                                                <Box as="span" flex='1' textAlign='left'>
                                                    Descrição
                                                </Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                            <AccordionPanel pb={4}>
                                                <Text>{genero.description}</Text>
                                            </AccordionPanel>
                                        </AccordionItem>
                                    </Accordion>
                                }
                            </Stack>
                        </MyCard>
                    })
                }

            </SimpleGrid>

            <MyModal title={'Gênero'} action={'cadastrar'} isOpen={isOpen} onClose={onClose} onSubmit={enviarDados}>
                <Stack align='center'>
                    {
                        showAlert &&
                        <Alert status='error'>
                            <AlertIcon />
                            {alertContent}
                        </Alert>
                    }
                </Stack>
                <FormControl id="title" isRequired>
                    <FormLabel>Título</FormLabel>
                    <Input value={title} onChange={(e) => { setTitle(e.target.value) }} type="text" />
                </FormControl>
                <FormControl id="description">
                    <FormLabel>Descrição</FormLabel>
                    <Input value={description} onChange={(e) => { setDescription(e.target.value) }} type="text" />
                </FormControl>
            </MyModal>

            <Paginator
                isDisabled={false}
                // activeStyles={activeStyles}
                innerLimit={limite}
                currentPage={currentPage}
                outerLimit={limite}
                // normalStyles={normalStyles}
                // separatorStyles={separatorStyles}
                pagesQuantity={totalPaginas}
                onPageChange={setCurrentPage}
            >
                <Container align="center" justify="space-between" w="full" p={4}>
                    <Previous>
                        Previous
                    </Previous>
                    <PageGroup direction="row" align="center" />
                    <Next>
                        Next
                    </Next>
                </Container>
            </Paginator>
        </>
    );
}

