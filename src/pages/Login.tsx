import { Button } from '@mantine/core';

export function Login(props: { loginDashboard: () => void }) {
    return (
        <div>
            login
            <br />
            <Button onClick={props.loginDashboard} variant='filled'>
                Acessar
            </Button>
        </div>
    );
}
