import dbConnect from "@/lib/dbConnect";

export async function POST(request: Request){
    await dbConnect();

    const {data}=await request.json();

    try {
        
    } catch (error) {
        
    }
}