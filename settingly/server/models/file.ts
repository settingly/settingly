import { defineMongooseModel } from "#nuxt/mongoose";
import crypto from "node:crypto";
import { File_, FileContentVersion } from "~/shared/types/files";

export const FileSchema = defineMongooseModel<File_>(
  "File",
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    enabledEndpoints: {
      type: [String],
      enum: ["rest", "graphql"],
      required: true,
      default: [],
    },
    contentVersions: {
      type: [
        {
          id: {
            type: String,
            required: true,
            default: () => crypto.randomBytes(16).toString("hex"),
          },

          content: {
            type: String,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      required: true,
      default: [],
    },
    createdAt: {
      type: Date,
      required: true,
      default: () => {
        return new Date();
      },
    },
    projectId: {
      type: String,
      required: true,
    },

    updatedAt: {
      type: Date,
      required: true,
      default: () => {
        return new Date();
      },
    },
  },
  {},
  (schema) => {
    schema.index({ projectId: 1, name: 1 }, { unique: true });

    schema.pre("save", function (this: File_) {
      this.updatedAt = new Date();
    });

    schema.pre("findOneAndUpdate", function () {
      const update = this.getUpdate();

      if (!update || Array.isArray(update)) return; // Falls Aggregation

      const withSet = {
        ...update,
        $set: { ...(update as any).$set, updatedAt: new Date() },
      };

      this.setUpdate(withSet);
    });
  }
);
