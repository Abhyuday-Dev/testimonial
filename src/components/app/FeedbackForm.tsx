import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { feedbackSchema } from "@/schemas/feedbackSchema";
import { Dot, Star } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: string[];
}

const FeedbackForm: React.FC<ModalProps> = ({ isOpen, onClose, questions }) => {
  if (!isOpen) return null;

  const form = useForm<z.infer<typeof feedbackSchema>>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {},
  });

  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [starRating, setStarRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const onSubmit = async (data: z.infer<typeof feedbackSchema>) => {
    const formData = new FormData();
    formData.append("comment", data.comment);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("starRating", starRating.toString());
    if (image) {
      formData.append("image", image);
    }
    // Send formData to backend
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const getPlaceholder = () => {
    switch (starRating) {
      case 1:
        return "What went wrong?";
      case 2:
        return "What could be improved?";
      case 3:
        return "What did you like and dislike?";
      case 4:
        return "What did you like the most?";
      case 5:
        return "What did you love?";
      default:
        return "Write your feedback...";
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 h-full p-8">
      <div
        className="absolute inset-0 bg-gray-800 opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white z-10 w-1/4 gap-10 p-6 md:pt-4 rounded max-h-[90vh] overflow-y-auto">
        <h3 className="font-semibold text-xl text-gray-700 mb-6">
          Write text testimonial
        </h3>
        <div className="mb-6">
          <img
            src="https://img.icons8.com/?size=100&id=IIX4dzpCp0YI&format=png&color=000000"
            alt=""
          />
        </div>
        <div className="flex flex-col items-start justify-start ml-2 mb-8">
          <h2
            className={`text-xl font-semibold ${
              isDarkTheme ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Questions
          </h2>

          <ul className="text-gray-700">
            {questions.map((question, index) => (
              <li
                className={`text-sm flex text-semibold ${
                  isDarkTheme ? "text-gray-300" : "text-gray-700"
                }`}
                key={index}
              >
                <Dot />
                {question}
              </li>
            ))}
          </ul>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex space-x-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-6 w-6 cursor-pointer ${
                    star <= (hoverRating || starRating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => setStarRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                />
              ))}
            </div>
            <FormField
              name="comment"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea {...field} placeholder={getPlaceholder()} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <h4 className="mt-4 font-medium text-gray-700">Upload Your Photo</h4>

            <div className="flex items-center mb-4 gap-4">
              <div
                className={`h-16 w-16 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden ${
                  imagePreview ? "" : "border border-gray-400"
                }`}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400"></span>
                )}
              </div>
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="fileInput"
                className="bg-white h-[30px] w-35 text-sm p-2 text-gray-700 hover:bg-gray-100 border cursor-pointer flex items-center"
              >
                Choose File
              </label>
            </div>

            <div className="flex items-top space-x-2">
              <input
                type="checkbox"
                id="terms"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="form-checkbox h-4 w-5 text-gray-600 bg-black"
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none"
              >
                I give permission to use this testimonial across social channels
                and other marketing efforts
              </label>
            </div>

            <div className="flex space-x-4">
              <Button
                onClick={onClose}
                className="mt-4 bg-white text-gray-700 hover:bg-gray-100 border"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!isChecked}
                className="mt-4 bg-purple-800"
              >
                Send
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default FeedbackForm;
