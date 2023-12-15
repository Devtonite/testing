import { stringToFields } from 'o1js/dist/node/bindings/lib/encoding';
import { Core } from './Core';
import { Field, Proof, Poseidon } from 'o1js';

describe('SimpleProgram', () => {

  let rawUnitTest = "This is the unit test";
  let tokenBountyValue = 1000;

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

});
