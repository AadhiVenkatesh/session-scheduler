module.exports = function (db) {
  // Insert dummy data for mentors
  const mentorData = [
    {
      name: "Dr. Emma Thomas",
      areas_of_expertise: "Marketing",
      is_premium: 1,
      availability: "Monday, Wednesday",
    },
    {
      name: "Prof. William White",
      areas_of_expertise: "Finance",
      is_premium: 0,
      availability: "Tuesday, Thursday",
    },
    {
      name: "Dr. Sophia Martinez",
      areas_of_expertise: "Entrepreneurship",
      is_premium: 1,
      availability: "Friday, Saturday",
    },
    {
      name: "Prof. Daniel Rodriguez",
      areas_of_expertise: "Data Analytics",
      is_premium: 0,
      availability: "Wednesday, Friday",
    },
    {
      name: "Dr. Emily Miller",
      areas_of_expertise: "Leadership",
      is_premium: 1,
      availability: "Monday, Tuesday",
    },
    {
      name: "Prof. Jacob Martinez",
      areas_of_expertise: "Operations",
      is_premium: 0,
      availability: "Thursday, Friday",
    },
    {
      name: "Dr. Madison Harris",
      areas_of_expertise: "Supply Chain Management",
      is_premium: 1,
      availability: "Monday, Saturday",
    },
    {
      name: "Prof. Benjamin Clark",
      areas_of_expertise: "Marketing",
      is_premium: 0,
      availability: "Wednesday, Thursday",
    },
    {
      name: "Dr. Abigail Hall",
      areas_of_expertise: "Finance",
      is_premium: 1,
      availability: "Tuesday, Friday",
    },
    {
      name: "Prof. James Allen",
      areas_of_expertise: "Data Analytics",
      is_premium: 0,
      availability: "Monday, Thursday",
    },
    {
      name: "Dr. Charlotte Young",
      areas_of_expertise: "Entrepreneurship",
      is_premium: 1,
      availability: "Wednesday, Saturday",
    },
    {
      name: "Prof. Ethan King",
      areas_of_expertise: "Leadership",
      is_premium: 0,
      availability: "Friday, Sunday",
    },
    {
      name: "Dr. Isabella Wright",
      areas_of_expertise: "Operations",
      is_premium: 1,
      availability: "Tuesday, Wednesday",
    },
    {
      name: "Prof. Alexander Scott",
      areas_of_expertise: "Supply Chain Management",
      is_premium: 0,
      availability: "Thursday, Sunday",
    },
    {
      name: "Dr. Mia Lewis",
      areas_of_expertise: "Marketing",
      is_premium: 1,
      availability: "Monday, Thursday",
    },
    {
      name: "Prof. Lucas Walker",
      areas_of_expertise: "Finance",
      is_premium: 0,
      availability: "Wednesday, Saturday",
    },
  ];

  mentorData.forEach((mentor) => {
    db.run(
      `INSERT INTO mentors (name, areas_of_expertise, is_premium, availability) VALUES (?, ?, ?, ?)`,
      [
        mentor.name,
        mentor.areas_of_expertise,
        mentor.is_premium,
        mentor.availability,
      ]
    );
  });

  console.log("Inserted dummy data into students and mentors tables.");
};
