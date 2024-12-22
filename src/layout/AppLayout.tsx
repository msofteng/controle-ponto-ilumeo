import { AppShell, Avatar, Burger, Group, MantineProvider, Menu, Title, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconLogout, IconTrash, IconUser } from '@tabler/icons-react';
import { ReactElement, useState } from 'react';
import { Link, Outlet } from 'react-router';

import theme from '../config/theme';

import '../assets/css/layout/AppLayout.css';

export default function AppLayout(props: {
    navbar?: ReactElement;
    user?: { name: string; image: string };
    logout: () => void;
    closeNavbar: () => void;
}) {
    const [opened, { toggle }] = useDisclosure(false);
    const [userMenuOpened, setUserMenuOpened] = useState(false);

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
                padding='md'
            >
                <AppShell.Header className='header'>
                    <Group h='100%' px='md' justify='space-between'>
                        {props.navbar ? <Burger opened={opened} onClick={toggle} hiddenFrom='xs' size='sm' /> : ''}

                        <Link to={'/'} onClick={props.closeNavbar}>
                            <Title className='title-page'>
                                Ponto <strong>Ilumeo</strong>
                            </Title>
                        </Link>

                        {props.user ? (
                            <Menu
                                width={260}
                                position='bottom-end'
                                transitionProps={{
                                    transition: 'pop-top-right',
                                }}
                                onClose={() => setUserMenuOpened(false)}
                                onOpen={() => setUserMenuOpened(true)}
                                withinPortal
                            >
                                <Menu.Target>
                                    <UnstyledButton className={'user' + userMenuOpened ? ' userActive' : ''}>
                                        <Group gap={7}>
                                            <Avatar
                                                src={props.user.image}
                                                alt={props.user.name}
                                                radius='xl'
                                                size={'2.7em'}
                                            />
                                        </Group>
                                    </UnstyledButton>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Label>Opções</Menu.Label>

                                    <Menu.Item
                                        leftSection={<IconLogout size={16} stroke={1.5} />}
                                        onClick={props.logout}
                                    >
                                        Sair
                                    </Menu.Item>

                                    <Menu.Divider />

                                    <Menu.Label>Conta</Menu.Label>
                                    <Link to={'/app/conta'} onClick={props.closeNavbar}>
                                        <Menu.Item leftSection={<IconUser size={16} stroke={1.5} />}>
                                            Minha Conta
                                        </Menu.Item>
                                    </Link>
                                    <Menu.Item
                                        color='red'
                                        leftSection={<IconTrash size={16} stroke={1.5} />}
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
                    <AppShell.Navbar className='navbar' p='md'>
                        {props.navbar}
                    </AppShell.Navbar>
                ) : (
                    ''
                )}
                <AppShell.Main className='mainSection'>
                    <Outlet />
                </AppShell.Main>
            </AppShell>
        </MantineProvider>
    );
}
