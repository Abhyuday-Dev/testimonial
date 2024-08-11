"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import FeedbackCard from "@/components/app/FeedbackCard";
import { MessageSquareText, PenIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import UpdateCard from "@/components/app/UpdateCard"; // Import the modal component
import Loader from "@/components/app/Loader";

interface SpacePageProps {
  params: {
    spaceName: string;
  };
}

interface Feedback {
  name: string;
  comment: string;
  rating: number;
  createdAt: string;
}

interface SpaceData {
  _id: string;
  feedback: Feedback[];
  spaceId: string; 
  spaceName: string;
  spaceTitle: string;
  spaceMessage: string;
  spaceQuestions: string[];
  isCollectingStarRating: boolean;
  theme: boolean;
}

const SpacePage: React.FC<SpacePageProps> = ({ params }) => {
  const { spaceName } = params;
  const router = useRouter();
  const [spaceData, setSpaceData] = useState<SpaceData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const { toast } = useToast();
  const { data: session } = useSession();
  const username = session?.user?.username || "";
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}/${spaceName}`;

  const id = spaceData?._id;

  useEffect(() => {
    const fetchSpace = async () => {
      try {
        const response = await axios.get("/api/get-space", {
          params: { username, spaceName },
        });
        if (response.status === 200) {
          const data = response.data;
          if (data.success) {
            setSpaceData(data.space);
            console.log(data.space);
          } else {
            console.error(data.message);
          }
        } else {
          console.error("Failed to fetch space data");
        }
      } catch (error) {
        console.error("Error fetching space data:", error);
      }
    };
    fetchSpace();
  }, [username, spaceName]);

  if (!spaceData) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="rounded w-screen overflow-x-hidden">
      <Separator className="mb-6" />
      <div className="flex justify-between p-4 pl-24 pr-24 bg-gray-100">
        <div className="flex gap-4">
          <img
            src="https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg"
            alt=""
            className="w-[55px] h-20 rounded-md"
          />
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold">{spaceName}</h2>
            <p className="text-sm text-gray-500">
              Space Public URL :{" "}
              <a href={profileUrl} className="underline">
                {profileUrl}
              </a>
            </p>
          </div>
        </div>
        <div className="flex gap-8">
          <div className="flex flex-col gap-1 items-center">
            <p className="flex items-center">
              <MessageSquareText size={18} className="mr-2 text-gray-700" />
              Text Credits
            </p>
            <p className="text-gray-500 font-medium">
              {spaceData.feedback.length}
            </p>
          </div>
          <Button
            onClick={handleModalOpen}
            className="bg-white hover:bg-gray-100 text-black border"
          >
            <PenIcon size={15} className="mr-2" /> Edit Space
          </Button>
        </div>
      </div>
      <div className="flex flex-col p-20 gap-6">
        {spaceData.feedback.map((feedback, index) => (
          <FeedbackCard key={index} feedback={feedback} spaceName={spaceName} />
        ))}
      </div>
      <UpdateCard
        isOpen={isModalOpen}
        onClose={handleModalClose}
        id={spaceData._id}
      />
    </div>
  );
};

export default SpacePage;
