"use client";

import { useEffect, useState } from 'react';
import { useAccount } from "wagmi";
import { useScaffoldContractRead } from '~~/hooks/scaffold-eth';
import { getUserKeyFromSnap } from "~~/utils/nillion/getUserKeyFromSnap";
import { retrieveSecretBlob } from '~~/utils/nillion/retrieveSecretBlob';
import Spinner from '~~/components/Spinner';
import TextInput from '~~/components/common/TextInput';

const EmailForm = () => {
  const { address: connectedAddress } = useAccount();

  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [userKey, setUserKey] = useState<string | null>(null);
  const [connectedToSnap, setConnectedToSnap] = useState<boolean>(false);
  const [nillion, setNillion] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [nillionClient, setNillionClient] = useState<any>(null);
  const [loading, setLoading] = useState<Boolean | null>(false);

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

  const handleSubmitEmail = async (event: any) => {
    try{
      event.preventDefault();
      setLoading(true);

      const newEmail = await retrieveSecretBlob(nillionClient, emails[0].storeId, emails[0].secretName);
      const response = await fetch('/api/email/send', {
        method: 'POST',
        body: JSON.stringify({ 
          toEmail: newEmail,
          subject,
          message,
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      })
      console.log(response);
      console.log('Subject:', subject);
      console.log('Message:', message);
      setSubject('');
      setMessage('');
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow w-[500px]">
      {connectedAddress && !connectedToSnap && (
        <button className="btn btn-sm btn-primary mt-4" onClick={handleConnectToSnap}>
          Connect to Snap with your Nillion User Key
        </button>
      )}
      <h2 className="text-lg font-semibold mb-4">Send Email</h2>
      <form onSubmit={handleSubmitEmail}>
        <div className="mb-4">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject:</label>
          <TextInput
            value={subject}
            setValue={setSubject}
            isDisabled={false}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>
        {!loading
          ? <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-blue:100" disabled={!subject || !message}>
              Send Email
            </button>
          : <Spinner />
        }
      </form>
    </div>
  );
};

export default EmailForm;
