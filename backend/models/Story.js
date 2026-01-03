import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    genre: {
      type: String,
      enum: ["fun","fantasy","thriller","sciencefiction"],
      required: true
    },
    description: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Story = mongoose.model("Story", storySchema);

export default Story;
``