import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "./Button";
import { CircleUserRound } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(true);

  const User = [
    {
      email: "himalayasingh337@gmail.com",
      username: "Himalaya337",
    },
  ];

  return (
    <div className="p-10 flex justify-center">
      <div className="bg-gray-800 rounded-lg shadow-md w-96 p-6">
        <h2 className="text-xl text-white text-center font-semibold mb-4">
          User Profile
        </h2>
        {user ? (
          <div className=" bg-white p-4 rounded-lg">
            <div className="flex flex-col items-center mb-10 gap-4">
              <CircleUserRound size={100} />
              <Button />
            </div>
              <div className="space-y-2">
                <p>
                  <strong>Email:</strong> himalayasingh337@gmail.com
                </p>
                <p>
                  <strong>Username:</strong> Himalaya337
                </p>
              </div>
              
            </div>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
