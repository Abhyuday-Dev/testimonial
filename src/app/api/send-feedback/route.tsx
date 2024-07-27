import dbConnect from "@/lib/dbConnect";
import { Feedback, SpaceModel, UserModel } from "@/models/User";
import mongoose from "mongoose";

// Define the SpaceReference 
interface SpaceReference {
    id: mongoose.Types.ObjectId;
    name: string;
}



export async function POST(request: Request) {
  await dbConnect();

  const { data, username, spaceName } = await request.json();

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "User Not Found" }),
        { status: 404 }
      );
    }

    // Find the space document using the space reference id
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

    // Create the feedback object
    const feedback: Feedback = {
      ...data,
      createdAt: new Date(),  // Add createdAt date
    };

    // Push the feedback to the space's feedback array
    space.feedback.push(feedback);

    // Save the space document
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
