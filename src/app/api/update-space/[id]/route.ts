import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";

import { SpaceModel, UserModel } from "@/models/User";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  
  const session = await getServerSession(authOptions);
  const _user = session?.user;

  if (!session || !_user) {
    return new Response(
      JSON.stringify({ success: false, message: "Not authenticated" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const spaceId = params.id;
    const body = await request.json();

    const updatedSpace = await SpaceModel.findByIdAndUpdate(
      spaceId,
      {
        $set: {
          spaceName: body.spaceName,
          spaceTitle: body.spaceTitle,
          spaceMessage: body.spaceMessage,
          spaceQuestions: body.spaceQuestions,
          isCollectingStarRating: body.isCollectingStarRating,
          theme: body.theme,
        },
      },
      { new: true, lean: true } // `new: true` returns the updated document, `lean: true` for plain JS object
    );

    if (!updatedSpace) {
      return new Response(
        JSON.stringify({ success: false, message: "Space not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Update the User model if spaceName was updated
    if (body.spaceName) {
      await UserModel.updateMany(
        { "spaces.id": spaceId },
        { $set: { "spaces.$.name": body.spaceName } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Space updated successfully", space: updatedSpace }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error updating space:", error);
    return new Response(
      JSON.stringify({ message: "Error updating space", success: false }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
