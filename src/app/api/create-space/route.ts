import dbConnect from "@/lib/dbConnect";
import { SpaceModel, UserModel } from "@/models/User";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "../auth/[...nextauth]/option";

const spaceSchema = z.object({
  spaceName: z.string(),
  spaceTitle: z.string(),
  spaceMessage: z.string(),
  spaceQuestions: z.array(z.string()),
  isCollectingStarRating: z.boolean(),
  theme: z.boolean(),
});

export async function POST(request: Request) {
  await dbConnect();

  const requestBody = await request.json();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new Response(
      JSON.stringify({ success: false, message: "Not Authenticated" }),
      { status: 401 }
    );
  }

  const user = session.user;
  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    // Validate request body
    const validatedData = spaceSchema.parse(requestBody) as z.infer<typeof spaceSchema>;

    // Create new space
    const newSpace = new SpaceModel(validatedData);
    await newSpace.save();

    // Find the authenticated user and associate the new space
    const userDoc = await UserModel.findOne({ _id: userId });
    if (!userDoc) {
      return new Response(
        JSON.stringify({ success: false, message: "User not found" }),
        { status: 404 }
      );
    }

    if (newSpace._id instanceof mongoose.Types.ObjectId) {
      userDoc.spaces.push({ id: newSpace._id, name: validatedData.spaceName });
    } else {
      console.warn("New space ID is not a valid ObjectId");
    }
    await userDoc.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Space created successfully",
        space: newSpace,
      }),
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Validation error",
          errors: error.errors,
        }),
        { status: 400 }
      );
    }
    console.error("Error creating new space", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error Creating new Space",
      }),
      { status: 500 }
    );
  }
}
