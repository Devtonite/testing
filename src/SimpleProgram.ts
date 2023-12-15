import { SelfProof, Field, ZkProgram, verify } from 'o1js';

export const SimpleProgram = ZkProgram({
  name: "add-one-example",
  publicInput: Field,

  methods: {

    baseCase: {
      privateInputs: [],

      method(publicInput: Field) {
        publicInput.assertEquals(Field(0));
      },
    },

    step: {
      privateInputs: [SelfProof],

      method(publicInput: Field, earlierProof: SelfProof<Field, void>) {
        earlierProof.verify();
        earlierProof.publicInput.add(1).assertEquals(publicInput);
      },
    },
  },
});