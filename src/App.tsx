import { useState } from 'react';
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router';
import { AnalisePonto, Cadastro, Conta, Inicio, Login, RelogioPonto, TratamentoPonto, TurnosHorarios } from './pages';

import AppLayout from './layout/AppLayout';

import './App.css';

function App() {
    const [logged, setLogged] = useState(false);
    const navigate = useNavigate();

    const loginDashboard = () => {
        setLogged(!logged);
        navigate('/app/home');
    };

    const logout = () => {
        setLogged(!logged);
        navigate('/login');
    };

    const navbarApp = (
        <>
            <Link to={'/app/relogio'}>Relógio de Ponto</Link>
            <Link to={'/app/tratamento'}>Tratamento de Ponto</Link>
            <Link to={'/app/analise'}>Analise de Ponto</Link>
            <Link to={'/app/horarios'}>Turnos e Horarios</Link>
            <Link to={'/app/conta'}>Minha Conta</Link>
        </>
    );

    const userLogged = {
        name: 'Raquel Dias',
        image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png',
    };

    return (
        <Routes>
            <Route
                element={
                    <AppLayout
                        navbar={logged ? navbarApp : undefined}
                        user={logged ? userLogged : undefined}
                        logout={logout}
                    />
                }
            >
                <Route path="login" element={<Login loginDashboard={loginDashboard} />} />
                <Route path="cadastro" element={<Cadastro />} />

                {logged ? (
                    <Route path="app">
                        <Route index path="home" element={<Inicio />} />
                        <Route path="relogio" element={<RelogioPonto />} />
                        <Route path="tratamento" element={<TratamentoPonto />} />
                        <Route path="analise" element={<AnalisePonto />} />
                        <Route path="horarios" element={<TurnosHorarios />} />
                        <Route path="conta" element={<Conta />} />
                    </Route>
                ) : (
                    ''
                )}

                <Route path="*" element={<Navigate to={logged ? '/app/home' : '/login'} replace />} />
            </Route>
        </Routes>
    );
}

export default App;
