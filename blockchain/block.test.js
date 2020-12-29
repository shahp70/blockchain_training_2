const { it, expect } = require('@jest/globals');
const Block = require('./block');
const { DIFFICULTY } = require('../config');

describe('Block', () => {

    let block, data, lastBlock;

    beforeEach(() => {
        data = 'bar';
        lastBlock = Block.genesis();
        block = Block.mineBlock(lastBlock, data);
    });

    it('Ensure that `data` is set ', () => {
        expect(block.data).toEqual(data);
    });

    it('Ensure that last hash is set to hash of last block', () => {
        expect(block.lastHash).toEqual(lastBlock.hash);
    });

    it('Test isGenesis function', () => {
        const genesisBlock = Block.genesis();

        expect(genesisBlock.isGenesis()).toEqual(true);

        genesisBlock.data = 'dasdad';
        expect(genesisBlock.isGenesis()).toEqual(false);
    });

    it('Test isHashValid function', () => {

        const block = new Block("adada", "asdad2dasda", null, "adaddaa3dasda", 56789658);

        block.hash = Block.hash(block.timeStamp, block.lastHash, block.data, block.nonce);

        expect(block.isHashValid()).toEqual(true);
    });

    it('Ensure that it calculates a nonce that generates a hash satisfying difficuly level', () => {
        const minedBlock = Block.mineBlock(Block.genesis(), 'Please generate correct nonce');

        expect(minedBlock.hash.substring(0, DIFFICULTY)).toEqual('0'.repeat(DIFFICULTY));

    })
});