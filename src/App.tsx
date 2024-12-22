import {
    AppShell, Avatar, Burger, createTheme, Group, MantineProvider, Menu, Skeleton, Text,
    UnstyledButton
} from '@mantine/core';
import '@mantine/core/styles.css';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';
import {
    IconChevronDown,
    IconLogout,
    IconSettings,
    IconSwitchHorizontal,
    IconTrash
} from '@tabler/icons-react';
import cx from 'clsx';
import { useState } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router';
import './App.css';
import classes from './AppShell.module.css';

export function AppLayout() {
    const [opened, { toggle }] = useDisclosure(false);
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const theme = createTheme({
        /** Put your mantine theme override here */
    });

    const tabs = [
        'Home',
        'Orders',
        'Education',
        'Community',
        'Forums',
        'Support',
        'Account',
        'Helpdesk',
    ];

    return (
        <MantineProvider theme={theme}>
            <AppShell
                header={{ height: { base: 60, md: 70, lg: 80 } }}
                navbar={{
                    width: { base: 200, md: 300, lg: 400 },
                    breakpoint: 'sm',
                    collapsed: { mobile: !opened },
                }}
                padding='md'
            >
                <AppShell.Header>
                    <Group h='100%' px='md' justify='space-between'>
                        <Burger
                            opened={opened}
                            onClick={toggle}
                            hiddenFrom='sm'
                            size='sm'
                        />
                        <MantineLogo size={30} />

                        <Burger
                            opened={opened}
                            onClick={toggle}
                            hiddenFrom='xs'
                            size='sm'
                        />

                        <Menu
                            width={260}
                            position='bottom-end'
                            transitionProps={{ transition: 'pop-top-right' }}
                            onClose={() => setUserMenuOpened(false)}
                            onOpen={() => setUserMenuOpened(true)}
                            withinPortal
                        >
                            <Menu.Target>
                                <UnstyledButton
                                    className={cx(classes.user, {
                                        [classes.userActive]: userMenuOpened,
                                    })}
                                >
                                    <Group gap={7}>
                                        <Avatar
                                            src={
                                                'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png'
                                            }
                                            alt={'Jane Spoonfighter'}
                                            radius='xl'
                                            size={20}
                                        />
                                        <Text fw={500} size='sm' lh={1} mr={3}>
                                            {'Jane Spoonfighter'}
                                        </Text>
                                        <IconChevronDown
                                            size={12}
                                            stroke={1.5}
                                        />
                                    </Group>
                                </UnstyledButton>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Label>Settings</Menu.Label>
                                <Menu.Item
                                    leftSection={
                                        <IconSettings size={16} stroke={1.5} />
                                    }
                                >
                                    Account settings
                                </Menu.Item>
                                <Menu.Item
                                    leftSection={
                                        <IconSwitchHorizontal
                                            size={16}
                                            stroke={1.5}
                                        />
                                    }
                                >
                                    Change account
                                </Menu.Item>
                                <Menu.Item
                                    leftSection={
                                        <IconLogout size={16} stroke={1.5} />
                                    }
                                >
                                    Logout
                                </Menu.Item>

                                <Menu.Divider />

                                <Menu.Label>Danger zone</Menu.Label>
                                <Menu.Item
                                    color='red'
                                    leftSection={
                                        <IconTrash size={16} stroke={1.5} />
                                    }
                                >
                                    Delete account
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                </AppShell.Header>
                <AppShell.Navbar p='md'>
                    Navbar
                    {Array(15)
                        .fill(0)
                        .map((_, index) => (
                            <Skeleton
                                key={index}
                                h={28}
                                mt='sm'
                                animate={false}
                            />
                        ))}
                </AppShell.Navbar>
                <AppShell.Main>
                    <Outlet />
                </AppShell.Main>
            </AppShell>
        </MantineProvider>
    );
}

function Login() {
    return <div>login</div>;
}

function Register() {
    return <div>cadastro</div>;
}

function Home() {
    return <div>página inicial</div>;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route element={<AuthLayout />}>
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                </Route> */}

                <Route element={<AppLayout />}>
                    <Route index path='/home' element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
