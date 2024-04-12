"use client";

import type { NextPage } from "next";
import Link from 'next/link';
import { useAccount } from "wagmi";

const Dashboard: NextPage = () => {
  const { address } = useAccount();

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
          <div className="container mx-auto py-4 px-4">Header</div>
        </header>
        <main className="container mx-auto py-6 px-4">
          Main Content
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
