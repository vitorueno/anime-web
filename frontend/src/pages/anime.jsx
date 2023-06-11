import MyCard from '../components/MyCard';
import { SimpleGrid } from '@chakra-ui/react'
import { api } from "../services/api"

export default function anime() {
    // api.post("/user/", { name: "abc", email: "abc@abc.com", password: "123" })


    return (
        <SimpleGrid spacing={10} padding={10} columns={5}>
            <MyCard />
            <MyCard />
            <MyCard />
            <MyCard />
            <MyCard />
            <MyCard />
            <MyCard />
            <MyCard />
            <MyCard />
            <MyCard />
            <MyCard />
            <MyCard />
        </SimpleGrid>
    );
}

