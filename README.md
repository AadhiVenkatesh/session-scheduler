1x1 Scheduler Project

Overview

This project is a 1x1 scheduling application designed for MBA students and mentors. It features:

Mentor scheduling with back-to-back session support.

Dynamic mentor availability based on student’s area of interest.

Options for session duration.

Payment integration based on session duration and mentor type.

Features

Mentor Scheduling:

Prioritizes back-to-back scheduling for mentors.

Handles student preferences for specific mentors.

Student Booking:

Allows students to select session duration (30, 45, 60 minutes).

Provides a payment page based on session details.

Responsive Design:

Fully responsive frontend for various devices.

Project Structure

bash

Copy code

/project-root

   /backend
   
      /dummyData.js
      
      /server.js
      
      /database.db
   
   /frontend
   
      /src
      
         /components
            BookingForm.js
            MentorList.js
            PaymentConfirmation.js
         
         App.js

Getting Started

Prerequisites
Node.js (v14 or higher)
SQLite
Installation
Clone the Repository:

bash
Copy code

git clone <repository-url>
cd <project-directory>

Backend Setup:

Navigate to the /backend directory:

bash
Copy code

cd backend
Install the necessary packages:

bash
Copy code

npm install
Seed the database with dummy data:

bash
Copy code

node dummyData.js
Frontend Setup:

Navigate to the /frontend directory:

bash
Copy code

cd ../frontend
Install the necessary packages:

bash
Copy code

npm install
Start the Servers:

Backend:

bash
Copy code

cd ../backend
node server.js
Frontend:

bash
Copy code

cd ../frontend
npm start
This will start the frontend application at http://localhost:3000 and the backend server at http://localhost:5000.

API Endpoints

GET /mentors

Fetch mentors based on area of interest or specific mentor selection.

Parameters:

area_of_interest: (Optional) Filter mentors by area of expertise.
preferred_mentor: (Optional) Filter by specific mentor name.
Response:

List of mentors.

POST /bookings

Create a new booking.

Request Body:

student_id: ID of the student.
mentor_id: ID of the mentor.
duration: Duration of the session (30, 45, 60 minutes).
date: Date and time for the session (ISO format).
Response:

Booking confirmation with booking_id and date.

GET /bookings

Retrieve all bookings for a student or mentor.

Query Parameters:

student_id: (Optional) Filter by student ID.
mentor_id: (Optional) Filter by mentor ID.
Response:

List of bookings.
Usage
Book a Session:

Enter student details and area of interest.
Select a mentor, session duration, and date.
Confirm the booking and proceed to payment.
View Bookings:

View all bookings on the frontend.
Styling
The application uses responsive design to ensure usability across various devices. For more information on styling and responsiveness, check the CSS files in the /frontend/src directory.

Contributing
Feel free to submit issues and pull requests to enhance the project. Ensure to follow the project's coding standards and add tests where applicable.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Contact
For any questions or issues, please contact aathi494@gmail.com
