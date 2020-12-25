
const BlockChain = require('./blockchain');
const Block = require('./block');
const { expect } = require('@jest/globals');

describe('Blockchain', () => {

    let blockChain;

    beforeEach(() => {
        blockChain = new BlockChain();
    });

    it('Ensure that first block is Genesis block', () => {
        expect(blockChain.chain[0]).toEqual(Block.genesis());
    });

    it('Ensure that new block is mined and added to blockchain', () => {

        const newBlockData = 'new block data';
        blockChain.addBlock(newBlockData);
        expect(blockChain.chain.length).toEqual(2);
        expect(blockChain.chain[1].data).toEqual(newBlockData);
    });
});