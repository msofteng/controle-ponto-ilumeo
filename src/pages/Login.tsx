import { Button, TextInput, Title } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { CSSProperties, FormEvent } from 'react';
import { Login as ILogin, Usuario } from '../shared/models/interfaces/controle-ponto.entities';

import options from '../config/notification';
import Card from '../shared/components/Card';
import service from '../shared/services/service';

export function Login(props: { loginDashboard: (user: Usuario) => void }) {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { codigo: '' },

        validate: {
            codigo: isNotEmpty('O código do usuário não foi preenchido!'),
        },
    });

    const executaLogin = (values: { codigo: string }, e?: FormEvent<HTMLFormElement>) => {
        e?.preventDefault();

        service
            .sendLogin(values.codigo)
            .then((response) => {
                const loginData: ILogin = response.data;

                if (loginData.status === 200) {
                    notifications.show({ message: 'Login bem-sucedido!', ...options });
                    props.loginDashboard(loginData.user as Usuario);
                } else if (loginData.status === 404) {
                    notifications.show({
                        message: (
                            <>
                                <strong>Erro: &nbsp;</strong>
                                {loginData.error?.message}
                            </>
                        ),
                        ...options,
                    });
                }
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
    };

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
            <div
                className='cover-login'
                style={{ '--bg-image': 'url(' + require('../assets/img/capa-1.jpg') + ')' } as CSSProperties}
            />
        </div>
    );
}
