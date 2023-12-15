import { SimpleProgram } from './SimpleProgram';
import { Field, Mina, PrivateKey, PublicKey, AccountUpdate, VerificationKey, Proof } from 'o1js';

/*
 * This file specifies how to test the `Add` example smart contract. It is safe to delete this file and replace
 * with your own tests.
 *
 * See https://docs.minaprotocol.com/zkapps for more info.
 */

describe('SimpleProgram', () => {

  let proof0: Proof<Field, void>;
  let proof1: Proof<Field, void>;
  let proof2: Proof<Field, void>;

  it('compile zkProgram and generate proof 0', async () => {
    let { verificationKey } = await SimpleProgram.compile();
  });

  it('generate proof 0', async () => {
    proof0 = await SimpleProgram.baseCase(Field(0));
  });

  it('generate recursive proof 1', async () => {
    proof1 = await SimpleProgram.step(Field(1), proof0);
  });

  it('generate recursive proof 2', async () => {
    proof2 = await SimpleProgram.step(Field(2), proof1);
  });
});
