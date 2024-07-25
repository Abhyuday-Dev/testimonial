import mongoose, { Schema, Document } from "mongoose";

// Define the Space interface and schema
export interface Feedback extends Document {
  comment: string;
  rating: number;
}

export interface Space extends Document {
  spaceName: string;
  spaceTitle: string;
  spaceMessage: string;
  spaceQuestions: string[];
  isCollectingStarRating: boolean;
  theme: boolean;
  feedback: Feedback[];
}

const FeedbackSchema: Schema<Feedback> = new Schema({
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
});

const SpaceSchema: Schema<Space> = new Schema({
  spaceName: {
    type: String,
    required: true,
  },
  spaceTitle: {
    type: String,
    required: true,
  },
  spaceMessage: {
    type: String,
    required: true,
  },
  spaceQuestions: {
    type: [String],
    required: true,
  },
  isCollectingStarRating: {
    type: Boolean,
    required: true,
  },
  theme: {
    type: Boolean,
    required: true,
  },
  feedback: {
    type: [FeedbackSchema],
    default: [],
  },
});

// Define the User interface and schema
export interface User extends Document {
  username: string;
  email: string;
  password: string;
  googleId: string;
  spaces: mongoose.Types.ObjectId[];
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username must be provided"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email must be provided"],
    unique: true,
    match: [
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
      "Please enter a valid email address",
    ],
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
  },
  spaces: [{
    type: Schema.Types.ObjectId,
    ref: "Space",
  }],
});

// Create models
const UserModel = (mongoose.models?.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);
const SpaceModel = (mongoose.models?.Space as mongoose.Model<Space>) || mongoose.model<Space>("Space", SpaceSchema);

export { UserModel, SpaceModel };