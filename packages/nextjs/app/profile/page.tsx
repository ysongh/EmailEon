"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const Profile: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const { data: profile } = useScaffoldContractRead({
    contractName: "EmailEon",
    functionName: "getProfile",
    args: [connectedAddress],
  });

  const [email, setEmail] = useState(profile?.email || '');
  const [isEditing, setIsEditing] = useState(false);

  const { writeAsync: createProfile} = useScaffoldContractWrite({
    contractName: "EmailEon",
    functionName: "createProfile",
    args: [email],
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    createProfile();
    setIsEditing(false);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-semibold mb-4">Profile</h1>
        <div className="bg-white shadow-md rounded-lg p-6 w-[500px]">
         
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            {isEditing ? (
              <input 
                type="email" 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
              />
            ) : (
              <p id="email" className="mt-1 text-lg font-semibold text-gray-900">{profile?.email}</p>
            )}
          </div>
          {isEditing ? (
            <button 
              onClick={handleSaveClick} 
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
            >
              Save
            </button>
          ) : (
            <button 
              onClick={handleEditClick} 
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
