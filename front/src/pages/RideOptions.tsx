import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { api } from '../services/api';

const RideOptions: React.FC = ({ originLat, originLng, destinationLat, destinationLng }: any) => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const confirmRide = async (ride: any) => {
        console.log(state);

        try {
            await api.patch('/ride/confirm', {
                customer_id: state.customer_id,
                origin: state.options.routeResponse.origin_addresses[0],
                destination: state.options.routeResponse.destination_addresses[0],
                distance: state.options.distance,
                duration: state.options.duration,
                driver: {
                    id: ride.id,
                    name: ride.name
                },
                value: ride.value
            });
            navigate('/history');
        } catch (error) {
            alert('Erro ao confirmar viagem.');
        }
    };

    const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=400x300&path=enc:<encoded_polyline>&markers=color:blue|label:A|${originLat},${originLng}&markers=color:red|label:B|${destinationLat},${destinationLng}&key=${process.env.GOOGLE_API_KEY}`;

    return (
        <div>
            <h1>Opções de Motoristas</h1>
            <div>
                {/* Exemplo de mapa estático */}
                <img src={mapUrl} alt="Mapa Estático" />
            </div>
            {state.options.options.map((option: any) => {
                return (
                    <div key={option.driver_id}>
                        <p>Motorista: {option.name}</p>
                        <p>Descrição: {option.description}</p>
                        <p>Veículo: {option.vehicle}</p>
                        <p>Avaliação: {option.review.rating}/5 {option.review.comment}</p>
                        <p>Valor: {option.value}</p>
                        <button onClick={() => confirmRide(option)}>Escolher</button>
                    </div>
                )
            })}
        </div>
    );
};

export default RideOptions;
