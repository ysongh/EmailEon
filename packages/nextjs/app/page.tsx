"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { CircleStackIcon, GlobeAmericasIcon, UserMinusIcon } from "@heroicons/react/24/outline";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-4xl font-bold">EmailEon</span>
          </h1>
          <p className="text-center text-lg">
            Decentralized Email Marketing Platform
          </p>
        </div>

        <Link href="/dashboard" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Get Started
        </Link>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <GlobeAmericasIcon className="h-8 w-8 fill-secondary" />
              <p className="text-xl">
                Decentralized
              </p>
              <p className="mt-0 text-gray-500">
                Each email address is encrypted and can only be access between two parties
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <UserMinusIcon className="h-8 w-8 fill-secondary" />
              <p className="text-xl">
                No Middle Man
              </p>
              <p className="mt-0 text-gray-500">
                EmailEon does not access your user email address list or the content within
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <CircleStackIcon className="h-8 w-8 fill-secondary" />
              <p className="text-xl">
                Ownership of data
              </p>
              <p className="mt-0 text-gray-500">
                You retain control of the user email list
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
