import axios from 'axios';
import { Login, Marcacao, Usuario } from '../models/interfaces/controle-ponto.entities';
import { ajustarParaFusoHorarioLocal } from '../functions/date-convert';

const http = axios.create({ baseURL: 'http://localhost:3001' });

function sendLogin(code: string): AxiosResponse<Login> {
    return http
        .get<Usuario[]>('/usuarios', {
            params: {
                codigo: code,
            },
        })
        .then((response) => {
            if (response.data.length > 0) {
                return {
                    data: {
                        status: 200,
                        user: response.data[0],
                    },
                } as Axios.AxiosXHR<Login>;
            } else {
                return {
                    data: {
                        status: 404,
                        error: new Error('Usuário não encontrado.'),
                    },
                } as Axios.AxiosXHR<Login>;
            }
        })
        .catch(() => {
            return {
                data: {
                    status: 500,
                    error: new Error('Erro ao tentar realizar login.'),
                },
            } as Axios.AxiosXHR<Login>;
        });
}

function listarUsuario(id: number, withMarks: boolean = false): AxiosResponse<Usuario> {
    return http.get<Usuario>(`/usuarios/${id}`, {
        params: {
            ...(withMarks ? { _embed: 'marcacoes' } : {}),
        },
    });
}

function getAllUsers(): AxiosResponse<Usuario[]> {
    return http.get<Usuario[]>('/usuarios');
}

function getUser(id: number): AxiosResponse<Usuario> {
    return http.get<Usuario>(`/usuarios/${id}`);
}

function createUser(data: Usuario): AxiosResponse<Usuario> {
    return http.post<Usuario>('/usuarios', data);
}

function updateUser(data: Usuario): AxiosResponse<Usuario> {
    if (!data.id) {
        throw new Error('O objeto Usuario deve conter um \'id\' para atualização.');
    }

    return http.put<Usuario>(`/usuarios/${data.id}`, data);
}

function removeUser(id: number): AxiosResponse<void> {
    return http.delete<void>(`/usuarios/${id}`);
}

function getAllMarks(userId: number): AxiosRes<Marcacao[]> {
    return http.get<Marcacao[]>(`/usuarios/${userId}/marcacoes`).then((response) => {
        return response.data.map((marcacao) => ({
            ...marcacao,
            dataInicio: ajustarParaFusoHorarioLocal(marcacao.inicio),
            dataTermino: marcacao.termino ? ajustarParaFusoHorarioLocal(marcacao.termino) : undefined,
        }));
    });
}

function getMark(userId: number, idMark: number): AxiosRes<Marcacao> {
    return http.get<Marcacao>(`/usuarios/${userId}/marcacoes/${idMark}`).then((response) => {
        return {
            ...response.data,
            dataInicio: ajustarParaFusoHorarioLocal(response.data.inicio),
            dataTermino: response.data.termino ? ajustarParaFusoHorarioLocal(response.data.termino) : undefined,
        };
    });
}

function createMark(userId: number, data: Marcacao): AxiosRes<Marcacao> {
    return http.post<Marcacao>(`/usuarios/${userId}/marcacoes`, data).then((response) => {
        return {
            ...response.data,
            dataInicio: ajustarParaFusoHorarioLocal(response.data.inicio),
            dataTermino: response.data.termino ? ajustarParaFusoHorarioLocal(response.data.termino) : undefined,
        };
    });
}

function updateMark(userId: number, data: Marcacao): AxiosRes<Marcacao> {
    if (!data.id) {
        throw new Error('O objeto Marcacao deve conter um \'id\' para atualização.');
    }

    return http.put<Marcacao>(`/usuarios/${userId}/marcacoes/${data.id}`, data).then((response) => {
        return {
            ...response.data,
            dataInicio: ajustarParaFusoHorarioLocal(response.data.inicio),
            dataTermino: response.data.termino ? ajustarParaFusoHorarioLocal(response.data.termino) : undefined,
        };
    });
}

function removeMark(userId: number, idMark: number): AxiosResponse<void> {
    return http.delete<void>(`/usuarios/${userId}/marcacoes/${idMark}`);
}

const service = {
    sendLogin,
    listarUsuario,
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    removeUser,
    getAllMarks,
    getMark,
    createMark,
    updateMark,
    removeMark,
};

export default service;
