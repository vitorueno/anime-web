import { Card, Heading, CardBody, CardFooter, Text, Image, Divider, Stack, ButtonGroup, Button } from '@chakra-ui/react'
import { FaTrashAlt } from 'react-icons/fa'
import { RxUpdate } from 'react-icons/rx'

function MyCard(props) {
    return (
        <Card maxW='sm' maxH={props.maxH} >
            <CardBody>
                {props.children}


            </CardBody>
            <Divider />
            <CardFooter>
                <ButtonGroup spacing='2'>
                    <Button variant='solid' colorScheme='red'>
                        <RxUpdate />
                        <Text ml={2}>Atualizar</Text>
                    </Button>
                    <Button variant='ghost' colorScheme='red'>
                        <FaTrashAlt />
                        <Text ml={2}>Remover</Text>
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    )
}

export default MyCard