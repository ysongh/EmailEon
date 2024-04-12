"use client";

import type { NextPage } from "next";
import Link from 'next/link';
import { useAccount } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const Dashboard: NextPage = () => {
  const { address } = useAccount();

  const { data: emails } = useScaffoldContractRead({
    contractName: "EmailEon",
    functionName: "getEmails",
    args: [address],
  });

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
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
