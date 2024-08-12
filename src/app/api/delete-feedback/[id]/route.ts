import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import dbConnect from "@/lib/dbConnect";
import { SpaceModel } from "@/models/User";
import { getServerSession } from "next-auth";

export async function DELETE(
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
    const feedbackId=params.id;
    const { spaceId } = await request.json(); // Assuming that spaceId and feedbackId are sent in the request body.

    // Find the space by its id
    const space = await SpaceModel.findById(spaceId);

    if (!space) {
      return new Response(
        JSON.stringify({ success: false, message: "Space not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Filter out the feedback that matches the feedbackId
    space.feedback = space.feedback.filter(
      (feedback) => feedback._id.toString() !== feedbackId
    );

    // Save the updated space
    await space.save();

    return new Response(
      JSON.stringify({ success: true, message: "Feedback deleted successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error deleting feedback:", error);
    return new Response(
      JSON.stringify({ message: "Error deleting feedback", success: false }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
