import { stringToFields } from 'o1js/dist/node/bindings/lib/encoding';
import { Core } from './Core';
import { Field, Proof, Poseidon } from 'o1js';

describe('SimpleProgram', () => {

  let rawUnitTest = "This is the unit test";
  let tokenBountyValue = 10;

  let rawCodeSolution = "This is the code solution";
  let tokenDepositValue = 1;

  let proof0: Proof<Field, void>;
  let proof1: Proof<Field, void>;
  let proof2: Proof<Field, void>;

  it('compile core', async () => {
    let { verificationKey } = await Core.compile();
  });

  it('build bounty', async () => {
    let tokenBounty = Field(tokenBountyValue);
    let unitTestFields = stringToFields(rawUnitTest);
    let unitTestHash = Poseidon.hash(unitTestFields);

    proof0 = await Core.buildBounty_Bf(tokenBounty, unitTestHash);
  });

  it('submit code solution', async () => {
    let tokenDeposit = Field(tokenDepositValue);
    let codeSolutionFields = stringToFields(rawCodeSolution);
    let codeSolutionHash = Poseidon.hash(codeSolutionFields);

    proof1 = await Core.commitSolution_Hf(tokenDeposit, codeSolutionHash, proof0);
  });

  it('lock solution commits before releasing raw unit test', async () => {
    let tokenBounty = Field(tokenBountyValue);
    let tokenDeposit = Field(tokenDepositValue);
    let newHash = Poseidon.hash([tokenBounty, tokenDeposit])
    proof2 = await Core.lockCommit_Nf(newHash, proof0, proof1);
  });

  it('swap proofs', async () => {
    let tokenBounty = Field(tokenBountyValue);
    let tokenDeposit = Field(tokenDepositValue);
    let newHash = Poseidon.hash([tokenBounty, tokenDeposit])
    proof2 = await Core.lockCommit_Nf(newHash, proof1, proof0);
  });

  it('swap poseidon hash fields', async () => {
    let tokenBounty = Field(tokenBountyValue);
    let tokenDeposit = Field(tokenDepositValue);
    let newHash = Poseidon.hash([tokenDeposit, tokenBounty])
    proof2 = await Core.lockCommit_Nf(newHash, proof0, proof1);
  });

  it('swap both (should be flipped and work)', async () => {
    let tokenBounty = Field(tokenBountyValue);
    let tokenDeposit = Field(tokenDepositValue);
    let newHash = Poseidon.hash([tokenDeposit, tokenBounty])
    proof2 = await Core.lockCommit_Nf(newHash, proof1, proof0);
  });


});