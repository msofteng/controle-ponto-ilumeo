import {
    AppShell,
    Avatar,
    Burger,
    createTheme,
    Group,
    MantineProvider,
    Menu,
    Skeleton,
    Text,
    UnstyledButton,
} from '@mantine/core';
import '@mantine/core/styles.css';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';
import {
    IconChevronDown,
    IconLogout,
    IconSettings,
    IconSwitchHorizontal,
    IconTrash,
    IconUser,
} from '@tabler/icons-react';
import cx from 'clsx';
import { ReactElement, useState } from 'react';
import {
    BrowserRouter,
    Link,
    Navigate,
    Outlet,
    Route,
    Routes,
    useNavigate,
} from 'react-router';
import './App.css';
import classes from './AppShell.module.css';

export function AppLayout(props: {
    navbar?: ReactElement;
    user?: { name: string; image: string };
    logout: () => void;
}) {
    const [opened, { toggle }] = useDisclosure(false);
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const theme = createTheme({
        /** Put your mantine theme override here */
    });

    return (
        <MantineProvider theme={theme}>
            <AppShell
                header={{ height: { base: 60, md: 70, lg: 80 } }}
                navbar={
                    props.navbar
                        ? {
                              width: { base: 200, md: 300, lg: 400 },
                              breakpoint: 'sm',
                              collapsed: { mobile: !opened },
                          }
                        : undefined
                }
                padding="md"
            >
                <AppShell.Header>
                    <Group h="100%" px="md" justify="space-between">
                        <Link to={'/'}>
                            <MantineLogo size={30} />
                        </Link>

                        <Burger
                            opened={opened}
                            onClick={toggle}
                            hiddenFrom="xs"
                            size="sm"
                        />

                        {props.user ? (
                            <Menu
                                width={260}
                                position="bottom-end"
                                transitionProps={{
                                    transition: 'pop-top-right',
                                }}
                                onClose={() => setUserMenuOpened(false)}
                                onOpen={() => setUserMenuOpened(true)}
                                withinPortal
                            >
                                <Menu.Target>
                                    <UnstyledButton
                                        className={cx(classes.user, {
                                            [classes.userActive]:
                                                userMenuOpened,
                                        })}
                                    >
                                        <Group gap={7}>
                                            <Avatar
                                                src={props.user.image}
                                                alt={props.user.name}
                                                radius="xl"
                                                size={40}
                                            />
                                        </Group>
                                    </UnstyledButton>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Label>Opções</Menu.Label>

                                    <Menu.Item
                                        leftSection={
                                            <IconLogout
                                                size={16}
                                                stroke={1.5}
                                            />
                                        }
                                        onClick={props.logout}
                                    >
                                        Sair
                                    </Menu.Item>

                                    <Menu.Divider />

                                    <Menu.Label>Conta</Menu.Label>
                                    <Link to={'/app/conta'}>
                                        <Menu.Item
                                            leftSection={
                                                <IconUser
                                                    size={16}
                                                    stroke={1.5}
                                                />
                                            }
                                        >
                                            Minha Conta
                                        </Menu.Item>
                                    </Link>
                                    <Menu.Item
                                        color="red"
                                        leftSection={
                                            <IconTrash size={16} stroke={1.5} />
                                        }
                                        onClick={props.logout}
                                    >
                                        Remover Conta
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        ) : (
                            ''
                        )}
                    </Group>
                </AppShell.Header>
                {props.navbar ? (
                    <AppShell.Navbar p="md">{props.navbar}</AppShell.Navbar>
                ) : (
                    ''
                )}
                <AppShell.Main>
                    <Outlet />
                </AppShell.Main>
            </AppShell>
        </MantineProvider>
    );
}

function Login(props: { loginDashboard: () => void }) {
    return (
        <div>
            login
            <br />
            <button onClick={props.loginDashboard}>acessar</button>
        </div>
    );
}

function Register() {
    return <div>cadastro</div>;
}

function Home() {
    return <div>página inicial</div>;
}

function RelogioPonto() {
    return <div>relógio de ponto</div>;
}

function TratamentoPonto() {
    return <div>tratamento de ponto</div>;
}

function AnalisePonto() {
    return <div>análise de ponto</div>;
}

function TurnosHorarios() {
    return <div>turnos e horários</div>;
}

function MinhaConta() {
    return <div>minha conta</div>;
}

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

    return (
        <Routes>
            <Route
                element={
                    <AppLayout
                        navbar={
                            logged ? (
                                <>
                                    <Link to={'/app/relogio'}>
                                        Relógio de Ponto
                                    </Link>
                                    <Link to={'/app/tratamento'}>
                                        Tratamento de Ponto
                                    </Link>
                                    <Link to={'/app/analise'}>
                                        Analise de Ponto
                                    </Link>
                                    <Link to={'/app/horarios'}>
                                        Turnos e Horarios
                                    </Link>
                                    <Link to={'/app/conta'}>Minha Conta</Link>
                                </>
                            ) : undefined
                        }
                        user={
                            logged
                                ? {
                                      name: 'Raquel Dias',
                                      image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png',
                                  }
                                : undefined
                        }
                        logout={logout}
                    />
                }
            >
                <Route
                    path="login"
                    element={<Login loginDashboard={loginDashboard} />}
                />
                <Route path="register" element={<Register />} />

                <Route path="app">
                    <Route index path="home" element={<Home />} />
                    <Route path="relogio" element={<RelogioPonto />} />
                    <Route path="tratamento" element={<TratamentoPonto />} />
                    <Route path="analise" element={<AnalisePonto />} />
                    <Route path="horarios" element={<TurnosHorarios />} />
                    <Route path="conta" element={<MinhaConta />} />
                </Route>

                <Route
                    path="*"
                    element={
                        <Navigate
                            to={logged ? '/app/home' : '/login'}
                            replace
                        />
                    }
                />
            </Route>
        </Routes>
    );
}

export default App;
