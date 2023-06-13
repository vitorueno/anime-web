import MyCard from '../components/MyCard';
import { SimpleGrid } from '@chakra-ui/react'
import { api } from "../services/api"
import { useEffect, useState } from 'react';
import {
    Heading,
    Text,
    Stack,
    Button,
    useDisclosure,
    Flex,
    Alert,
    AlertIcon,
    FormControl,
    Input,
    FormLabel
} from '@chakra-ui/react'
import {
    Paginator,
    Container,
    Previous,
    usePaginator,
    Next,
    PageGroup
} from "chakra-paginator";
import convertDate from '../services/convertDate';
import convertDateToShow from '../services/convertDatetoShow';

import { IoMdAddCircle } from 'react-icons/io';

import MyModal from '../components/Modal';


export default function Estudio() {
    const [limite, setLimite] = useState(10);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [estudios, setEstudios] = useState([])
    const [token, setToken] = useState(localStorage.getItem('access-token'));
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [foundationDate, setFoundationDate] = useState("");
    const [isUpdate, setIsUpdate] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertContent, setAlertContent] = useState("");

    const { currentPage, setCurrentPage } = usePaginator({
        initialState: { currentPage: 1 }
    });
    const { isOpen, onOpen, onClose } = useDisclosure();


    useEffect(() => {
        if (isUpdate) {
            setName(isUpdate.name)
            setDescription(isUpdate.description)
            setFoundationDate(convertDateToShow(isUpdate.foundationDate))

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
            const { results, total } = (await api.get(`/studio?page=${currentPage}&limit=${limite}`)).data
            setTotalPaginas(Math.ceil(total / limite))
            setEstudios(results)
        }
        query()
    }, [currentPage, limite])

    async function enviarDados() {
        try {

            if (!name) {
                showAlert(true);
                setAlertContent("Preencha o nome");
            }

            if (isUpdate) {
                await api.put(`/studio/${isUpdate._id}`, {
                    name,
                    description,
                    foundationDate
                })
            } else {
                await api.post("/studio/", {
                    name,
                    description,
                    foundationDate
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
                <Heading ml={14}>Estúdios</Heading>
                {
                    token &&
                    <Button mr={10} colorScheme='red' onClick={onOpen}><IoMdAddCircle /> <Text ml={2}>Adicionar</Text></Button>
                }
            </Flex>

            <MyModal title={'Cadastrar Anime'} action={'cadastrar'} isOpen={isOpen} onClose={onClose} onSubmit={enviarDados}>
                <Stack align='center'>
                    {
                        showAlert &&
                        <Alert status='error'>
                            <AlertIcon />
                            {alertContent}
                        </Alert>
                    }
                </Stack>
                <FormControl id="name" isRequired>
                    <FormLabel>Nome</FormLabel>
                    <Input value={name} onChange={(e) => { setName(e.target.value) }} type="text" />
                </FormControl>
                <FormControl id="description">
                    <FormLabel>Descrição</FormLabel>
                    <Input value={description} onChange={(e) => { setDescription(e.target.value) }} type="text" />
                </FormControl>
                <FormControl id="dataFundacao" >
                    <FormLabel>Data de Fundação</FormLabel>
                    <Input value={foundationDate} onChange={(e) => { setFoundationDate(e.target.value) }} type="date" />
                </FormControl>
            </MyModal>


            <SimpleGrid spacing={10} padding={10} columns={5} minH='90vh'>
                {
                    estudios.map((estudio, i) => {
                        return <MyCard key={i} objeto={estudio} entidade='studio' setIsUpdate={setIsUpdate}>
                            <Stack mt='6' spacing='3'>
                                <Heading size='md' color="red.400">{estudio.name}</Heading>
                                <Text>{estudio.description}</Text>
                                <Text>Fundado em: {convertDate(estudio.foundationDate)}</Text>
                            </Stack>
                        </MyCard>
                    })
                }

            </SimpleGrid>
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

