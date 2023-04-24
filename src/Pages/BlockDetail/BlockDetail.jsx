import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./BlockDetail.css";
import * as bootstrap from "bootstrap";
import { Alchemy, Network, Utils } from "alchemy-sdk";

window.bootstrap = bootstrap;

function BlockDetail() {
  const { block } = useParams();

  const [blockInfo, setBlockInfo] = useState({});

  const config = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };

  const alchemy = new Alchemy(config);

  async function getBlock() {
    let temparr = [];
    let txHash = "0x" + Number(block).toString(16);
    let response = await alchemy.core.getBlock(txHash);
    // setBlockInfo(response);
    temparr = response;
    temparr.timestamp = new Date(
      Number(temparr.timestamp) * 1000
    ).toLocaleTimeString();

    //console.log(temparr);
    return temparr;
  }

  useEffect(() => {
    async function initialLoad() {
      let arr = await getBlock();
      setBlockInfo(arr);
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
    <div className="block-main">
      <div className="container">
        <div className="row">
          <div className="block-detail">
            <div className="block-detail-1">
              <div className="col-md-3 block-detail-text">
                <span>
                  <i
                    class="fa fa-circle-question me-2 tooltip-text"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Also known as Block Number. The block height, which indicates the length of the blockchain, increases after the addition of the new block."
                  />
                  Block Height:
                </span>
                <span>
                  <i
                    class="fa fa-circle-question me-2 tooltip-text"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="The date and time at which a block is produced."
                  />
                  Timestamp:
                </span>
                <span>
                  <i
                    class="fa fa-circle-question me-2 tooltip-text"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Slot and epoch this block is proposed on."
                  />
                  Proposed On:
                </span>
                <span>
                  <i
                    class="fa fa-circle-question me-2 tooltip-text"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="The number of transactions in the block. Internal transaction is transactions as a result of contract execution that involves Ether value."
                  />
                  Transactions:
                </span>
                <span>
                  <i
                    class="fa fa-circle-question me-2 tooltip-text"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Number of beacon withdrawals in this block"
                  />
                  Withdrawals:
                </span>
              </div>
              <div className="col-md-9 block-detail-text">
                <span>{blockInfo.number}</span>
                <span>
                  <i class="far fa-clock small me-1"></i>
                  {blockInfo.timestamp}
                </span>
                <span>
                  Block proposed on slot
                  <Link className="link-text"> {blockInfo.slot}</Link>, epoch
                  <Link className="link-text">{blockInfo.epoch}</Link>
                </span>
                <span>
                  <Link
                    className="link-text"
                    to={`/transactions/${blockInfo.number}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                  >
                    {blockInfo.transactions?.length} transactions
                  </Link>
                </span>
                <span>
                  <Link
                    className="link-text"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Click to view withdrawals"
                  >
                    {blockInfo.withdrawals} withdrawals
                  </Link>
                  &nbsp;in this block
                </span>
              </div>
            </div>
            <hr />
            <div className="block-detail-2">
              <div className="col-md-3 block-detail-text">
                <span>
                  <i
                    class="fa fa-circle-question me-2 tooltip-text"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Address receiving fees from transactions in this block"
                  />
                  Fee Recipient:
                </span>
                <span>
                  <i
                    class="fa fa-circle-question me-2 tooltip-text"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="For each block, the block producer is rewarded with a finite amount of Ether on top of the fees paid for all transactions in the block."
                  />
                  Block Reward:
                </span>
                <span>
                  <i
                    class="fa fa-circle-question me-2 tooltip-text"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Total difficulty of the chain until this block."
                  />
                  Total Difficulty:
                </span>
              </div>
              <div className="col-md-9 block-detail-text">
                <span>
                  <Link
                    className="link-text"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    to={"/Coming"}
                  >
                    {blockInfo.miner}&nbsp;&nbsp;
                  </Link>
                  <i
                    class="fa fa-copy"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Copy Address"
                  ></i>
                </span>
                <span>{"Null"}</span>
                <span>{blockInfo.difficulty}</span>
              </div>
            </div>
            <hr />
            <div className="block-detail-3">
              <div className="col-md-3 block-detail-text">
                <span>
                  <i
                    class="fa fa-circle-question me-2 tooltip-text"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="The total gas used in the block and its percentage of gas filled in the block."
                  />
                  Gas Used:
                </span>
                <span>
                  <i
                    class="fa fa-circle-question me-2 tooltip-text"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Total gas limit provided by all transactions in the block."
                  />
                  Gas Limit:
                </span>
                <span>
                  <i
                    class="fa fa-circle-question me-2 tooltip-text"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Post-London Upgrade, this represents the minimum gasUsed multiplier required for a tx to be included in a block. "
                  />
                  Base Fee Per Gas:
                </span>
                <span>
                  <i
                    class="fa fa-circle-question me-2 tooltip-text"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Post-London Upgrade, this represents the part of the tx fee that is burnt: baseFeePerGas * gasUsed."
                  />
                  Burnt Fees:
                </span>
                <span>
                  <i
                    class="fa fa-circle-question me-2 tooltip-text"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Any data that can be included by the block producer in the block."
                  />
                  Extra Data:
                </span>
              </div>
              <div className="col-md-9 block-detail-text">
                <span>{Number(blockInfo.gasUsed?._hex)}</span>
                <span>{Number(blockInfo.gasLimit?._hex)}</span>
                <span>
                  {/* {Utils.formatUnits(blockInfo.baseFeePerGas?._hex, "ether")}{" "}
                  ETH (
                  {Utils.formatUnits(blockInfo.baseFeePerGas?._hex, "gwei")}) */}
                  {Number(blockInfo.baseFeePerGas?._hex)}
                </span>
                <span>
                  🔥 {blockInfo.baseFeePerGas?._hex * blockInfo.gasUsed?._hex}
                </span>
                <span>{blockInfo.extraData}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlockDetail;
