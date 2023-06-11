import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyNavbar from '../components/MyNavbar'
import Footer from '../components/Footer'
import anime from '../pages/anime';
import genero from '../pages/genero';
import estudio from '../pages/estudio'
import listas from '../pages/listas';
import login from '../pages/login'
import cadastrar from '../pages/cadastrar'

export default function MyRoutes() {
    return (
        <>
            <BrowserRouter>
                <MyNavbar />
                <Routes>
                    <Route exact path="/" Component={anime} />
                    <Route exact path="/anime" Component={anime} />
                    <Route path="/genero" Component={genero} />
                    <Route path="/estudio" Component={estudio} />
                    <Route path="/listas" Component={listas} />
                    <Route path="/login" Component={login} />
                    <Route path="/cadastrar" Component={cadastrar} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    )
}