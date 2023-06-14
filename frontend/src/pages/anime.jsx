import MyCard from '../components/MyCard';
import { api } from "../services/api"
import { useEffect, useState } from 'react';
import {
    Heading,
    Text,
    Image,
    Stack,
    Box,
    Button,
    Flex,
    useDisclosure,
    Input,
    FormControl,
    FormLabel,
    Textarea,
    NumberInputField,
    NumberInput,
    Alert,
    AlertIcon,
    Select,
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    SimpleGrid,
    Center
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
import { IoMdAddCircle } from 'react-icons/io'


import MyModal from '../components/Modal';

export default function Anime() {

    const [limite, setLimite] = useState(10);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [animes, setAnimes] = useState([])


    const { currentPage, setCurrentPage } = usePaginator({
        initialState: { currentPage: 1 }
    });


    useEffect(() => {
        async function query() {
            const { results, total } = (await api.get(`/anime?page=${currentPage}&limit=${limite}`)).data
            setTotalPaginas(Math.ceil(total / limite))
            setAnimes(results)
        }
        query()
    }, [currentPage, limite])


    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isUpdate, setIsUpdate] = useState(false);
    const [numEpisodios, setNumEpisodios] = useState(0);
    const [title, setTitle] = useState("");
    const [synopsis, setSynopsis] = useState("");
    const [origem, setOrigem] = useState("");
    const [demographic, setDemographic] = useState("");
    const [imagem, setImagem] = useState("");
    const [dataLancamento, setDataLancamento] = useState("");
    const [dataFim, setDataFim] = useState("");

    const [showAlert, setShowAlert] = useState(false);
    const [alertContent, setAlertContent] = useState("");
    const [listaEstudios, setListaEstudios] = useState([]);
    const [listaGeneros, setListaGeneros] = useState([]);
    const [estudio, setEstudio] = useState("");
    const [generos, setGeneros] = useState("");

    const [token, setToken] = useState(localStorage.getItem('access-token'));

    useEffect(() => {
        if (isUpdate) {
            setDataFim(convertDateToShow(isUpdate.endDate, true))
            setDataLancamento(convertDateToShow(isUpdate.releaseDate, true))
            setImagem(isUpdate.image)
            setDemographic(isUpdate.demographic)
            setOrigem(isUpdate.source)
            setSynopsis(isUpdate.synopsis)
            setTitle(isUpdate.title)
            setNumEpisodios(isUpdate.numEpisodes)
            setEstudio(isUpdate.studio?._id)
            setGeneros(isUpdate.genres[0]?._id)
            onOpen()
        }
    }, [isUpdate])

    useEffect(() => {
        if (!isOpen) {
            setIsUpdate(false)
        }
    }, [isOpen])

    async function enviarDados() {
        try {

            if (!title && numEpisodios) {
                showAlert(true);
                setAlertContent("Preencha o título");
            } else if (!numEpisodios && title) {
                showAlert(true);
                setAlertContent("Preencha o número de episódios");
            } else if (!numEpisodios && !title) {
                showAlert(true);
                setAlertContent("Preencha o título e o número de episódios");
            }
            if (isUpdate) {
                await api.put(`/anime/${isUpdate._id}`, {
                    title,
                    synopsis,
                    studio: estudio,
                    genres: [generos],
                    numEpisodes: numEpisodios,
                    releaseDate: dataLancamento,
                    endDate: dataFim,
                    source: origem,
                    demographic,
                    image: imagem
                })
            } else {
                await api.post("/anime/", {
                    title,
                    synopsis,
                    studio: estudio,
                    genres: [generos],
                    numEpisodes: numEpisodios,
                    releaseDate: dataLancamento,
                    endDate: dataFim,
                    source: origem,
                    demographic,
                    image: imagem
                })
            }


            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        async function buscaEstudios() {
            const query = await (await api.get("/studio?limit=100000")).data.results
            setListaEstudios(query)
        }
        async function buscaGeneros() {
            const query = await (await api.get("/genre?limit=100000")).data.results
            setListaGeneros(query)
        }
        buscaGeneros()
        buscaEstudios()
    }, [])

    return (
        <>

            <Flex justifyContent='space-between' mt={10}>
                <Heading ml={14}>Animes</Heading>
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
                <FormControl id="title" isRequired>
                    <FormLabel>Título</FormLabel>
                    <Input value={title} onChange={(e) => { setTitle(e.target.value) }} type="text" />
                </FormControl>
                <FormControl id="synopsis">
                    <FormLabel>Sinopse</FormLabel>
                    <Textarea value={synopsis} onChange={(e) => { setSynopsis(e.target.value) }} />
                </FormControl>
                <FormControl id="numEp" isRequired>
                    <FormLabel>Número Episódios</FormLabel>
                    <NumberInput min={0} defaultValue={0} value={numEpisodios} onChange={(e) => { setNumEpisodios(e) }} >
                        <NumberInputField />
                    </NumberInput>
                </FormControl>
                <FormControl id="origem">
                    <FormLabel>Origem</FormLabel>
                    <Input value={origem} onChange={(e) => { setOrigem(e.target.value) }} type="text" />
                </FormControl>
                <FormControl id="demographic" >
                    <FormLabel>Público Alvo</FormLabel>
                    <Input value={demographic} onChange={(e) => { setDemographic(e.target.value) }} type="text" />
                </FormControl>
                <FormControl id="image" >
                    <FormLabel>Link da Imagem</FormLabel>
                    <Input value={imagem} onChange={(e) => { setImagem(e.target.value) }} type="text" />
                </FormControl>
                <FormControl id="dataLancamento" >
                    <FormLabel>Data Lançamento</FormLabel>
                    <Input value={dataLancamento} onChange={(e) => { setDataLancamento(e.target.value) }} type="date" />
                </FormControl>
                <FormControl id="dataFim" >
                    <FormLabel>Data Fim</FormLabel>
                    <Input value={dataFim} onChange={(e) => { setDataFim(e.target.value) }} type="date" />
                </FormControl>
                <FormControl id="Estudio">
                    <FormLabel>Estúdio</FormLabel>
                    <Select
                        value={estudio}
                        onChange={e => { setEstudio(e.target.value) }}
                        placeholder="Selecione um Estúdio"
                    >
                        {listaEstudios.map((studio, i) => {
                            return (<option key={i} value={studio._id}>{studio.name}</option>)
                        })}

                    </Select>
                </FormControl>
                <FormControl id="Genero">
                    <FormLabel>Gêneros</FormLabel>


                    <Select
                        value={generos}
                        onChange={e => { setGeneros(e.target.value) }}
                        placeholder="Selecione um Gênero"
                    >
                        {
                            listaGeneros.map((item, i) => { return (<option key={i} value={item._id}>{item.title}</option>) })
                        }

                    </Select>


                </FormControl>

            </MyModal>


            <SimpleGrid spacing={10} padding={10} columns={5}>
                {
                    animes.map((anime, i) => {
                        return <MyCard key={i} objeto={anime} entidade="anime" setIsUpdate={setIsUpdate}>
                            <Center>
                                <Image src={anime.image} borderRadius='lg' />
                            </Center>

                            <Stack mt='6' spacing='3'>
                                <Heading size='md' color="red.400">{anime.title}</Heading>
                                {anime.synopsis &&
                                    <Accordion allowMultiple>
                                        <AccordionItem>
                                            <AccordionButton>
                                                <Box as="span" flex='1' textAlign='left'>
                                                    Sinopse
                                                </Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                            <AccordionPanel pb={4}>
                                                <Text>{anime.synopsis}</Text>
                                            </AccordionPanel>
                                        </AccordionItem>
                                    </Accordion>
                                }
                                <Text>Episódios: {anime.numEpisodes}</Text>
                                <Text>Gêneros: {anime.genres.map(genero => genero.title)}</Text>
                                <Text>Estúdio: {anime.studio?.name}</Text>
                                <Text>Tipo: {anime.demographic}</Text>
                                <Text>Origem: {anime.source}</Text>
                                <Text>Data Lançamento: {convertDate(anime.releaseDate)}</Text>
                                <Text>Data Fim: {convertDate(anime.endDate)}</Text>
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

