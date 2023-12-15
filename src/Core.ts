import { SelfProof, Field, ZkProgram, verify, Poseidon } from 'o1js';

export const Core = ZkProgram({
  name: "zkbuidl-core",
  publicInput: Field,

  methods: {

    buildBounty_Bf: {
      privateInputs: [Field],

      method(tokenBounty: Field, unitTestHash: Field) {
        tokenBounty.assertGreaterThanOrEqual(Field(10));
      },
    },

    commitSolution_Hf: {
      privateInputs: [Field, SelfProof],

      method(tokenDeposit: Field, solutionHash: Field, bountyProof: SelfProof<Field, void>) {
        bountyProof.verify();
        // stake should be at least 10% of bounty 
        let minimumStake = bountyProof.publicInput.div(10);
        tokenDeposit.assertGreaterThanOrEqual(minimumStake);
      },
    },

    lockCommit_Nf: {
      privateInputs: [SelfProof, SelfProof],

      method(testWithSolutionHash: Field, testProof: SelfProof<Field, void>, solutionProof: SelfProof<Field, void>) {
        testProof.verify();
        solutionProof.verify();

        let unitTest = testProof.publicInput;
        let codeSolution = solutionProof.publicInput;
        let newHash = Poseidon.hash([unitTest, codeSolution]); 
        newHash.assertEquals(testWithSolutionHash);
      },
    },


  },
});