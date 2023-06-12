import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyNavbar from '../components/MyNavbar'
import Footer from '../components/Footer'
import Anime from '../pages/anime';
import Genero from '../pages/genero';
import Estudio from '../pages/estudio'
import Listas from '../pages/listas';
import Login from '../pages/login'
import Cadastrar from '../pages/cadastrar'

export default function MyRoutes() {
    return (
        <>
            <BrowserRouter>
                <MyNavbar />
                <Routes>
                    <Route exact path="/" Component={Anime} />
                    <Route exact path="/anime" Component={Anime} />
                    <Route path="/genero" Component={Genero} />
                    <Route path="/estudio" Component={Estudio} />
                    <Route path="/listas" Component={Listas} />
                    <Route path="/login" Component={Login} />
                    <Route path="/cadastrar" Component={Cadastrar} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    )
}