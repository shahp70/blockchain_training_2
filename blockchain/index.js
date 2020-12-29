const { boolean } = require('yargs');
const Block = require('./block');

class BlockChain {

    constructor() {
        this.chain = [Block.genesis()];
    }

    

    addBlock(data) {
        this.chain.push(Block.mineBlock(
            this.chain[this.chain.length - 1], data
        ));

        return this.chain[this.chain.length - 1];
    }

    isValidChain() {

        let result = false;

        if (this.chain.length > 0) {

            result = true;

            for (let index = 1;index < this.chain.length;index++) {

                const previousBlock = this.chain[index - 1];

                if (previousBlock.hash == this.chain[index].lastHash
                    && Block.constructFromGenericObject(this.chain[index]).isHashValid()) {
                    result = true;
                } else {
                    
                    result = false;
                    break;
                }
            }
        }

        return result;
    }

    replaceChain(newChain) {

        if (newChain) {

            const newBlockchain = new BlockChain();
            newBlockchain.chain = newChain;

            if (newChain.length <= this.chain.length) {
                console.log('New chain is not longer than existing chain, hence the chain will not be replaced.');
                return;
            } else if (!newBlockchain.isValidChain()) {
                console.log('New chain is invalid, hence existing chain will not be replaced.');
                return;
            }

            this.chain = newChain;

        }
    }
}

module.exports = BlockChain;