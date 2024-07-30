"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Cog, Link, PenIcon, TriangleAlert } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios"; // Import axios for API calls

interface SpaceCardProps {
  title: string;
  feedbackSize: number;
  imageUrl: string;
  id: string;
}

// Define the deleteSpace function that will be called on confirmation
const deleteSpace = async (id: string) => {
  try {
    await axios.delete(`/api/delete-space/${id}`);
    // Handle success (e.g., notify user, update UI)
    console.log("Space deleted successfully");
  } catch (error) {
    // Handle error (e.g., notify user)
    console.error("Failed to delete space", error);
  }
};

export const SpaceCard: React.FC<SpaceCardProps> = ({
  title,
  feedbackSize,
  imageUrl,
  id,
}) => {
  return (
    <Card className="grid grid-cols-4 w-full md:w-[350px] border">
      <div className="col-span-1 overflow-hidden rounded-l-lg">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex justify-between items-center border col-span-3 p-3">
        <div className="pt-2 pb-2">
          <h2 className="text-lg text-gray-500">{title}</h2>
          <p className="text-sm text-gray-400">Text: {feedbackSize}</p>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Cog size={18} color="gray" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-800 text-gray-100">
              <DropdownMenuItem className="flex gap-2">
                <PenIcon size={15} /> Edit Space
              </DropdownMenuItem>
              <DropdownMenuItem className="flex gap-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <div className="flex items-center cursor-pointer">
                      <TriangleAlert size={15} />
                      <span className="ml-2">Delete the space</span>
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete this space.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteSpace(id)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex gap-2">
                <Link size={15} />
                Get the link
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
};
