import React, { useState } from 'react';
import { api } from './../../Services/api';
import { toast } from 'react-toastify';

interface UserData {
    name: string;
    email: string;
}

export default function Cadastro() {
    const [userData, setUserData] = useState<UserData>({ name: '', email: '' });

    const handleSubmit = () => {
        const requestBody = {
            name: userData.name,
            email: userData.email,
        };

        api.post<UserData>('/users', requestBody)
            .then(() => toast('sucesso'))
            .catch((error) => toast('error'));
    };

    const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({ name: e.target.value, email: userData.email });
    };

    const handleUserEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({ name: userData.name, email: e.target.value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Nome</label>
            <input
                value={userData.name}
                onChange={handleUserName}
                type="text"
                required
            />
            <label htmlFor="email">email</label>
            <input
                value={userData.email}
                onChange={handleUserEmail}
                type="email"
                required
            />
            <button>Enviar Cadastro</button>
        </form>
    );
}
