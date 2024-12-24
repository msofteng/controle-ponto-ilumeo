import { Avatar, Group, List, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCalendarTime, IconCalendarWeek, IconChartAreaLine, IconClock, IconUser } from '@tabler/icons-react';
import { useState } from 'react';
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router';
import { AnalisePonto, Cadastro, Conta, Inicio, Login, RelogioPonto, TratamentoPonto, TurnosHorarios } from './pages';
import { Usuario } from './shared/models/interfaces/controle-ponto.entities';

import options from './config/notification';
import AppLayout from './layout/AppLayout';
import service from './shared/services/service';

import './assets/css/App.css';

function App() {
    const [logged, setLogged] = useState(false);
    const [userLogged, setUserLogged] = useState<Usuario | undefined>();
    const navigate = useNavigate();

    const loginDashboard = (user: Usuario) => {
        setLogged(!logged);
        setUserLogged(user);

        setTimeout(closeNavbar, 1000);
        navigate('/app/home');
    };

    const finalizaCadastro = (user: Usuario) => {
        setLogged(!logged);
        setUserLogged(user);

        setTimeout(closeNavbar, 1000);
        navigate('/app/home');
    };

    const changeUser = (user: Usuario) => {
        notifications.show({ message: 'As suas informações foram atualizadas com sucesso!', ...options });
        service.updateUser(user).then((res) => setUserLogged(res.data));
    };

    const logout = () => {
        setLogged(!logged);
        navigate('/login');
    };

    const removeAccount = () => {
        service.removeUser(Number(userLogged?.id));
        setLogged(!logged);

        notifications.show({ message: 'A sua conta foi excluída com sucesso!', onClose: () => navigate('/login'), ...options });
    };

    const closeNavbar = () => {
        document.querySelector<HTMLButtonElement>('button.mantine-Burger-root:has(> .mantine-Burger-burger[data-opened="true"])')?.click();
    };

    const navbarApp = (
        <>
            <List className='navbar-links' spacing={20} size='sm' center>
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

            {userLogged ? (
                <UnstyledButton className='user-navbar'>
                    <Group>
                        <Avatar src={userLogged.image || null} radius='xl' className='shadow-image' />

                        <div style={{ flex: 1 }}>
                            <Text>{userLogged.nome}</Text>

                            <Text>@{userLogged.usuario}</Text>
                        </div>
                    </Group>
                </UnstyledButton>
            ) : (
                ''
            )}
        </>
    );

    return (
        <Routes>
            <Route
                element={
                    <AppLayout
                        navbar={logged ? navbarApp : undefined}
                        user={logged ? userLogged : undefined}
                        logout={logout}
                        removeAccount={removeAccount}
                        closeNavbar={closeNavbar}
                    />
                }
            >
                <Route path='login' element={<Login toCadastro={() => navigate('/cadastro')} loginDashboard={loginDashboard} />} />
                <Route path='cadastro' element={<Cadastro toLogin={() => navigate('/login')} executaLogin={finalizaCadastro} />} />

                {logged ? (
                    <Route path='app'>
                        <Route index path='home' element={<Inicio />} />
                        <Route path='relogio' element={<RelogioPonto user={userLogged} />} />
                        <Route path='tratamento' element={<TratamentoPonto user={userLogged} />} />
                        <Route path='analise' element={<AnalisePonto user={userLogged} />} />
                        <Route path='horarios' element={<TurnosHorarios />} />
                        <Route path='conta' element={<Conta user={userLogged} changeUser={changeUser} />} />
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
