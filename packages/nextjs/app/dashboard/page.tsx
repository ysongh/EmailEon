"use client";

import type { NextPage } from "next";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { retrieveSecretBlob } from "~~/utils/nillion/retrieveSecretBlob";

const Dashboard: NextPage = () => {
  const { address } = useAccount();

  const [userKey, setUserKey] = useState<string | null>(null);
  const [nillion, setNillion] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [nillionClient, setNillionClient] = useState<any>(null);
  const [retrievedValue, setRetrievedValue] = useState<string | null>(null);

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

  const { data: emails } = useScaffoldContractRead({
    contractName: "EmailEon",
    functionName: "getEmails",
    args: [address],
  });

  async function handleRetrieveSecretBlob(store_id: string, secret_name: string) {
    await retrieveSecretBlob(nillionClient, store_id, secret_name).then(setRetrievedValue);
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-gray-800 h-full text-white p-4">
        <div className="mb-4">Dashboard</div>
        <ul>
          <Link href={`/email/${address}`} className="text-gray-300 hover:text-white">
            Email
          </Link>
        </ul>
      </div>
      <div className="flex-1">
        <header className="bg-white shadow">
          <div className="container mx-auto py-4 px-4">Dashboard</div>
        </header>
        <main className="container mx-auto py-6 px-4">
          <p>{emails?.length} subscribers</p>
          {emails?.map((e, index) => (
            <p key={index}>{e.secretName} {e.storeId}</p>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
