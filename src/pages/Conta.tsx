import { Title, Text, TextInput, Button } from '@mantine/core';
import Card from '../shared/components/Card';
import { useForm } from '@mantine/form';
import { FormEvent } from 'react';

export function Conta(props: { user: { nome: string; email: string } }) {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { nome: props.user.nome, email: props.user.email },

        validate: {
            nome: (value) => (value.trim().length === 0 ? 'O nome do usuário está em branco!' : null),
            email: (value) => {
                let message = null;

                if (!value || value.trim() === '') {
                    message = 'O e-mail do usuário está em branco!';
                } else if (!/^\S+@\S+$/.test(value)) {
                    message = 'O e-mail não é válido';
                }

                return message;
            },
        },
    });

    const atualizaDados = (values: { nome: string; email: string }, e?: FormEvent<HTMLFormElement>) => {
        e?.preventDefault();

        console.log(values);
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
                        label='Nome do usuário'
                        placeholder='Name'
                        key={form.key('nome')}
                        {...form.getInputProps('nome')}
                    />

                    <TextInput
                        mt='sm'
                        label='E-mail do usuário'
                        placeholder='Email'
                        key={form.key('email')}
                        {...form.getInputProps('email')}
                    />

                    <Button type='submit' mt='md' variant='filled'>
                        Atualizar Informações
                    </Button>
                </form>
            }
        />
    );
}
