"use client";

import React, { useState } from "react";
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
import UpdateCard from "./UpdateCard";
import { useSession } from "next-auth/react";
import { useToast } from "../ui/use-toast";

interface SpaceCardProps {
  title: string;
  feedbackSize: number;
  imageUrl: string;
  spaceName: string;
  id: string; // Use id for deletion
  onDelete: (id: string) => void;
  refreshData:()=>void; 
}

export const SpaceCard: React.FC<SpaceCardProps> = ({
  title,
  feedbackSize,
  imageUrl,
  spaceName,
  id,
  onDelete,
  refreshData
}) => {

  const {data:session}=useSession();
  const {toast}=useToast();
 

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleDelete = () => {
    onDelete(id);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const {username}=session?.user || "";
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const spaceUrl = `${baseUrl}/u/${username}/${id}`;

  const copyToClipboard = ()=>{
    navigator.clipboard.writeText(spaceUrl)
    toast({
      title:"Copied URL",
      description:"Space Url has been copied to clipboard",
    })
  }


  return (
    <Card className="grid grid-cols-4 w-full md:w-[350px] border">
      <div className="col-span-1 overflow-hidden rounded-l-lg">
        <Link href={`/spaces/${id}`} legacyBehavior>
          <a>
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          </a>
        </Link>
      </div>
      <div className="flex justify-between items-center border col-span-3 p-3">
        <Link href={`/spaces/${id}`} legacyBehavior>
          <a className="flex-grow">
            <div className="pt-2 pb-2">
              <h2 className="text-lg text-gray-500">{title}</h2>
              <p className="text-sm text-gray-400">Text: {feedbackSize}</p>
            </div>
          </a>
        </Link>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Cog size={18} color="gray" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-zinc-800 text-gray-100">
              <DropdownMenuItem className="flex gap-2 cursor-pointer " onClick={handleModalOpen}>
                <PenIcon size={15}  /> Edit Space
              </DropdownMenuItem>
              <AlertDialog>
                <AlertDialogTrigger >
                    <div className="flex pl-2 rounded-sm pr-1 gap-2 pt-1 pb-1 hover:bg-red-600  items-center"><TriangleAlert size={15} />
                    <span className="">Delete the space</span></div>
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
              <DropdownMenuItem className="flex gap-2 cursor-pointer" onClick={copyToClipboard}>
                <LinkIcon size={15} />
                Get the link
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <UpdateCard
        isOpen={isModalOpen}
        onClose={handleModalClose}
        id={id}
        refreshData={refreshData}
      />
      </div>
    </Card>
  );
};
