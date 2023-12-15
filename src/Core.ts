import { SelfProof, Field, ZkProgram, verify } from 'o1js';

export const Core = ZkProgram({
  name: "zkbuidl-core",
  publicInput: Field,

  methods: {
    buildBounty_Bf: {
      privateInputs: [Field],

      method(tokenBounty: Field, unitTestHash: Field) {
        tokenBounty.assertGreaterThan(Field(1));
      },
    },

  },
});