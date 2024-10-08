import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Username already Exist",
        },
        { status: 400 }
      );
    }else{
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser=new UserModel({
            username,
            email,
            password:hashedPassword
        })
        await newUser.save();

      return NextResponse.json(
        {
          success: true,
          message: "User registered successfully",
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error registering user", error);
    return NextResponse.json(
      { success: false, message: "Error registering user" },
      { status: 500 }
    );
  }
}