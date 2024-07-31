"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Cog, Link as LinkIcon, PenIcon, TriangleAlert } from "lucide-react";
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
import Link from 'next/link';

interface SpaceCardProps {
  title: string;
  feedbackSize: number;
  imageUrl: string;
  spaceName: string;
  id: string; // Use id for deletion
  onDelete: (id: string) => void; // Use id for deletion
}

export const SpaceCard: React.FC<SpaceCardProps> = ({
  title,
  feedbackSize,
  imageUrl,
  spaceName,
  id,
  onDelete,
}) => {
  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <Link href={`/spaces/${spaceName}`} legacyBehavior>
      <a>
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
                <DropdownMenuContent className="bg-zinc-800 text-gray-100">
                  <DropdownMenuItem className="flex gap-2 cursor-pointer">
                    <PenIcon size={15} /> Edit Space
                  </DropdownMenuItem>
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <div className="flex items-center cursor-pointer pl-2 pr-2 pt-1 pb-1 hover:bg-red-500 rounded-sm ">
                        <TriangleAlert size={15} />
                        <span className="ml-2">Delete the space</span>
                      </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader className="mb-8">
                        <AlertDialogTitle className="font-bold text-4xl text-center mb-6">
                          Delete this space
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-center text-lg">
                          Once deleted, all testimonials in this space will be gone forever. Please be certain!
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-700 hover:bg-red-800"
                          onClick={handleDelete}
                        >
                          Confirm Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <DropdownMenuItem className="flex gap-2 cursor-pointer">
                    <LinkIcon size={15} />
                    Get the link
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </Card>
      </a>
    </Link>
  );
};
