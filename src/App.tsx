import { useState } from 'react';
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router';
import { AnalisePonto, Cadastro, Conta, Inicio, Login, RelogioPonto, TratamentoPonto, TurnosHorarios } from './pages';
import { List, ThemeIcon } from '@mantine/core';
import { IconClock, IconCalendarTime, IconChartAreaLine, IconCalendarWeek, IconUser } from '@tabler/icons-react';

import { IconChevronRight } from '@tabler/icons-react';
import { Avatar, Group, Text, UnstyledButton } from '@mantine/core';

import AppLayout from './layout/AppLayout';

import './assets/css/App.css';

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

    const closeNavbar = () => {
        document
            .querySelector<HTMLButtonElement>(
                'button.mantine-Burger-root:has(> .mantine-Burger-burger[data-opened="true"])'
            )
            ?.click();
    };

    const navbarApp = (
        <>
            <List spacing={20} size='sm' center>
                <List.Item
                    icon={
                        <ThemeIcon color='blue' size={26} radius='sm'>
                            <IconClock style={{ width: 20, height: 20, color: 'var(--bg-color-default)' }} />
                        </ThemeIcon>
                    }
                >
                    <Link onClick={closeNavbar} to={'/app/relogio'}>
                        Relógio de Ponto
                    </Link>
                </List.Item>
                <List.Item
                    icon={
                        <ThemeIcon color='blue' size={26} radius='sm'>
                            <IconCalendarTime style={{ width: 20, height: 20, color: 'var(--bg-color-default)' }} />
                        </ThemeIcon>
                    }
                >
                    <Link onClick={closeNavbar} to={'/app/tratamento'}>
                        Tratamento de Ponto
                    </Link>
                </List.Item>
                <List.Item
                    icon={
                        <ThemeIcon color='blue' size={26} radius='sm'>
                            <IconChartAreaLine style={{ width: 20, height: 20, color: 'var(--bg-color-default)' }} />
                        </ThemeIcon>
                    }
                >
                    <Link onClick={closeNavbar} to={'/app/analise'}>
                        Analise de Ponto
                    </Link>
                </List.Item>
                <List.Item
                    icon={
                        <ThemeIcon color='blue' size={26} radius='sm'>
                            <IconCalendarWeek style={{ width: 20, height: 20, color: 'var(--bg-color-default)' }} />
                        </ThemeIcon>
                    }
                >
                    <Link onClick={closeNavbar} to={'/app/horarios'}>
                        Turnos e Horarios
                    </Link>
                </List.Item>
                <List.Item
                    icon={
                        <ThemeIcon color='blue' size={26} radius='sm'>
                            <IconUser style={{ width: 20, height: 20, color: 'var(--bg-color-default)' }} />
                        </ThemeIcon>
                    }
                >
                    <Link onClick={closeNavbar} to={'/app/conta'}>
                        Minha Conta
                    </Link>
                </List.Item>
            </List>

            <UnstyledButton className='user-navbar'>
                <Group>
                    <Avatar
                        src='https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png'
                        radius='xl'
                    />

                    <div style={{ flex: 1 }}>
                        <Text>
                            Harriette Spoonlicker
                        </Text>

                        <Text>
                            hspoonlicker@outlook.com
                        </Text>
                    </div>

                    <IconChevronRight size={14} stroke={1.5} />
                </Group>
            </UnstyledButton>
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
                        closeNavbar={closeNavbar}
                    />
                }
            >
                <Route path='login' element={<Login loginDashboard={loginDashboard} />} />
                <Route path='cadastro' element={<Cadastro />} />

                {logged ? (
                    <Route path='app'>
                        <Route index path='home' element={<Inicio />} />
                        <Route path='relogio' element={<RelogioPonto />} />
                        <Route path='tratamento' element={<TratamentoPonto />} />
                        <Route path='analise' element={<AnalisePonto />} />
                        <Route path='horarios' element={<TurnosHorarios />} />
                        <Route path='conta' element={<Conta />} />
                    </Route>
                ) : (
                    ''
                )}

                <Route path='*' element={<Navigate to={logged ? '/app/home' : '/login'} replace />} />
            </Route>
        </Routes>
    );
}

export default App;
