import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/option";
import { SpaceModel } from "@/models/User";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const _user = session?.user;
  console.log(params.id);
  
  if (!session || !_user) {
    return new Response(
      JSON.stringify({ success: false, message: "Not authenticated" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const spaceId = params.id;

    // Find the space by ID
    const space = await SpaceModel.findById(spaceId);

    console.log(space);

    if (!space) {
      return new Response(
        JSON.stringify({ success: false, message: "Space not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

   

    // Delete the space
    await SpaceModel.findByIdAndDelete(spaceId);

    return new Response(
      JSON.stringify({ success: true, message: "Space deleted successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error deleting space:", error);
    return new Response(
      JSON.stringify({ message: "Error deleting space", success: false }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
