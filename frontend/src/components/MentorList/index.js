import React from "react";
import "./index.css";

const MentorList = ({ mentors, onSelect }) => {
  return (
    <div className="mentor-container">
      {mentors.length === 0 ? (
        <p className="no-mentors">No mentors available.</p>
      ) : (
        mentors.map((mentor) => (
          <div
            className="mentor-card"
            key={mentor.id}
            onClick={() => onSelect(mentor)}
          >
            <h3>{mentor.name}</h3>
            <p>Areas of Expertise: {mentor.areas_of_expertise}</p>
            <p>{mentor.is_premium ? "Premium Mentor" : "Standard Mentor"}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MentorList;
