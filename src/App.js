import { Route, Routes, Link } from 'react-router-dom';
import { Home } from './components/Home';
import { Block } from './components/Block';
import { Transaction } from './components/Transaction'
import { Address } from './components/Address'
import { BlockTransactions } from './components/BlockTransactions';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container} from 'react-bootstrap';
import './App.css';


function App() {
  return (
    <div>
      <Container>
        <div className="Title"><Link to={"/"}>Ethereum Block Explorer</Link></div>
        

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/block/:id" element={<Block />}/>
          <Route path="/transaction/:id" element={<Transaction />}/>
          <Route path="/address/:id" element={<Address />}/>
          <Route path="/blockTransactions/:id" element={<BlockTransactions />}/>
        </Routes>
      </Container>
    </div>
  );
}

export default App;

