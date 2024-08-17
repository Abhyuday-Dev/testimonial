import dbConnect from "@/lib/dbConnect";
import { FeedbackModel, SpaceModel, UserModel } from "@/models/User";
import mongoose from "mongoose";

export async function POST(request: Request) {
  await dbConnect();

  const { name, email, image, comment, starRating, username, spaceId } = await request.json();
  console.log("route", spaceId);

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "User Not Found" }),
        { status: 404 }
      );
    }

    // Find the space by its ID
    const space = await SpaceModel.findById(spaceId).exec();
    if (!space) {
      return new Response(
        JSON.stringify({ success: false, message: "Space details not found" }),
        { status: 404 }
      );
    }

    // Create new feedback
    const feedback = new FeedbackModel({
      name,
      email,
      comment,
      imageURL: image,
      rating: starRating,
      liked: false,
      createdAt: new Date(),
    });

    // Add feedback to the space and save it
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
