import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { alchemy } from "./Home";
import { formatEther } from 'ethers/lib/utils';
import { Table, Container} from "react-bootstrap";

export function Address() {
    const { id } = useParams();
    const [balance, setBalance] = useState("");
    const [tokens, setTokens] = useState([]);

    useEffect(() => {
        const getAddress = async () => {
            const balance = await alchemy.core.getBalance(id, "latest");
            setBalance(formatEther(balance));
        }

        getAddress();
    }, [id]);

    return (
        <>
            <Container>
                <br/>
                <h3>Address</h3>
                <Table striped bordered responsive>
                    <thead></thead>
                        <tbody>
                            <tr>
                                <td>Address: </td>
                                <td>{id}</td>
                            </tr>
                            <tr>
                                <td>Balance:</td>
                                <td>{balance.slice(0,7)} ETH</td>
                            </tr>
                        </tbody>
                </Table>
            </Container>
        </>
    )
}