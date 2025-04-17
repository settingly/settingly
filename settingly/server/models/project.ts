import { defineMongooseModel } from "#nuxt/mongoose";
import crypto from "node:crypto";
import { Project } from "~/shared/types/projects";

export const ProjectSchema = defineMongooseModel<Project>(
  "Project",
  {
    createdAt: {
      type: Date,
      required: true,
      default: () => {
        return new Date();
      },
    },
    updatedAt: {
      type: Date,
      required: true,
      default: () => {
        return new Date();
      },
    },
    organization: {
      type: {
        type: String,
        enum: ["user", "organization"],
        required: true,
      },
      id: {
        type: String,
        required: true,
      },
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {},
  (schema) => {
    schema.pre("save", function (this: Project) {
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
