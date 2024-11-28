import React, { useState } from 'react';
import { api } from '../services/api';

const RideHistory: React.FC = () => {
    const [userId, setUserId] = useState('');
    const [driverId, setDriverId] = useState('');
    const [rides, setRides] = useState<any>();

    const handleFilter = async () => {
        try {
            const response = await api.get(`/ride/${userId}`, {
                params: {
                    driver_id: driverId || undefined,
                },
            });
            console.log(response.data)
            setRides(response.data);
        } catch (error) {
            alert('Erro ao buscar histórico.');
        }
    };

    return (
        <div>
            <h1>Histórico de Viagens</h1>
            <label>ID do Usuário:</label>
            <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />

            <label>Motorista:</label>
            <input type="text" value={driverId} onChange={(e) => setDriverId(e.target.value)} placeholder="Todos" />

            <button onClick={handleFilter}>Aplicar Filtro</button>

            <div>
                {rides && rides!.rides.map((i: number, ride: any) => {
                    return (
                        <div>
                            <p>Data: {ride.date}</p>
                            {/* <p>Motorista: {ride.driver.name}</p> */}
                            <p>Origem: {ride.origin}</p>
                            <p>Destino: {ride.destination}</p>
                            <p>Distância: {ride.distance}</p>
                            <p>Duração: {ride.duration}</p>
                            <p>Valor: {ride.value}</p>
                            <hr />
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default RideHistory;
