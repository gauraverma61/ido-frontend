import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const supportedChains = [
  {
    chain: "Ethereum",
    projects: 3,
    participants: 15000,
    liquidityRaised: 10000000,
    valuesLocked: 50000000,
  },
  {
    chain: "BNB)",
    projects: 3,
    participants: 12000,
    liquidityRaised: 8000000,
    valuesLocked: 40000000,
  },
  {
    chain: "Solana",
    projects: 3,
    participants: 10000,
    liquidityRaised: 6500000,
    valuesLocked: 35000000,
  },
  {
    chain: "Polkadot",
    projects: 3,
    participants: 8000,
    liquidityRaised: 5000000,
    valuesLocked: 30000000,
  },
  {
    chain: "Avalanche",
    projects: 3,
    participants: 9000,
    liquidityRaised: 4500000,
    valuesLocked: 25000000,
  },
  {
    chain: "Cardano",
    projects: 3,
    participants: 7500,
    liquidityRaised: 4000000,
    valuesLocked: 20000000,
  },
];

const SupportedChains = () => {
  return (
    <div className=" container mx-auto px-6 py-12 md:py-20">
      <h1 className=" text-white font-bold text-3xl md:text-4xl mb-8">
        Supported Chains
      </h1>
      <div className=" bg-dark-1 w-full rounded-xl text-white py-5 px-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-violet-4 text-lg">Chain</TableHead>
              <TableHead className="text-violet-4 text-lg">Projects</TableHead>
              <TableHead className="text-violet-4 text-lg">
                Participants
              </TableHead>
              <TableHead className="text-violet-4 text-lg">
                LiquidityRaised
              </TableHead>
              <TableHead className="text-violet-4 text-lg">
                ValuesLocked
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {supportedChains.map((chain, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{chain.chain}</TableCell>
                <TableCell>{chain.projects}</TableCell>
                <TableCell>{chain.participants}</TableCell>
                <TableCell>{chain.liquidityRaised}</TableCell>
                <TableCell className="">{chain.valuesLocked}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SupportedChains;
