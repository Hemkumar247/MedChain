import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

// Pasted actual ABI array here
const CONTRACT_ABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "batchId",
				"type": "string"
			}
		],
		"name": "CounterfeitFlagged",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_batchId",
				"type": "string"
			}
		],
		"name": "flagCounterfeit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "batchId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "newLocation",
				"type": "string"
			}
		],
		"name": "LocationUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "batchId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "location",
				"type": "string"
			}
		],
		"name": "MedicineRegistered",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_batchId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			}
		],
		"name": "registerMedicine",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_batchId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_newLocation",
				"type": "string"
			}
		],
		"name": "updateTransitState",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_batchId",
				"type": "string"
			}
		],
		"name": "getMedicineStatus",
		"outputs": [
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isAuthentic",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]; 

const provider = new ethers.JsonRpcProvider(process.env.POLYGON_AMOY_RPC_URL);
const contractAddress = process.env.CONTRACT_ADDRESS;

let wallet;
let contractWriteOnly;

// Format and check private key to avoid immediate crash if user has not yet put their actual key in .env
const pKey = process.env.PRIVATE_KEY;
if (pKey && pKey !== "your_metamask_private_key" && pKey.trim() !== "") {
    try {
        const formattedKey = pKey.startsWith("0x") ? pKey : `0x${pKey}`;
        wallet = new ethers.Wallet(formattedKey, provider);
        contractWriteOnly = new ethers.Contract(contractAddress, CONTRACT_ABI, wallet);
    } catch (e) {
        console.error("Wallet initialization error:", e.message);
    }
} else {
    console.warn("WARNING: PRIVATE_KEY is missing or invalid in server/.env. On-chain write operations will fail.");
}

export async function triggerCounterfeitFlag(batchId) {
    try {
        if (!contractWriteOnly) {
            throw new Error("Smart contract client not initialized. Check your PRIVATE_KEY in .env");
        }
        const tx = await contractWriteOnly.flagCounterfeit(batchId);
        await tx.wait();
        return true;
    } catch (error) {
        console.error("Blockchain write error:", error);
        return false;
    }
}
