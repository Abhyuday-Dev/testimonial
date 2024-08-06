import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import { SpaceModel } from "@/models/User";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { spaceId,spaceTitle, spaceMessage, spaceQuestions, isCollectingStarRating, theme } = await request.json();

    // Validate the required fields
    console.log(spaceId);
    if (!spaceId) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid request data" }),
        { status: 400 }
      );
    }

    // Build the update object dynamically
    const updateData = {};
    if (spaceTitle !== undefined) updateData.spaceTitle = spaceTitle;
    if (spaceMessage !== undefined) updateData.spaceMessage = spaceMessage;
    if (spaceQuestions !== undefined) updateData.spaceQuestions = spaceQuestions;
    if (isCollectingStarRating !== undefined) updateData.isCollectingStarRating = isCollectingStarRating;
    if (theme !== undefined) updateData.theme = theme;

    // Find the space by id and update its details
    const updatedSpace = await SpaceModel.findByIdAndUpdate(
      spaceId,
      updateData,
      { new: true }
    ).exec();

    if (!updatedSpace) {
      return new Response(
        JSON.stringify({ success: false, message: "Space not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Space updated successfully", space: updatedSpace }),
      { status: 200 }
    );
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return new Response(
      JSON.stringify({ success: false, message: "An unexpected error occurred" }),
      { status: 500 }
    );
  }
}
