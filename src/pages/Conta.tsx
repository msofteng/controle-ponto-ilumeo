import { Box, Button, Divider, FileButton, Text, TextInput, Title } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { Usuario } from '../shared/models/interfaces/controle-ponto.entities';
import { base64ToFile, fileToBase64 } from '../shared/functions/file';
import { notifications } from '@mantine/notifications';

import Card from '../shared/components/Card';
import options from '../config/notification';
import service from '../shared/services/service';

export function Conta(props: { user?: Usuario; changeUser: (user: Usuario) => void }) {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: props.user,

        validate: {
            nome: (value) => (value.trim().length === 0 ? 'O nome do usuário está em branco!' : null),
            usuario: isNotEmpty('O perfil do usuário está em branco!'),
        },
    });

    const [file, setFile] = useState<File | null>(null);
    const resetRef = useRef<() => void>(null);

    useEffect(() => {
        if (props.user?.image) {
            const ext = props.user?.image?.match(/^data:image\/([a-zA-Z0-9+]+);base64,/)?.[1] ?? null;
            setFile(base64ToFile(props.user?.image, `image.${ext}`));
        }
    }, [props.user?.image]);

    const clearFile = () => {
        setFile(null);
        resetRef.current?.();
    };

    const atualizaDados = async (values: Usuario, e?: FormEvent<HTMLFormElement>) => {
        e?.preventDefault();

        values.image = file ? await fileToBase64(file) : '';

        const bool = await service.checkUser(values.usuario);

        if (props.user?.usuario === values.usuario || (props.user?.usuario !== values.usuario && !bool)) {
            props.changeUser(values);
        } else {
            notifications.show({ message: 'O nome de usuário já existe!', ...options });
        }
    };

    return (
        <Card
            content={
                <form onSubmit={form.onSubmit(atualizaDados)}>
                    <Title order={3}>Minha Conta</Title>

                    <Text mt='sm' mb='md'>
                        Visualize ou edite as suas informações pessoais
                    </Text>

                    <TextInput label='Nome Completo' placeholder='Nome' key={form.key('nome')} {...form.getInputProps('nome')} />

                    <TextInput mt='sm' label='Nome do usuário' placeholder='Usuário' key={form.key('usuario')} {...form.getInputProps('usuario')} />

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

                    <Button type='submit' variant='filled'>
                        Atualizar Informações
                    </Button>
                </form>
            }
        />
    );
}
