import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReservationHistory = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('/api/historial');
        setReservations(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div>
      <header>
        <h1>Historial de Reservaciones</h1>
      </header>
      <main>
        <table>
          <thead>
            <tr>
              <th>Habitación</th>
              <th>Usuario</th>
              <th>Fecha de inicio</th>
              <th>Fecha de fin</th>
              <th>Fecha de creación</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation._id}>
                <td>{reservation.roomId.name}</td>
                <td>{reservation.userId.name}</td>
                <td>{new Date(reservation.startDate).toLocaleDateString()}</td>
                <td>{new Date(reservation.endDate).toLocaleDateString()}</td>
                <td>{new Date(reservation.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default ReservationHistory;