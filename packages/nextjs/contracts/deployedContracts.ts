/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
  31337: {
    EmailEon: {
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      abi: [
        {
          inputs: [],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_storeId",
              type: "string",
            },
            {
              internalType: "string",
              name: "_secretName",
              type: "string",
            },
          ],
          name: "addEmail",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "emails",
          outputs: [
            {
              internalType: "string",
              name: "storeId",
              type: "string",
            },
            {
              internalType: "string",
              name: "secretName",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_owner",
              type: "address",
            },
          ],
          name: "getEmails",
          outputs: [
            {
              components: [
                {
                  internalType: "string",
                  name: "storeId",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "secretName",
                  type: "string",
                },
              ],
              internalType: "struct EmailEon.Email[]",
              name: "",
              type: "tuple[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      inheritedFunctions: {},
    },
  },
} as const;

export default deployedContracts satisfies GenericContractsDeclaration;
