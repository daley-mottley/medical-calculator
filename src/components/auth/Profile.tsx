import React from 'react';

const Profile: React.FC = () => {
  return (
    <div>
      <h2>Profile</h2>
      <p>User Information:</p>
      <ul>
        <li>Name: [User Name]</li>
        <li>Email: [User Email]</li>
        <li>Medical Specialty: [Specialty]</li>
      </ul>
      <h3>Settings</h3>
      <p>[Settings options will go here]</p>
    </div>
  );
};

export default Profile;
