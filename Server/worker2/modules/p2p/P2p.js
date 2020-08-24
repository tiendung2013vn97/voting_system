const wrtc = require("wrtc");
const Exchange = require("peer-exchange");
const p2p = new Exchange("Blockchain Demo 2.0", { wrtc: wrtc });
const net = require("net");
const messageType = require("./message-type.js");
const {
  REQUEST_LATEST_BLOCK,
  RECEIVE_LATEST_BLOCK,
  REQUEST_BLOCKCHAIN,
  RECEIVE_BLOCKCHAIN,
  MINE_BLOCK
} = messageType;
const Messages = require("./Messages.js");

class PeerToPeer {
  constructor(blockchain) {
    this.peers = [];
    this.blockchain = blockchain;
  }

  startServer(port) {
    const server = net
      .createServer(socket =>
        p2p.accept(socket, (err, conn) => {
          if (err) {
            console.log(`ERROR: Connect to peer failed!`)
          } else {
            console.log(`INFO: Connect to peer successfully!`)
            this.initConnection.call(this, conn);
          }
        })
      )
      .listen(port);
  }

  connectToPeer(host, port) {
    const socket = net.connect(port, host, () =>
      p2p.connect(socket, (err, conn) => {
        if (err) {
          console.log("ERROR: Connect to peer fail!:", err)
          throw err
        } else {
          this.initConnection.call(this, conn);
          console.log("INFO: Connected!")
        }
      })
    );
  }

  closeConnection() {
    p2p.close(err => {
      console.log("ERROR: Close connection fail!:", err)
    });
  }

  // broadcastLatest() {
  //   this.broadcast(Messages.sendLatestBlock(this.blockchain.latestBlock));
  // }

  broadcastMineBlock(data) {
    this.broadcast(Messages.mineBlock(data))
  }

  broadcast(message) {
    this.peers.forEach(peer => this.write(peer, message));
  }

  write(peer, message) {
    peer.write(JSON.stringify(message));
  }

  initConnection(connection) {
    this.peers.push(connection);
    this.initMessageHandler(connection);
    this.initErrorHandler(connection);
    this.write(connection, Messages.getLatestBlock());
  }

  initMessageHandler(connection) {
    connection.on("data", data => {
      const message = JSON.parse(data.toString("utf8"));
      this.handleMessage(connection, message);
    });
  }

  initErrorHandler(connection) {
    connection.on("error", err => {
      console.log("ERROR:", err)
    });
  }

  handleMessage(peer, message) {
    switch (message.type) {
      case REQUEST_LATEST_BLOCK:
        this.write(peer, Messages.sendLatestBlock(this.blockchain.latestBlock));
        break;
      case REQUEST_BLOCKCHAIN:
        this.write(peer, Messages.sendBlockchain(this.blockchain.get()));
        break;
      case RECEIVE_LATEST_BLOCK:
        this.handleReceivedLatestBlock(message, peer);
        break;
      case RECEIVE_BLOCKCHAIN:
        this.handleReceivedBlockchain(message, peer);
        break;
      case MINE_BLOCK:
        this.handleMineBlock(message, peer);
        break;
      default:
        console.log("ERROR: Received invalid message.")
    }
  }

  handleMineBlock(message, peer) {
    let data = message.data
    try {
      this.blockchain.mine(data);
      this.write(peer, Messages.sendLatestBlock(this.blockchain.latestBlock))
      console.log("INFO: Mined block successfully!")
    } catch (error) {
      console.log("ERROR: Mined block failed!:", error)
    }

  }

  handleReceivedLatestBlock(message, peer) {
    const receivedBlock = message.data;
    const latestBlock = this.blockchain.latestBlock;

    if (latestBlock.hash === receivedBlock.previousHash) {
      try {
        this.blockchain.addBlock(receivedBlock);
      } catch (err) {
        console.log("ERROR: Add block fail!:", err)
      }
      this.write(peer, Messages.sendLatestBlock(this.blockchain.latestBlock))
    } else if (receivedBlock.index > latestBlock.index) {
      this.write(peer, Messages.getBlockchain());
    } else {
      // Do nothing.
    }
  }

  handleReceivedBlockchain(message, peer) {
    const receivedChain = message.data;

    try {
      this.blockchain.replaceChain(receivedChain);
      this.write(peer, Messages.sendBlockchain(this.blockchain.get()))
    } catch (err) {
      console.log("ERROR: Replace chain fail!:", err)
    }
  }
}

module.exports = PeerToPeer;
