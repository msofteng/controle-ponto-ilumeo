import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import './App.css';

function AuthLayout() {
    return (
        <>
            <div>layout autenticação</div>
            <Outlet/>
        </>
    );
}

function Login() {
    return (
        <div>login</div>
    );
}

function Register() {
    return (
        <div>cadastro</div>
    );
}

function AppLayout() {
    return (
        <>
            <div>layout SPA</div>
            <Outlet/>
        </>
    );
}

function Home() {
    return (
        <div>página inicial</div>
    );
}


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>

                <Route element={<AppLayout />}>
                    <Route index path="/" element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
