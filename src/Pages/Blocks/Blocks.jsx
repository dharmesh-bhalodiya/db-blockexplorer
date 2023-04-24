import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Blocks.css";
import { Alchemy, Network, Utils } from "alchemy-sdk";
import axios from "axios";
import * as bootstrap from "bootstrap";
window.bootstrap = bootstrap;

function Blocks() {
  const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };
  const url = `https://eth-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`;
  const alchemy = new Alchemy(settings);

  const [blockNumber, setBlockNumber] = useState();
  const [blockList, setBlockList] = useState([]);

 

  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  useEffect(() => {

    async function getBlockNumber() {
      const blockNumber = await alchemy.core.getBlockNumber();
      setBlockNumber(blockNumber);
      let temparr = [];
      for (let index = 0; index < 10; index++) {
        temparr.push({ blocknumber: Number(blockNumber) - index });
      }
  
      const batch = temparr.map((addr, i) => ({
        jsonrpc: "2.0",
        id: i,
        method: "eth_getBlockByNumber",
        params: ["0x" + addr.blocknumber.toString(16), false],
      }));
  
      const response = await axios.post(url, batch);
      //console.log(response);
  
      response.data.map((item, i) => {
        console.log(item);
        temparr[i].timestamp = new Date(
          Number(item.result.timestamp) * 1000
        ).toLocaleTimeString();
        temparr[i].txn = Number(item.result.transactions.length);
        temparr[i].gasused = Number(item.result.gasUsed);
        temparr[i].gaslimit = Number(item.result.gasLimit);
        temparr[i].basefee = Utils.formatUnits(item.result.baseFeePerGas, "gwei");
        //temparr[i].burntfee = item.result.gasUsed * item.result.baseFeePerGas;
        temparr[i].size = item.result.size;
        // temparr[i].burntfee = Utils.formatUnits(
        //   item.result.gasUsed * temparr[i].basefee,
        //   "ether"
        // );
        temparr[i].miner = item.result.miner;
        return temparr[i];
      });
      //console.log("temp arr", temparr);
      return temparr;
    }

    async function initialLoad() {
      let arr = await getBlockNumber();
      setBlockList(arr);
    }
    initialLoad();
  }, []);

  const basefee = (baseFee) => {
    // console.log(Number(baseFee));
    // console.log(Number(baseFee).slice(0, 4));
    // console.log(typeof baseFee);
  };

  const gasusedStringSlice = (str) => {
    const first = str.indexOf("(");
    const second = str.indexOf("%");
    return str.slice(first + 1, second);
  };

  const stringSlice = (str) => {
    const originalString = str;
    const modifiedString = originalString.slice(0, 15) + ".....";
    return modifiedString;
  };

  return (
    <div className="container">
      <div className="row">
        <table border="1" className="table table-hover blocks-table">
          <thead>
            <tr>
              <th scope="col">Block</th>
              <th scope="col">Age</th>
              <th scope="col">Txn</th>
              <th scope="col">Gas Used</th>
              <th scope="col">Gas Limit</th>
              <th scope="col">Base Fee</th>
              <th scope="col">Size (bytes)</th>
              <th scope="col">Miner</th>
            </tr>
          </thead>
          <tbody>
            {blockList.map((item, i) => (
              <tr key={i}>
                <td>
                  <Link className="link-text" to={`/block/${item.blocknumber}`}>
                    {item.blocknumber}
                  </Link>
                </td>
                <td>{item.timestamp}</td>
                <td>
                  <Link
                    className="link-text"
                    to={`/transactions/${item.blocknumber}`}
                  >
                    {item.txn}
                  </Link>
                </td>
                <td>{item.gasused}</td>
                <td>{item.gaslimit}</td>
                <td>{item.basefee} Gwei</td>
                <td>{Number(item.size)}</td>
                <td><Link className="link-text" to={`/coming`}>{stringSlice(item.miner)}</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Blocks;
