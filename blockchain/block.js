const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(timeStamp, lastHash, hash, data) {
        this.timeStamp = timeStamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

    toString() {
        return `Block - 
            Timestamp: ${this.timeStamp}
            Last hash: ${this.lastHash}
            Hash: ${this.hash}
            Data: ${this.data}`;
    }

    static genesis() {
        return new this("Genesis time", "----N/A----", "adas321asda", []);
    }

    isGenesis() {

        let result = false;

        const genesis = Block.genesis();
  
        if (this.timeStamp == genesis.timeStamp
            && this.lastHash == genesis.lastHash
            && this.hash == genesis.hash
            && this.data === undefined || this.data.length == 0) {
                result = true;
        }

        return result;
    }

    isHashValid() {

        return Block.hash(this.timeStamp, this.lastHash, this.data) == this.hash;
    }

    static mineBlock(lastBlock, data) {
        const timeStamp = Date.now();
        const lastHash = lastBlock.hash;
        const hash = Block.hash(timeStamp, lastHash, data);

        return new Block(timeStamp, lastHash, hash, data);
    }

    static hash(timeStamp, lastHash, data) {

        return SHA256(`${timeStamp}${lastHash}${data}`).toString();
    }
}


module.exports = Block;