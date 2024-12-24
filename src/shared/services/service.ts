import axios, { AxiosResponse } from 'axios';
import { Login, Marcacao, Usuario } from '../models/interfaces/controle-ponto.entities';
import { ajustarParaFusoHorarioLocal } from '../functions/date-convert';

const http = axios.create({ baseURL: process.env.REACT_APP_API_URL });

function sendLogin(code: string): Promise<AxiosResponse<Login>> {
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
                } as AxiosResponse<Login>;
            } else {
                return {
                    data: {
                        status: 404,
                        error: new Error('Usuário não encontrado.'),
                    },
                } as AxiosResponse<Login>;
            }
        })
        .catch(() => {
            return {
                data: {
                    status: 500,
                    error: new Error('Erro ao tentar realizar login.'),
                },
            } as AxiosResponse<Login>;
        });
}

function listarUsuario(id: number, withMarks: boolean = false): Promise<AxiosResponse<Usuario, null>> {
    return http.get<Usuario, AxiosResponse<Usuario>>(`/usuarios/${id}`, {
        params: {
            ...(withMarks ? { _embed: 'marcacoes' } : {}),
        },
    });
}

function getAllUsers(): Promise<AxiosResponse<Usuario[]>> {
    return http.get<Usuario[], AxiosResponse<Usuario[]>>('/usuarios');
}

function getUser(id: number): Promise<AxiosResponse<Usuario>> {
    return http.get<Usuario>(`/usuarios/${id}`);
}

function checkUser(username: string): Promise<AxiosResponse<boolean>> {
    return http
        .get<Usuario[]>('/usuarios', {
            params: {
                usuario: username,
            },
        })
        .then((response) => {
            if (response.data.length > 0) {
                return {
                    data: true,
                } as AxiosResponse<boolean>;
            } else {
                return {
                    data: false,
                } as AxiosResponse<boolean>;
            }
        })
        .catch(() => {
            return {
                data: false,
            } as AxiosResponse<boolean>;
        });
}

function createUser(data: Usuario): Promise<AxiosResponse<Usuario, Usuario>> {
    return http.post<Usuario, AxiosResponse<Usuario>, Usuario>('/usuarios', data);
}

function updateUser(data: Usuario): Promise<AxiosResponse<Usuario, Usuario>> {
    if (!data.id) {
        throw new Error('O objeto Usuario deve conter um \'id\' para atualização.');
    }

    return http.put<Usuario, AxiosResponse<Usuario>, Usuario>(`/usuarios/${data.id}`, data);
}

function removeUser(id: number): Promise<AxiosResponse<void>> {
    return http.delete<void>(`/usuarios/${id}`);
}

function getAllMarks(userId: number): Promise<Marcacao[]> {
    return http.get<Marcacao[]>(`/usuarios/${userId}/marcacoes`).then((response) => {
        return response.data
            .map((marcacao) => ({
                ...marcacao,
                dataInicio: ajustarParaFusoHorarioLocal(marcacao.inicio),
                dataTermino: marcacao.termino ? ajustarParaFusoHorarioLocal(marcacao.termino) : undefined,
            }))
            .sort((a, b) => a.dataInicio.getTime() - b.dataInicio.getTime());
    });
}

function getMark(userId: number, idMark: number): Promise<Marcacao> {
    return http.get<Marcacao>(`/usuarios/${userId}/marcacoes/${idMark}`).then((response) => {
        return {
            ...response.data,
            dataInicio: ajustarParaFusoHorarioLocal(response.data.inicio),
            dataTermino: response.data.termino ? ajustarParaFusoHorarioLocal(response.data.termino) : undefined,
        };
    });
}

function createMark(userId: number, data: Marcacao): Promise<Marcacao> {
    return http.post<Marcacao, AxiosResponse<Marcacao>, Marcacao>(`/usuarios/${userId}/marcacoes`, data).then((response) => {
        return {
            ...response.data,
            dataInicio: ajustarParaFusoHorarioLocal(response.data.inicio),
            dataTermino: response.data.termino ? ajustarParaFusoHorarioLocal(response.data.termino) : undefined,
        };
    });
}

function updateMark(data: Marcacao): Promise<Marcacao> {
    if (!data.id) {
        throw new Error('O objeto Marcacao deve conter um \'id\' para atualização.');
    }

    delete data.dataInicio;

    return http.put<Marcacao, AxiosResponse<Marcacao>, Marcacao>(`/marcacoes/${data.id}`, data).then((response) => {
        return {
            ...response.data,
            dataInicio: ajustarParaFusoHorarioLocal(response.data.inicio),
            dataTermino: response.data.termino ? ajustarParaFusoHorarioLocal(response.data.termino) : undefined,
        };
    });
}

function removeMark(idMark: number): Promise<AxiosResponse<void>> {
    return http.delete<void>(`/marcacoes/${idMark}`);
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
    checkUser,
};

export default service;
