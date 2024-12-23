import { Button, Text, TextInput, Title } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { FormEvent } from 'react';
import { Usuario } from '../shared/models/interfaces/controle-ponto.entities';

import Card from '../shared/components/Card';

export function Conta(props: { user?: Usuario; changeUser: (user: Usuario) => void }) {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: props.user,

        validate: {
            nome: (value) => (value.trim().length === 0 ? 'O nome do usuário está em branco!' : null),
            usuario: isNotEmpty('O perfil do usuário está em branco!'),
        },
    });

    const atualizaDados = (values: Usuario, e?: FormEvent<HTMLFormElement>) => {
        e?.preventDefault();

        props.changeUser(values);
    };

    return (
        <Card
            content={
                <form onSubmit={form.onSubmit(atualizaDados)}>
                    <Title order={3}>Minha Conta</Title>

                    <Text mt='sm' mb='md'>
                        Visualize ou edite as suas informações pessoais
                    </Text>

                    <TextInput
                        label='Nome completo'
                        placeholder='Nome'
                        key={form.key('nome')}
                        {...form.getInputProps('nome')}
                    />

                    <TextInput
                        mt='sm'
                        label='Nome do usuário'
                        placeholder='Usuário'
                        key={form.key('usuario')}
                        {...form.getInputProps('usuario')}
                    />

                    <Button type='submit' mt='md' variant='filled'>
                        Atualizar Informações
                    </Button>
                </form>
            }
        />
    );
}
