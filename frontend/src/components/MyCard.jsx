import { Card, Heading, CardBody, CardFooter, Text, Image, Divider, Stack, ButtonGroup, Button } from '@chakra-ui/react'
import { FaTrashAlt } from 'react-icons/fa'
import { RxUpdate } from 'react-icons/rx'
import { api } from "../services/api"
import { useState } from 'react'

function MyCard(props) {

    const [deletado, setDeletado] = useState(false)
    const [token, setToken] = useState(localStorage.getItem('access-token'));

    async function deletar() {
        try {
            await api.delete(`/${props.entidade}/${props.objeto?._id}`)
            window.location.reload()
            setDeletado(true)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <>
            {!deletado &&
                <Card maxW='sm' maxH={props.maxH} >
                    <CardBody>
                        {props.children}
                    </CardBody>
                    <Divider />

                    {token &&
                        <CardFooter>
                            <ButtonGroup spacing='2'>
                                <Button variant='solid' colorScheme='red' onClick={() => { props.setIsUpdate(props.objeto) }}>
                                    <RxUpdate />
                                    <Text ml={2}>Atualizar</Text>
                                </Button>
                                <Button variant='ghost' colorScheme='red' onClick={deletar}>
                                    <FaTrashAlt />
                                    <Text ml={2}>Remover</Text>
                                </Button>
                            </ButtonGroup>
                        </CardFooter>
                    }

                </Card>
            }
        </>
    )
}

export default MyCard