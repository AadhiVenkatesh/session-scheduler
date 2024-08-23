const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// Setup SQLite database (file-based)
const db = new sqlite3.Database(
  path.resolve(__dirname, "database.db"),
  (err) => {
    if (err) {
      console.error("Error opening SQLite database:", err);
    } else {
      console.log("Connected to SQLite database.");
    }
  }
);

// Create tables if they don't exist
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY, name TEXT, area_of_interest TEXT)"
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS mentors (id INTEGER PRIMARY KEY, name TEXT, areas_of_expertise TEXT, is_premium INTEGER, availability TEXT)"
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS bookings (id INTEGER PRIMARY KEY, student_id INTEGER, mentor_id INTEGER, duration INTEGER, date TEXT, FOREIGN KEY(student_id) REFERENCES students(id), FOREIGN KEY(mentor_id) REFERENCES mentors(id))"
  );
});

// Function to find back-to-back schedule for a mentor
function findBackToBackSlot(mentorId, requestedDate, duration, callback) {
  db.all(
    "SELECT * FROM bookings WHERE mentor_id = ? AND date LIKE ? ORDER BY date ASC",
    [mentorId, `${requestedDate.split("T")[0]}%`],
    (err, bookings) => {
      if (err) {
        return callback(err);
      }

      // Logic to find next available back-to-back time slot (this is a simple example)
      const availableSlots = []; // Store potential back-to-back slots
      let lastEndTime = null;

      bookings.forEach((booking) => {
        const startTime = new Date(booking.date);
        const endTime = new Date(
          startTime.getTime() + booking.duration * 60000
        );
        if (!lastEndTime || startTime.getTime() === lastEndTime.getTime()) {
          lastEndTime = endTime;
        }
      });

      // Next available slot is either at 7pm or right after the last booking
      const nextAvailable = lastEndTime || new Date(requestedDate);
      callback(null, nextAvailable);
    }
  );
}

// Fetch mentors based on area of interest or specific mentor selection
app.get("/mentors", (req, res) => {
  const { area_of_interest, preferred_mentor } = req.query;

  let query = "SELECT * FROM mentors WHERE areas_of_expertise LIKE ?";
  const params = [`%${area_of_interest}%`];

  if (preferred_mentor) {
    query += " AND name = ?";
    params.push(preferred_mentor);
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).send("Error retrieving mentors");
    }
    res.json(rows);
  });
});

// Create a new booking
app.post("/bookings", (req, res) => {
  const { student_id, mentor_id, duration, date } = req.body;

  // Find back-to-back time slot
  findBackToBackSlot(mentor_id, date, duration, (err, nextSlot) => {
    if (err) {
      return res.status(500).send("Error finding available slot");
    }

    // Create booking with next available slot
    const adjustedDate = nextSlot.toISOString();
    db.run(
      "INSERT INTO bookings (student_id, mentor_id, duration, date) VALUES (?, ?, ?, ?)",
      [student_id, mentor_id, duration, adjustedDate],
      function (err) {
        if (err) {
          return res.status(500).send("Error creating booking");
        }
        res.send({ booking_id: this.lastID, date: adjustedDate });
      }
    );
  });
});

// Fetch all bookings
app.get("/bookings", (req, res) => {
  db.all("SELECT * FROM bookings", (err, rows) => {
    if (err) {
      return res.status(500).send("Error retrieving bookings");
    }
    res.json(rows);
  });
});

// Add a route to handle student creation/fetching
app.post("/students", (req, res) => {
  const { name, area_of_interest } = req.body;
  // Check if student exists
  db.get(
    "SELECT id FROM students WHERE name = ? AND area_of_interest = ?",
    [name, area_of_interest],
    (err, row) => {
      if (err) {
        return res.status(500).send("Error checking student");
      }
      if (row) {
        // If student exists, return the ID
        res.send({ student_id: row.id });
      } else {
        // If not, create a new student
        db.run(
          "INSERT INTO students (name, area_of_interest) VALUES (?, ?)",
          [name, area_of_interest],
          function (err) {
            if (err) {
              return res.status(500).send("Error creating student");
            }
            res.send({ student_id: this.lastID });
          }
        );
      }
    }
  );
});

// Load dummy data
require("./dummyData")(db);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
