import { Link, useParams } from "react-router-dom";
import "./Transaction.css";
import { useEffect } from "react";
import { useState } from "react";
import * as bootstrap from "bootstrap";
window.bootstrap = bootstrap;

function Transaction() {
  const { block } = useParams();

  const [transactionData, setTransactionData] = useState([]);

  const { Alchemy, Network, Utils } = require("alchemy-sdk");

  const config = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };

  const alchemy = new Alchemy(config);

  

  const stringSlice = (str) => {
    if(str === null) return "...";
    const originalString = str;
    const modifiedString =  originalString.slice(0, 15) + "....." ;
    return modifiedString;
  };

  useEffect(() => {

    async function getBlockWithTransactions() {
      let temparr = [];
      let txHash = "0x" + Number(block).toString(16);
      let response = await alchemy.core.getBlockWithTransactions(txHash);
  
      for (let index = 0; index < response.transactions?.length; index++) {
        temparr.push({ hash: response.transactions.hash });
      }
      // console.log("response", response.transactions);
      // console.log(temparr);
  
      response.transactions.map((item, i) => {
        temparr[i].hash = item.hash;
        temparr[i].blockNumber = item.blockNumber;
        temparr[i].from = item.from;
        temparr[i].to = item.to;
        temparr[i].value = Utils.formatUnits(item.value?._hex, "ether");
        temparr[i].method = item.type;
        // temparr[i].txnfee = item.
        return temparr[i];
      });
  
      return temparr;
    }

    async function initialLoad() {
      let transactions = await getBlockWithTransactions();
      setTransactionData(transactions);
    }
    initialLoad();
  }, []);

  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  return (
    <div className="container">
      <div className="row">
        <table border="1" class="table table-hover">
          <thead>
            <tr>
              <th scope="col">
                <i
                  class="fa fa-circle-question"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="See preview of the transaction detail"
                ></i>
              </th>
              <th scope="col">Txn Hash</th>
              <th scope="col">Method</th>
              <th scope="col">Block</th>

              <th scope="col">From</th>
              <th scope="col">To</th>
              <th scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            {transactionData.map((dataItem, index) => (
              <>
                <tr key={index}>
                  <td>
                    <i class="fa fa-eye"></i>
                  </td>
                  <td>
                    <Link
                      className="link-text"
                      to={`/transactiondetail/${dataItem.hash}`}
                    >
                      {stringSlice(dataItem.hash)}
                    </Link>
                  </td>
                  <td>
                    <span className="btn btn-sm">{dataItem.method}</span>
                  </td>
                  <td>
                    <Link
                      className="link-text"
                      to={`/block/${dataItem.blockNumber}`}
                    >
                      {dataItem.blockNumber}
                    </Link>
                  </td>
                  <td>
                    <Link className="link-text" to={"/Coming"}>
                      {stringSlice(dataItem.from)}
                    </Link>
                  </td>
                  <td>
                    <Link className="link-text" to={"/Coming"}>
                      {stringSlice(dataItem.to)}
                    </Link>
                  </td>
                  <td>{dataItem.value} ETH</td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transaction;
