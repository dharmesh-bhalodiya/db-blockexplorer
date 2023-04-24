import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Blocks from "./Pages/Blocks/Blocks";
import BlockDetail from "./Pages/BlockDetail/BlockDetail";
import Transaction from "./Pages/Transaction/Transaction";
import TransactionDetail from "./Pages/TransactionDetail/TransactionDetail";
import FeeRecipient from "./Pages/Fee Recipient/FeeRecipient";
import Coming from "./Pages/Coming/Coming";
import "bootstrap/dist/css/bootstrap.css";
import Breadcrumbs from "./Component/Breadcrumbs/Breadcrumbs";

function App() {
  return (
    <>
    
      <h1 className="text-center mt-5"> <a href="/">Block Explorer </a> </h1>
    

      <BrowserRouter>
        <Breadcrumbs />
        <Switch>
          <Route exact path="/" component={ Blocks }/>
          <Route path="/blocks" component={Blocks} />
          <Route path="/block/:block" component={BlockDetail} />
          <Route path="/transactions/:block" component={Transaction} />
          <Route
            path="/transactiondetail/:hash"
            component={TransactionDetail}
          />
          <Route path="/feerecipient" component={FeeRecipient} />
          <Route path="/coming" component={Coming} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
