import { defineMongooseModel } from "#nuxt/mongoose";
import crypto from "node:crypto";

export const AccessTokenSchema = defineMongooseModel<AccessToken>(
  "AccessToken",
  {
    partialToken: {
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
    permissions: {
      type: [String],
      required: true,
      default: () => {
        return [];
      },
    },
    projectId: {
      type: String,
      required: true,
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
