"use client";

import type { NextPage } from "next";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { retrieveSecretBlob } from "~~/utils/nillion/retrieveSecretBlob";
import { nillionConfig } from "~~/utils/nillion/nillionConfig";
import { CopyString } from "~~/components/nillion/CopyString";
import { getUserKeyFromSnap } from "~~/utils/nillion/getUserKeyFromSnap";

const Dashboard: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const [userKey, setUserKey] = useState<string | null>(null);
  const [nillion, setNillion] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [nillionClient, setNillionClient] = useState<any>(null);
  const [retrievedValue, setRetrievedValue] = useState<string | null>(null);
  const [connectedToSnap, setConnectedToSnap] = useState<boolean>(false);

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

  async function handleConnectToSnap() {
    const snapResponse = await getUserKeyFromSnap();
    setUserKey(snapResponse?.user_key || null);
    setConnectedToSnap(snapResponse?.connectedToSnap || false);
  }

  const { data: emails } = useScaffoldContractRead({
    contractName: "EmailEon",
    functionName: "getEmails",
    args: [connectedAddress],
  });

  const { data: subscribeTo } = useScaffoldContractRead({
    contractName: "EmailEon",
    functionName: "getSubscribeTo",
    args: [connectedAddress],
  });

  const { data: hasProfile } = useScaffoldContractRead({
    contractName: "EmailEon",
    functionName: "getHasProfile",
    args: [connectedAddress],
  });

  async function handleRetrieveSecretBlob(store_id: string, secret_name: string) {
    await retrieveSecretBlob(nillionClient, store_id, secret_name).then(setRetrievedValue);
  }

  async function handledDeleteSecrets(store_id: string) {
    console.log(nillionClient);
    await nillionClient.delete_secrets(nillionConfig.cluster_id, store_id);
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-gray-800 h-full text-white p-4">
        <div className="mb-4">Dashboard</div>
        <ul className="flex flex-col">
          <Link href={`/email/send`} className="text-gray-300 hover:text-white mb-3">
            Send Email
          </Link>
          <Link href="/profile" className="text-gray-300 hover:text-white">
            Profile
          </Link>
        </ul>
      </div>
      <div className="flex-1">
        <header className="bg-white shadow">
          <div className="container mx-auto py-4 px-4">
            Welcome User
          </div>
        </header>
        <main className="container mx-auto py-2 px-4">
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
          <h2 className="text-2xl mt-5">Subscriptions</h2>
          {subscribeTo?.map((s, index) => (
            <p key={index}>
              {s.email} {s.storeId} <button onClick={() => handledDeleteSecrets(s.storeId)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Delete
              </button>
            </p>
          ))}
          {!subscribeTo?.length && <p className="text-red-500">No Subscription Yet...</p>}
          <hr className="mb-4"></hr>
          {hasProfile ? (
            <div>
              <Link href={`/email/${connectedAddress}`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Collect Email
              </Link>
              <p>{emails?.length} subscribers</p>
              {emails?.map((e, index) => (
                <p key={index}>{e.secretName} {e.storeId}</p>
              ))}
            </div>
          ) : (
            <div>
              <h2 className="mb-5">You need a profile</h2>
              <Link href="/profile" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Creat Profile Now
              </Link>
            </div>
           
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
