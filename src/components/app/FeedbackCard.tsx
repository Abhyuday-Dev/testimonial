import React from "react";
import { Heart, StarIcon, Trash2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Feedback {
  name: string;
  comment: string;
  rating: number;
  createdAt: string;
  liked: boolean;
  _id: string;
}

interface FeedbackCardProps {
  feedback: Feedback;
  onDelete: () => void; 
  onLike:()=>void;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback, onDelete,onLike }) => {
  const { name, comment, rating, createdAt, liked } = feedback;

  const stars = Array(rating).fill(0);

  return (
    <div className="w-full rounded-lg bg-white p-8">
      <div className="flex justify-between mb-6">
        <h4 className="bg-blue-200 rounded-2xl text-blue-600 pr-4 pl-4 p-1 text-sm font-semibold">
          Feedback
        </h4>
        <div className="flex gap-2">
          <Heart
            color="red"
            fill={liked ? "red" : "white"}
            className="hover:text-red-400"
            onClick={onLike}
          />
        </div>
      </div>
      <div className="mb-6 flex flex-col gap-2">
        <div className="flex gap-2">
          {stars.map((_, index) => (
            <StarIcon key={index} color="#FFD700" fill="#FFD700" />
          ))}
        </div>
      </div>
      <div className="text-sm mb-6">{comment}</div>
      <div className="flex gap-[200px] md:gap-[300px]">
        <div className="flex flex-col gap-1">
          <h3 className="text-md font-medium text-gray-400">Name</h3>
          <p className="text-sm">{name}</p>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-md font-medium text-gray-400">Submitted At</h3>
          <p className="text-sm">{new Date(createdAt).toLocaleString()}</p>
        </div>
      </div>
      <Accordion
        type="single"
        collapsible
        className="flex items-end justify-end"
      >
        <AccordionItem value="item-1" className="no-underline border-none">
          <AccordionTrigger className="text-lg"></AccordionTrigger>
          <AccordionContent className="">
            <div className="flex gap-3 items-center justify-around">
              <div
                className="flex gap-1 items-center justify-center font-semibold text-gray-700 hover:bg-gray-200 cursor-pointer p-1 hover:rounded"
                onClick={onDelete} 
              >
                <Trash2 color="gray" size={18} />
                Delete
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FeedbackCard;
