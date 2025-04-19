import { defineMongooseModel } from "#nuxt/mongoose";
import { Token } from "~/shared/types/tokens";

export const TokenSchema = defineMongooseModel<Token>(
  "Token",
  {
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: () => {
        return new Date();
      },
    },
    name: {
      type: String,
      required: true,
    },

    projectId: {
      type: String,
      required: true,
    },
    lastUsedAt: {
      type: Date,
      required: false,
      default: null,
    },
  },
  {},
  (schema) => {
    schema.pre("save", function (this: Project) {
      this.updatedAt = new Date();
    });
    schema.pre("findOneAndUpdate", function () {
      this.setUpdate({ updatedAt: new Date() });
    });
  }
);
