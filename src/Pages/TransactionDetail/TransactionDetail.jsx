import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./TransactionDetail.css";
import * as bootstrap from "bootstrap";
window.bootstrap = bootstrap;

function TransactionDetail() {
  const { hash } = useParams();

  const [transactionDetail, setTransactionDetail] = useState([]);

  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  const { Alchemy, Network, Utils } = require("alchemy-sdk");

  const config = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };

  const alchemy = new Alchemy(config);

  

  useEffect(() => {

    async function getTransactionReceipt() {
      let temparr = [];
      let response = await alchemy.core.getTransactionReceipt(hash);
      // console.log(response);
      // temparr = response;
  
      temparr.gasprice = Utils.formatUnits(
        response.effectiveGasPrice._hex,
        "gwei"
      );
      temparr.transactionfees = Utils.formatUnits(
        response.effectiveGasPrice._hex * response.gasUsed._hex,
        "ether"
      );
      temparr.transactionHash = response.transactionHash;
      temparr.blockNumber = response.blockNumber;
      temparr.confirmations = response.confirmations;
      temparr.from = response.from;
      temparr.to = response.to;
      temparr.status = response.status;
      return temparr;
    }

    async function initialLoad() {
      let arr = await getTransactionReceipt();
      setTransactionDetail(arr);
    }
    initialLoad();
  }, []);

  return (
    <div className="transaction-main">
      <div className="container">
        <div className="row">
          <div className="transaction-detail">
            <div className="transaction-detail-1">
              <div className="col-md-3 transaction-detail-text">
                <span>
                  <i
                    class="fa fa-circle-question me-2 tooltip-text"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="A TxHash or transaction hash is a unique 66-character identifier that is generated whenever a transaction is executed."
                  />
                  Transaction Hash:
                </span>
                <span>
                  <i
                    class="fa fa-circle-question me-2 tooltip-text"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="The status of the transaction."
                  />
                  Status:
                </span>
                <span>
                  <i
                    class="fa fa-circle-question me-2 tooltip-text"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Number of the block in which the transaction is recorded. Block confirmations indicate how many blocks have been added since the transaction was produced."
                  />
                  Block:
                </span>
              </div>
              <div className="col-md-9 transaction-detail-text">
                <span>
                  {transactionDetail.transactionHash}&nbsp;&nbsp;
                  <i
                    class="fa fa-copy"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Copy Address"
                  ></i>
                </span>
                <span
                  class="badge bg-success bg-opacity-10 border border-success border-opacity-25 text-green-600 fw-medium py-1.5 px-2 ms-1 status-btn"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="A Status code indicating if the top-level call succeeded or failed (applicable for Post BYZANTIUM blocks only)"
                >
                  <i class="fa fa-check-circle"></i> {transactionDetail.status == 1 ? 'Success' : 'Failed'}
                </span>
                <span>
                  <i
                    class="fa fa-check-circle bg-opacity-10 text-green-300 status-btn"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="A Status code indicating if the top-level call succeeded or failed (applicable for Post BYZANTIUM blocks only)"
                  ></i>{" "}
                  <Link
                    className="link-text"
                    to={`/block/${transactionDetail.blockNumber}`}
                  >
                    {transactionDetail.blockNumber}
                  </Link>
                  <button className="btn">
                    {transactionDetail.confirmations} Block Confirmation
                  </button>
                </span>
              </div>
            </div>
            <hr />
            <div className="transaction-detail-2">
              <div className="col-md-3 transaction-detail-text">
                <span>
                  <i
                    class="fa fa-circle-question me-2 tooltip-text"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="The sending party of the transaction."
                  />
                  From:
                </span>
                <span>
                  <i
                    class="fa fa-circle-question me-2 tooltip-text"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="The receiving party of the transaction (could be a contract address)."
                  />
                  To:
                </span>
              </div>
              <div className="col-md-9 transaction-detail-text">
                <span>
                  <Link className="link-text" to={"/Coming"}>
                    {transactionDetail.from}&nbsp;&nbsp;
                  </Link>
                  <i
                    class="fa fa-copy"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Copy Address"
                  ></i>
                </span>
                <span>
                  <Link className="link-text" to={"/Coming"}>
                    {transactionDetail.to}&nbsp;&nbsp;
                  </Link>
                  <i
                    class="fa fa-copy"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Copy Address"
                  ></i>
                </span>
              </div>
            </div>
            <hr />
            <div className="transaction-detail-3">
              <div className="col-md-3 transaction-detail-text">
                <span>
                  <i
                    class="fa fa-circle-question me-2 tooltip-text"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Amount paid to the block producer for processing the transaction."
                  />
                  Transaction Fee:
                </span>
                <span>
                  <i
                    class="fa fa-circle-question me-2 tooltip-text"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Cost per unit of gas specified for the transaction, in Ether and Gwei. The higher the gas price the higher chance of getting included in a block."
                  />
                  Gas Price:
                </span>
              </div>
              <div className="col-md-9 transaction-detail-text">
                <span>{transactionDetail.transactionfees} ETH</span>
                <span>{transactionDetail.gasprice} Gwei</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionDetail;
