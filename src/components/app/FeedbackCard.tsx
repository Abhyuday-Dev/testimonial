import React from "react";
import { Heart, StarIcon, Trash2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  onLike: () => void;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({
  feedback,
  onDelete,
  onLike,
}) => {
  const { name, comment, rating, createdAt, liked } = feedback;

  const stars = Array(rating).fill(0);

  return (
    <div className="w-full rounded-lg bg-white p-4 md:p-8 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h4 className="bg-blue-200 rounded-2xl text-blue-600 px-4 py-1 text-sm font-semibold">
          Feedback
        </h4>
        <div className="flex gap-2">
          <Heart
            color="red"
            fill={liked ? "red" : "white"}
            className="hover:text-red-400 cursor-pointer"
            onClick={onLike}
          />
        </div>
      </div>

      {/* Star Rating */}
      <div className="flex mb-4">
        {stars.map((_, index) => (
          <StarIcon key={index} color="#FFD700" fill="#FFD700" />
        ))}
      </div>

      {/* Feedback Comment */}
      <div className="text-sm mb-6">{comment}</div>

      {/* Name and Submitted At */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col">
          <h3 className="text-md font-medium text-gray-400">Name</h3>
          <p className="text-sm">{name}</p>
        </div>
        <div className="flex flex-col">
          <h3 className="text-md font-medium text-gray-400">Submitted At</h3>
          <p className="text-sm">{new Date(createdAt).toLocaleString()}</p>
        </div>
      </div>

      {/* Accordion with Delete Option */}
      <Accordion type="single" collapsible className="flex justify-end">
        <AccordionItem value="item-1" className="no-underline border-none">
          <AccordionTrigger className="text-lg"></AccordionTrigger>
          <AccordionContent className="flex items-center justify-center">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div className="flex items-center gap-1 font-semibold text-gray-700 hover:bg-gray-200 cursor-pointer p-2 rounded">
                  <Trash2 color="gray" size={18} />
                  Delete
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="font-bold text-3xl text-center">
                    Delete this feedback
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-center text-lg">
                    Once confirmed, this feedback will be permanently removed.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-700 hover:bg-red-800"
                    onClick={onDelete}
                  >
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FeedbackCard;
