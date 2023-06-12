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


export default function Estudio() {
    const [limite, setLimite] = useState(10);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [estudios, setEstudios] = useState([])

    const { currentPage, setCurrentPage } = usePaginator({
        initialState: { currentPage: 1 }
    });


    useEffect(() => {
        async function query() {
            const { results, total } = (await api.get(`/studio?page=${currentPage}&limit=${limite}`)).data
            setTotalPaginas(Math.ceil(total / limite))
            setEstudios(results)
        }
        query()
    }, [currentPage, limite])




    return (
        <>
            <SimpleGrid spacing={10} padding={10} columns={5} minH='90vh'>
                {
                    estudios.map((estudio) => {
                        return <MyCard key={estudio.id} estudio={estudio} >
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

