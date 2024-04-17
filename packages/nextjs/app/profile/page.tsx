"use client";

import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { CopyString } from "~~/components/nillion/CopyString";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { getUserKeyFromSnap } from "~~/utils/nillion/getUserKeyFromSnap";
import TextInput from "~~/components/common/TextInput";

const Profile: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const { data: profile } = useScaffoldContractRead({
    contractName: "EmailEon",
    functionName: "getProfile",
    args: [connectedAddress],
  });

  const [nillion, setNillion] = useState<any>(null);
  const [nillionClient, setNillionClient] = useState<any>(null);
  const [email, setEmail] = useState(profile?.email || '');
  const [isEditing, setIsEditing] = useState(false);
  const [connectedToSnap, setConnectedToSnap] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userKey, setUserKey] = useState<string | null>(null);

  useEffect(() => {
    if (userKey) {
      const getNillionClientLibrary = async () => {
        const nillionClientUtil = await import("~~/utils/nillion/nillionClient");
        const libraries = await nillionClientUtil.getNillionClient(userKey);

        setNillion(libraries.nillion);
        setNillionClient(libraries.nillionClient);

        return libraries.nillionClient;
      };

      getNillionClientLibrary().then(nillionClient => {
        const user_id = nillionClient.user_id;
        setUserId(user_id);
      });
    }
  }, [userKey]);

  const { writeAsync: createProfile} = useScaffoldContractWrite({
    contractName: "EmailEon",
    functionName: "createProfile",
    args: [email, userId || ""],
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  async function handleConnectToSnap() {
    const snapResponse = await getUserKeyFromSnap();
    setUserKey(snapResponse?.user_key || null);
    setConnectedToSnap(snapResponse?.connectedToSnap || false);
  }

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
          {!connectedAddress && <p>Connect your MetaMask Flask wallet</p>}
          {connectedAddress && connectedToSnap && !userKey && (
            <a target="_blank" href="https://nillion-snap-site.vercel.app/" rel="noopener noreferrer">
              <button className="btn btn-sm btn-primary mt-4">
                No Nillion User Key - Generate and store user key here
              </button>
            </a>
          )}
          {connectedAddress && !connectedToSnap && (
            <button className="btn btn-sm btn-primary mt-4" onClick={handleConnectToSnap}>
              Connect to Snap with your Nillion User Key
            </button>
          )}
          {userId && (
            <div className="flex items-center space-x-2">
              <p className="my-2 font-medium">Connected as Nillion User ID:</p>
              <CopyString str={userId} />
            </div>
          )}
          <div className="mt-5 mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            {isEditing ? (
              <TextInput
                value={email} 
                setValue={setEmail}
                isDisabled={false}
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
