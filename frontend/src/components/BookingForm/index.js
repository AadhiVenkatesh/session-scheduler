import React, { useState, useEffect } from "react";
import axios from "axios";
import MentorList from "../MentorList";
import PaymentConfirmation from "../PaymentConfirmation";

import "./index.css";

const BookingForm = () => {
  const [student, setStudent] = useState({ name: "", area_of_interest: "" });
  const [studentID, setStudentID] = useState(null);
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [duration, setDuration] = useState(30);
  const [payment, setPayment] = useState(0);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [bookingID, setBookingID] = useState(null);
  const [date, setDate] = useState("");
  const [allBookings, setAllBookings] = useState([]);

  // Fetch mentors when the student's area of interest changes
  useEffect(() => {
    if (student.area_of_interest) {
      axios
        .get("http://localhost:5000/mentors", {
          params: { area_of_interest: student.area_of_interest },
        })
        .then((response) => setMentors(response.data))
        .catch((error) => console.error("Error fetching mentors:", error));
    }
  }, [student.area_of_interest]);

  // Calculate payment based on session duration and mentor type
  useEffect(() => {
    let baseRate = 2000;
    if (duration === 45) baseRate = 3000;
    if (duration === 60) baseRate = 4000;
    if (selectedMentor && selectedMentor.is_premium) baseRate *= 1.5;
    setPayment(baseRate);
  }, [duration, selectedMentor]);

  // Fetch all bookings
  useEffect(() => {
    axios
      .get("http://localhost:5000/bookings")
      .then((response) => setAllBookings(response.data))
      .catch((error) => console.error("Error fetching all bookings:", error));
  }, []);

  // Handle student registration/fetch student ID
  const handleStudentSubmission = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/students",
        student
      );
      setStudentID(response.data.student_id); // Assume backend returns the created/fetched student ID
    } catch (error) {
      console.error("Error creating/fetching student:", error);
    }
  };

  // Handle booking creation
  const handleBooking = async () => {
    if (!selectedMentor || !studentID || !date) return;

    const bookingData = {
      student_id: studentID, // Now using dynamic student ID
      mentor_id: selectedMentor.id,
      duration,
      date,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/bookings",
        bookingData
      );
      setIsBookingConfirmed(true);
      setBookingID(response.data.booking_id);
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  // Handle booking confirmation and payment
  if (isBookingConfirmed) {
    return <PaymentConfirmation payment={payment} bookingID={bookingID} />;
  }

  return (
    <div className="container">
      <h1 className="heading">Book a 1x1 Session</h1>

      <label className="label">
        Student Name:
        <input
          className="input"
          type="text"
          value={student.name}
          onChange={(e) => setStudent({ ...student, name: e.target.value })}
        />
      </label>

      <label className="label">
        Area of Interest:
        <input
          className="input"
          type="text"
          value={student.area_of_interest}
          onChange={(e) =>
            setStudent({ ...student, area_of_interest: e.target.value })
          }
        />
      </label>

      <button className="button" onClick={handleStudentSubmission}>
        Submit Student
      </button>

      <label className="label">
        Date:
        <input
          className="input"
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>

      <>
        <h2>Select a Mentor</h2>
        <MentorList mentors={mentors} onSelect={setSelectedMentor} />

        <h2>Select Duration</h2>
        <select
          className="select"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        >
          <option value={30}>30 Minutes</option>
          <option value={45}>45 Minutes</option>
          <option value={60}>60 Minutes</option>
        </select>

        <h2>Total Payment: {payment} INR</h2>

        <button className="button" onClick={handleBooking}>
          Confirm Booking
        </button>
      </>

      <h2>All Bookings</h2>
      <ul className="booking-list">
        {allBookings.map((booking) => (
          <li className="booking-list-item" key={booking.id}>
            <p>Student ID: {booking.student_id}</p>
            <p>Mentor ID: {booking.mentor_id}</p>
            <p>Duration: {booking.duration} mins</p>
            <p>Date: {booking.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingForm;
