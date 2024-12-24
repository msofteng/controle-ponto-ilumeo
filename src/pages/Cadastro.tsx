import { Box, Button, Divider, FileButton, TextInput, Title, Tooltip } from '@mantine/core';
import { Text } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { FormEvent, useRef, useState } from 'react';
import { Usuario } from '../shared/models/interfaces/controle-ponto.entities';
import { gerarToken } from '../shared/functions/utils';
import { fileToBase64 } from '../shared/functions/file';

import options from '../config/notification';
import Card from '../shared/components/Card';
import service from '../shared/services/service';
import TitlePage from '../shared/components/TitlePage';

export function Cadastro(props: { executaLogin: (user: Usuario) => void; toLogin: () => void }) {
    const form = useForm<Usuario>({
        mode: 'uncontrolled',
        initialValues: {
            nome: '',
            usuario: '',
            codigo: gerarToken(7),
        },

        validate: {
            nome: isNotEmpty('O nome não foi preenchido!'),
            usuario: isNotEmpty('O nome do usuário não foi preenchido!'),
        },
    });

    const [file, setFile] = useState<File | null>(null);
    const resetRef = useRef<() => void>(null);

    const clearFile = () => {
        setFile(null);
        resetRef.current?.();
    };

    const enviaCadastro = async (values: Usuario, e?: FormEvent<HTMLFormElement>) => {
        e?.preventDefault();

        if (file) values.image = await fileToBase64(file);

        const bool = await service.checkUser(values.usuario);

        if (!bool.data) {
            service
                .createUser(values)
                .then((response) => {
                    notifications.show({
                        message: 'Você foi cadastrado(a) com sucesso!',
                        ...options,
                        onClose: () => {
                            props.executaLogin(response.data as Usuario);
                        },
                    });
                })
                .catch((error) => {
                    notifications.show({
                        message: (
                            <>
                                <strong>Erro: &nbsp;</strong>
                                {error}
                            </>
                        ),
                        ...options,
                    });
                });
        } else {
            notifications.show({ message: 'O nome de usuário já existe!', ...options });
        }
    };

    return (
        <div className='page-login cadastro'>
            <Card
                content={
                    <form onSubmit={form.onSubmit(enviaCadastro)}>
                        <Title order={4} mb={'md'}>
                            CADASTRO
                        </Title>

                        <TextInput label='Nome Completo' placeholder='Nome' key={form.key('nome')} {...form.getInputProps('nome')} mt={'sm'} />

                        <TextInput
                            label='Usuário'
                            placeholder='Nome do usuário'
                            key={form.key('usuario')}
                            {...form.getInputProps('usuario')}
                            mt={'sm'}
                        />
                        <Tooltip radius={'md'} label='O código de autenticação é gerado automaticamente!'>
                            <TextInput label='Código' key={form.key('codigo')} {...form.getInputProps('codigo')} mt={'sm'} disabled />
                        </Tooltip>
                        <Box mt='md'>
                            <FileButton resetRef={resetRef} onChange={setFile} accept='image/png,image/jpeg'>
                                {(props) => <Button {...props}>Carregar foto</Button>}
                            </FileButton>
                            <Button ml={'sm'} disabled={!file} color='red' onClick={clearFile}>
                                Excluir foto
                            </Button>

                            {file && (
                                <Text size='sm' ta='center' mt='sm'>
                                    Foto escolhida: {file.name}
                                </Text>
                            )}
                        </Box>

                        <Divider my='md' />

                        <Box>
                            <Button type='submit' variant='filled'>
                                Cadastrar
                            </Button>
                            <Button
                                ml={'sm'}
                                onClick={props.toLogin}
                                variant='filled'
                                color='var(--bg-color-secondary)'
                                style={{ color: 'var(--color-secondary)' }}
                            >
                                Conecte-se
                            </Button>
                        </Box>
                    </form>
                }
            />
            <iframe
                className='cover-login'
                title='vídeo (apresentação)'
                src='https://www.youtube.com/embed/c5E7__oAaO8?autoplay=1&mute=1&controls=1'
                allow='autoplay; fullscreen'
            />

            <TitlePage content='Cadastro &nbsp;|&nbsp; Ponto Ilumeo' />
        </div>
    );
}
