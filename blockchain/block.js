const SHA256 = require('crypto-js/sha256');
const { DIFFICULTY } = require('../config');


class Block {
    constructor(timeStamp, lastHash, hash, data, nonce) {
        this.timeStamp = timeStamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
    }

    static constructFromGenericObject(object) {

        if (object) {
            const block = new Block();

            Object.assign(block, object);

            return block;
        } else {
            return object;
        }
    }

    toString() {
        return `Block - 
            Timestamp: ${this.timeStamp}
            Last hash: ${this.lastHash}
            Hash: ${this.hash}
            Data: ${this.data}
            Nonce: ${this.nonce}`;
    }

    static genesis() {
        return new this("Genesis time", "----N/A----", "adas321asda", [], 0);
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

        return Block.hash(this.timeStamp, this.lastHash, this.data, this.nonce) == this.hash;
    }

    static mineBlock(lastBlock, data) {
        let timeStamp = Date.now();
        const lastHash = lastBlock.hash;
        let hash;
        let nonce = -1;

        do {
            nonce++;
            timeStamp = Date.now();
            hash = Block.hash(timeStamp, lastHash, data, nonce);

        } while(hash.substring(0, DIFFICULTY) !== '0'.repeat(DIFFICULTY));

        return new Block(timeStamp, lastHash, hash, data, nonce);
    }

    static hash(timeStamp, lastHash, data, nonce) {

        return SHA256(`${timeStamp}${lastHash}${data}${nonce}`).toString();
    }
}


module.exports = Block;