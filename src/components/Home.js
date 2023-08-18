import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import {Container, Table} from 'react-bootstrap';
import { formatEther } from "ethers/lib/utils";
import { Link } from 'react-router-dom';

const settings = {
    apiKey: "w5yxjs5mT-zZckb8i5OfW7aDqre_yD-y", 
    network: Network.ETH_MAINNET, 
  };

export const alchemy = new Alchemy(settings);

export function Home() {
    const [latestBlocks, setLatestBlocks] = useState();
    const [blockNumber, setBlockNumber] = useState();
    const [latestTransactions, setLatestTransactions] = useState();

    useEffect(() => {
        let blockArray = [];
        let transactionArray = [];

        const getLatestBlocks = async () => {
            const blockNumber = await alchemy.core.getBlockNumber();
            setBlockNumber(blockNumber);
            for (let i = 0; i < 10; i++) {
                const block = await alchemy.core.getBlock(blockNumber - i);
                blockArray.push(block);
            }
            setLatestBlocks(blockArray);
        }

        const getLatestTransactions = async () => {
            const lastBlock = await alchemy.core.getBlockWithTransactions(blockNumber);
            for (let i = 0; i < 10; i++) {
                transactionArray.push(lastBlock.transactions[i]);
            }
            setLatestTransactions(transactionArray);
        }

        getLatestBlocks();
        getLatestTransactions();
    });

    return (
        <div>
            <Container className="wrapper">
                <br/>
                {!latestBlocks || !latestTransactions ? (
                    <div> Loading ... </div>
                ) : (
                    <>
                    <Container className='latestBlock'>
                        <Table striped responsive hover>
                            <thead>
                                <tr>
                                    <th>Latest Blocks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(latestBlocks.map((block, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>Block: <Link to={`/block/${block.number}`}>{block.number}</Link></td>
                                            <td>Fee recipient <Link to={`/address/${block.miner}`}>{block.miner.slice(0, 10)}...</Link></td>
                                            <td><Link to={`/blockTransactions/${block.number}`}>{block.transactions.length} txns</Link></td>
                                        </tr>
                                    )
                                }))}
                            </tbody>
                        </Table>
                    </Container>
                    <Container className="latestTable">
                        <Table striped responsive hover>
                                <thead>
                                    <tr>
                                        <th>Latest Transactions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(latestTransactions.map((transaction, i) => {
                                        return (
                                            <tr key={i}>
                                                <td><Link to={`/transaction/${transaction.hash}`}>{transaction.hash.slice(0, 15)}...</Link></td>
                                                <td>From: <Link to={`/address/${transaction.from}`}>{transaction.from.slice(0, 15)}...</Link></td>
                                                <td>To: <Link to={`/address/${transaction.to}`}>{transaction.to.slice(0, 15)}...</Link></td>
                                                <td>{formatEther(transaction.value).slice(0, 5)} ETH</td>
                                            </tr>
                                        )
                                    }))}
                                </tbody>
                        </Table>
                    </Container>
                    </>
                )}
            </Container>
        </div>
    )
}
