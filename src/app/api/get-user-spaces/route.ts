import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import { SpaceModel, UserModel } from "@/models/User";

interface SpaceReference {
    id: mongoose.Types.ObjectId;
    name: string;
}

export async function GET(request: Request) {
  await dbConnect();

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
    const user = await UserModel.findOne({ _id: userId }).exec();
    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "User not found" }),
        { status: 404 }
      );
    }

    const spaceIds = (user.spaces as SpaceReference[]).map(space => space.id);
    if (!spaceIds.length) {
      return new Response(
        JSON.stringify({ success: false, message: "No spaces found for this user" }),
        { status: 404 }
      );
    }

    const spaceDetails = await SpaceModel.find({ _id: { $in: spaceIds } }).exec();
    if (!spaceDetails.length) {
      return new Response(
        JSON.stringify({ success: false, message: "No space details found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: spaceDetails }),
      { status: 200 }
    );

  } catch (error) {
    console.log("An unexpected Error Occurred:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "An unexpected Error Occurred",
      }),
      { status: 500 }
    );
  }
}
