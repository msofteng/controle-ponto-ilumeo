export function Login(props: { loginDashboard: () => void }) {
    return (
        <div>
            login
            <br />
            <button onClick={props.loginDashboard}>acessar</button>
        </div>
    );
}
