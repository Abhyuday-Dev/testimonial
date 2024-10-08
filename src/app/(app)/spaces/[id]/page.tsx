"use client";

import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import FeedbackCard from "@/components/app/FeedbackCard";
import { MessageSquareText, PenIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import UpdateCard from "@/components/app/UpdateCard";
import Loader from "@/components/app/Loader";

interface SpacePageProps {
  params: {
    id: string;
  };
}

interface Feedback {
  name: string;
  comment: string;
  rating: number;
  createdAt: string;
  liked: boolean;
  _id: string;
}

interface SpaceData {
  _id: string;
  feedback: Feedback[];
  spaceName: string;
  spaceTitle: string;
  spaceMessage: string;
  spaceQuestions: string[];
  isCollectingStarRating: boolean;
  theme: boolean;
}

const SpacePage: React.FC<SpacePageProps> = ({ params }) => {
  const { id } = params;
  const [spaceData, setSpaceData] = useState<SpaceData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();
  const { data: session } = useSession();
  const username = session?.user?.username || "";
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}/${spaceData?._id}`;

  
  const fetchSpace = useCallback(async () => {
    try {
      const response = await axios.get("/api/get-space", {
        params: { username, id },
      });
      if (response.status === 200) {
        const data = response.data;
        if (data.success) {
          setSpaceData(data.space);
        } else {
          console.error(data.message);
        }
      } else {
        console.error("Failed to fetch space data");
      }
    } catch (error) {
      console.error("Error fetching space data:", error);
    }
  }, [username, id]);

  useEffect(() => {
    fetchSpace();
  }, [fetchSpace]);

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
    fetchSpace(); // Fetch the updated data when the modal is closed
  };
  // Function to delete feedback
  const handleFeedbackDelete = async (id: string) => {
    try {
      await axios.delete(`/api/delete-feedback/${id}`, {
        data: { spaceId: spaceData?._id },
      });

      // Remove the deleted feedback from state
      setSpaceData({
        ...spaceData,
        feedback: spaceData.feedback.filter((feedback) => feedback._id !== id),
      });

      toast({
        title: "Success",
        description: "Feedback deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete feedback",
        variant: "destructive",
      });
    }
  };

  const handleFeedbackLike = async (id: string) => {
    try {
      const response = await axios.patch(`/api/like-feedback/${id}`, {
        spaceId: spaceData?._id,
      });

      if (response.status === 200 && response.data.success) {
        const updatedFeedback = spaceData?.feedback.map((feedback) => {
          if (feedback._id === id) {
            return {
              ...feedback,
              liked: !feedback.liked,
            };
          }
          return feedback;
        });

        // Update the state with the modified feedback array
        setSpaceData({
          ...spaceData,
          feedback: updatedFeedback,
        });

        toast({
          title: "Success",
          description: "Feedback liked status updated successfully",
        });
      } else {
        throw new Error("Failed to update like status");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update feedback like status",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="rounded w-screen overflow-x-hidden">
      <Separator className="mb-6" />
      <div className="flex flex-col lg:flex-row justify-between p-4 pl-6 pr-6 lg:pl-24 lg:pr-24 bg-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/testimonials-3162025-2639391.png"
            alt=""
            className="w-[65px] h-20 rounded-md"
          />
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold">{spaceData?.spaceName}</h2>
            <p className="text-sm text-gray-500">
              Space Public URL :{" "}
              <a href={profileUrl} className="underline" target="_blank">
                {profileUrl}
              </a>
            </p>
          </div>
        </div>
        {/* This section will be responsive, stacking below the URL in small screens */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 mt-4 lg:mt-0 items-start lg:items-center">
          <div className="flex flex-col gap-1 items-start lg:items-center">
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
      <div className="flex flex-col p-6 lg:p-20 gap-6">
        {spaceData.feedback.map((feedback, index) => (
          <FeedbackCard
            key={index}
            feedback={feedback}
            onDelete={() => handleFeedbackDelete(feedback._id)}
            onLike={() => handleFeedbackLike(feedback._id)}
          />
        ))}
      </div>
      <UpdateCard
        isOpen={isModalOpen}
        onClose={handleModalClose}
        id={spaceData._id}
        refreshData={()=>console.log}
      />
    </div>
  );
};

export default SpacePage;
