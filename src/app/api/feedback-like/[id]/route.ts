import dbConnect from "@/lib/dbConnect";
import { SpaceModel } from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/option";

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
    const feedbackId = params.id;
    const spaceId = await request.json();

    const space = await SpaceModel.findOne(spaceId);

    if (!space) {
      return new Response(
        JSON.stringify({ success: false, message: "Space not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const feedback = space.feedback.id(feedbackId);
    if (!feedback) {
      return new Response(
        JSON.stringify({ success: false, message: "Feedback not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    feedback.liked = !feedback.liked;

    await space.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Feedback liked status updated",
        feedback,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error updating like:", error);
    return new Response(
      JSON.stringify({ message: "Error updating like", success: false }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
