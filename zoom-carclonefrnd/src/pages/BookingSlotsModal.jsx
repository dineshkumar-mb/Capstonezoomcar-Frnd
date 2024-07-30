// BookingSlotsModal.jsx
import React from 'react';

// BookingSlotsModal.jsx
export const BookingSlotsModal = ({ showModal, onClose, bookedSlots }) => {
  // Component implementation...

  if (!showModal) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Booked Time Slots</h2>
        <ul>
          {bookedSlots.map((slot) => (
            <li key={slot.id}>{slot.time}</li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default BookingSlotsModal;
