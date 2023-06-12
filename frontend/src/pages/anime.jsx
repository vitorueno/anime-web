import MyCard from '../components/MyCard';
import { SimpleGrid } from '@chakra-ui/react'
import { api } from "../services/api"
import { useEffect, useState } from 'react';
import { Card, Heading, CardBody, CardFooter, Text, Image, Divider, Stack, ButtonGroup, Button } from '@chakra-ui/react'
import {
    Paginator,
    Container,
    Previous,
    usePaginator,
    Next,
    PageGroup
} from "chakra-paginator";
import convertDate from '../services/convertDate';

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




    return (
        <>
            <SimpleGrid spacing={10} padding={10} columns={5}>
                {
                    animes.map((anime) => {
                        return <MyCard key={anime.id} anime={anime}>
                            <Image
                                src={anime.image}
                                borderRadius='lg'
                            />
                            <Stack mt='6' spacing='3'>
                                <Heading size='md' color="red.400">{anime.title}</Heading>
                                <Text>{anime.synopsis}</Text>
                                <Text>Episódios: {anime.numEpisodes}</Text>
                                <Text>Gêneros: {anime.genres.map(genero => genero.title)}</Text>
                                <Text>Estúdio: {anime.studio.name}</Text>
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

