import { AppShell, Avatar, Burger, Group, MantineProvider, Menu, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';
import { IconLogout, IconTrash, IconUser } from '@tabler/icons-react';
import cx from 'clsx';
import { ReactElement, useState } from 'react';
import { Link, Outlet } from 'react-router';
import theme from '../config/theme';
import classes from './AppLayout.module.css';

export default function AppLayout(props: {
    navbar?: ReactElement;
    user?: { name: string; image: string };
    logout: () => void;
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
                <AppShell.Header>
                    <Group h='100%' px='md' justify='space-between'>
                        <Link to={'/'}>
                            <MantineLogo size={30} />
                        </Link>

                        <Burger opened={opened} onClick={toggle} hiddenFrom='xs' size='sm' />

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
                                    <UnstyledButton
                                        className={cx(classes.user, {
                                            [classes.userActive]: userMenuOpened,
                                        })}
                                    >
                                        <Group gap={7}>
                                            <Avatar
                                                src={props.user.image}
                                                alt={props.user.name}
                                                radius='xl'
                                                size={40}
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
                                    <Link to={'/app/conta'}>
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
                {props.navbar ? <AppShell.Navbar p='md'>{props.navbar}</AppShell.Navbar> : ''}
                <AppShell.Main>
                    <Outlet />
                </AppShell.Main>
            </AppShell>
        </MantineProvider>
    );
}
