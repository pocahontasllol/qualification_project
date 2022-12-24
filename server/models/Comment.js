import mongoose from "mongoose";

const CommentModel = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    id: {
      type:String,
      required:true,
    },
    _id: {
      type:String,
      required:true
    },
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", PostSchema);
