import React from "react";

const PaymentConfirmation = ({ payment, bookingID }) => {
  return (
    <div>
      <h2>Booking Confirmed!</h2>
      <p>Your booking ID is: {bookingID}</p>
      <p>Total Payment: {payment} INR</p>
      <p>Thank you for booking a session!</p>
    </div>
  );
};

export default PaymentConfirmation;
