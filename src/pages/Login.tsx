import { Button, TextInput, Title } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { FormEvent, useEffect } from 'react';
import options from '../config/notification';
import Card from '../shared/components/Card';

export function Login(props: { loginDashboard: () => void }) {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { codigo: '' },

        validate: {
            codigo: isNotEmpty('O código do usuário não foi preenchido!'),
        },
    });

    const executaLogin = (values: { codigo: string }, e?: FormEvent<HTMLFormElement>) => {
        e?.preventDefault();

        console.log(values);

        props.loginDashboard();
    };

    useEffect(() => {
        console.log('teste');
        notifications.show({ message: 'Please fill name field', autoClose: 120000, ...options });
    }, []);

    return (
        <div className='page-login'>
            <Card
                content={
                    <form onSubmit={form.onSubmit(executaLogin)}>
                        <Title order={4} mb={'sm'}>
                            LOGIN
                        </Title>

                        <TextInput
                            label='Código do usuário'
                            placeholder='Informe o código de acesso'
                            key={form.key('codigo')}
                            {...form.getInputProps('codigo')}
                        />

                        <Button type='submit' mt={'sm'} variant='filled'>
                            Confirmar
                        </Button>
                    </form>
                }
            />
            <img src={require('../assets/img/capa-1.jpg')} alt='Capa' />
        </div>
    );
}
