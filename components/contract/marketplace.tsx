import Web3 from "web3";
const web3 = new Web3(Web3.givenProvider);

export const marketplaceAddress = "0xAfeB4AB3E12ecFf34538264e9f2C95b2B05bC356";
export const marketplaceABI = [
  {
    inputs: [
      { internalType: "string", name: "concert", type: "string" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "AlreadyListed",
    type: "error",
  },
  {
    inputs: [
      { internalType: "string", name: "concert", type: "string" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "ItemNotExists",
    type: "error",
  },
  { inputs: [], name: "NoProceeds", type: "error" },
  { inputs: [], name: "NotApprovedForMarketplace", type: "error" },
  {
    inputs: [{ internalType: "string", name: "concert", type: "string" }],
    name: "NotListed",
    type: "error",
  },
  { inputs: [], name: "PriceMustBeAboveZero", type: "error" },
  {
    inputs: [
      { internalType: "address", name: "nftAddress", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "uint256", name: "price", type: "uint256" },
    ],
    name: "PriceNotMet",
    type: "error",
  },
  { inputs: [], name: "StartDateMustLowerThanEndDate", type: "error" },
  { inputs: [], name: "TicketSaleEnded", type: "error" },
  { inputs: [], name: "TicketSaleNotStartYet", type: "error" },
  { inputs: [], name: "TicketsAreSelling", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "string",
        name: "concert",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "ItemBought",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "string",
        name: "concert",
        type: "string",
      },
      {
        indexed: true,
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
    ],
    name: "ItemCanceled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "string",
        name: "concert",
        type: "string",
      },
      {
        indexed: true,
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "ItemListed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "nftAddress", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "string", name: "concert", type: "string" },
    ],
    name: "buyItem",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "nftAddress", type: "address" },
      { internalType: "string", name: "concert", type: "string" },
    ],
    name: "cancelListingConcert",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllConcerts",
    outputs: [{ internalType: "string[]", name: "", type: "string[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "concert", type: "string" }],
    name: "getConeptByCid",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "start_date", type: "uint256" },
          { internalType: "uint256", name: "end_date", type: "uint256" },
          { internalType: "uint256", name: "price", type: "uint256" },
          { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
        ],
        internalType: "struct Marketplace.Concert",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "concert", type: "string" }],
    name: "getCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "seller", type: "address" }],
    name: "getProceeds",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "concert", type: "string" }],
    name: "getTotal",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "nftAddress", type: "address" },
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
      { internalType: "uint256", name: "price", type: "uint256" },
      { internalType: "string", name: "concert", type: "string" },
      { internalType: "uint256", name: "start_date", type: "uint256" },
      { internalType: "uint256", name: "end_date", type: "uint256" },
    ],
    name: "listItem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "nftAddress", type: "address" },
      { internalType: "uint256", name: "newPrice", type: "uint256" },
      { internalType: "string", name: "concert", type: "string" },
    ],
    name: "updatePrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawProceeds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// Connect to smart contract
// @ts-ignore
export const marketplaceContract = new web3.eth.Contract(
  // @ts-ignore
  marketplaceABI,
  marketplaceAddress
);
