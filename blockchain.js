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

    isValidChain(chainToBeInspected) {

        let result = false;

        if (chainToBeInspected
            && chainToBeInspected.chain.length > 0
            && this.chainToBeInspected.chain[0].isGenesis()) {

            result = true;

            for (let index = 1;index < chainToBeInspected.chain.length;index++) {

                const previousBlock = chainToBeInspected.chain[index - 1];

                if (previousBlock.hash == chainToBeInspected[index].hash
                    && chainToBeInspected[index].isHashValid()) {
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

            if (newChain.chain.length <= this.chain.length) {
                console.log('New chain is not longer than existing chain, hence the chain will not be replaced');
                return;
            } else if (!newChain.isValidChain()) {
                console.log('New chain is invalid, hence existing chain will not be replaced.');
                return;
            }

            this.chain = newChain.chain;

        }
    }
}

module.exports = BlockChain;