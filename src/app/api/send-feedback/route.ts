import dbConnect from "@/lib/dbConnect";
import { FeedbackModel, SpaceModel, UserModel } from "@/models/User";
import mongoose from "mongoose";

// Define the SpaceReference interface
interface SpaceReference {
    id: mongoose.Types.ObjectId;
    name: string;
}

export async function POST(request: Request) {
  await dbConnect();

  const { name, email, image, comment, starRating, username, spaceName } = await request.json();

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "User Not Found" }),
        { status: 404 }
      );
    }

    const spaceRef = (user.spaces as SpaceReference[]).find(space => space.name === spaceName);
    if (!spaceRef) {
      return new Response(
        JSON.stringify({ success: false, message: "Space not found for this user" }),
        { status: 404 }
      );
    }

    const space = await SpaceModel.findById(spaceRef.id).exec();
    if (!space) {
      return new Response(
        JSON.stringify({ success: false, message: "Space details not found" }),
        { status: 404 }
      );
    }

    const feedback = new FeedbackModel({
      name,
      email,
      comment,
      imageURL: image,
      rating: starRating,
      liked: false,
      createdAt: new Date(),
    });

    space.feedback.push(feedback);
    await space.save();

    return new Response(
      JSON.stringify({ success: true, message: "Feedback added successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding feedback:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
