import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/option";
import { SpaceModel } from "@/models/User";

export async function GET(
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
    const space = await SpaceModel.findById(spaceId).lean(); // Convert to plain object

    if (!space) {
      return new Response(
        JSON.stringify({ success: false, message: "Space not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, space: space }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error getting space info:", error);
    return new Response(
      JSON.stringify({ message: "Error getting space", success: false }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
