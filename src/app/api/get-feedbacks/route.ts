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
    const spaceId = url.searchParams.get('id');  // Now we're using 'id' instead of 'name'

    // Check if the request contains spaceId
    if (!spaceId) {
      return new Response(
        JSON.stringify({ success: false, message: "SpaceId is required" }),
        { status: 400 }
      );
    }


    const space = await SpaceModel.findById(spaceId).populate("feedback");
   
    return new Response(
      JSON.stringify({ success: true,  feedbacks: space.feedback}),
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
