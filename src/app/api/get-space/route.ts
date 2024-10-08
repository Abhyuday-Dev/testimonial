import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import { UserModel, SpaceModel } from "@/models/User";

// Define the SpaceReference interface
interface SpaceReference {
  id: mongoose.Types.ObjectId;
  name: string;
}

export async function GET(request: Request) {
  await dbConnect();
  
  try {
    const url = new URL(request.url);
    const username = url.searchParams.get('username');
    const spaceId = url.searchParams.get('id');  // Now we're using 'id' instead of 'name'

    // Check if the request contains both username and spaceId
    if (!username || !spaceId) {
      return new Response(
        JSON.stringify({ success: false, message: "Username and spaceId are required" }),
        { status: 400 }
      );
    }

    // Find the user by username
    const user = await UserModel.findOne({ username: username }).exec();
    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "User not found" }),
        { status: 404 }
      );
    }

    // Ensure user.spaces is properly typed
    const space = (user.spaces as SpaceReference[]).find(space => space.id.toString() === spaceId); // Compare by id instead of name
    if (!space) {
      return new Response(
        JSON.stringify({ success: false, message: "Space not found for this user" }),
        { status: 404 }
      );
    }

    // Retrieve space details using spaceId
    const spaceDetails = await SpaceModel.findById(space.id).exec();
    if (!spaceDetails) {
      return new Response(
        JSON.stringify({ success: false, message: "Space details not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, space: spaceDetails }),
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
