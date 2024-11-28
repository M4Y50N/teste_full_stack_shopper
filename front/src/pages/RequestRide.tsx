import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { api } from '../services/api';

const RequestRide: React.FC = () => {
    const [userId, setUserId] = useState('');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/ride/estimate', {
                customer_id: userId,
                origin,
                destination
            });
            navigate('/options', { state: { options: response.data, customer_id: userId, origin, destination } });
        } catch (error) {
            alert('Erro ao estimar viagem. Tente novamente.');
            console.log(error);
        }
    };

    return (
        <div>
            <h1>Solicitar Viagem</h1>
            <form onSubmit={handleSubmit}>
                <label>ID do Usuário:</label>
                <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required />

                <label>Endereço de Origem:</label>
                <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} required />

                <label>Endereço de Destino:</label>
                <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} required />

                <button type="submit">Estimar Valor</button>
            </form>
        </div>
    );
};

export default RequestRide;
