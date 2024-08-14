import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import {
  DeleteIcon,
  Dot,
  GripVertical,
  Loader2,
  PenIcon,
  PlusCircleIcon,
  Trash2,
} from "lucide-react";
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
import { Switch } from "../ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { toast } from "../ui/use-toast";
import { spaceSchema } from "@/schemas/spaceSchema";
import { useRouter } from "next/navigation";


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const router=useRouter();

  const form = useForm<z.infer<typeof spaceSchema>>({
    resolver: zodResolver(spaceSchema),
    defaultValues: {
      spaceName: "",
      spaceTitle: "",
      spaceMessage: "",
      questions: [],
      isCollectingStarRating: false,
      theme: false,
    },
  });
  const { watch, handleSubmit, reset, control } = form;

  const [questions, setQuestions] = useState([
    "Who are you / what are you working on?",
    "What is the best thing about [our product / service]",
    "What is the best thing about [our product / service]",
  ]);

  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Watch for form values
  const spaceTitle = watch("spaceTitle");
  const spaceMessage = watch("spaceMessage");

  const onSubmit = async (data: z.infer<typeof spaceSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>("/api/create-space", {
        spaceName: data.spaceName,
        spaceTitle: data.spaceTitle,
        spaceMessage: data.spaceMessage,
        spaceQuestions: questions,
        isCollectingStarRating: data.isCollectingStarRating,
        theme: data.theme,
      });

      toast({
        title: response.data.message,
        variant: "default",
      });
      form.reset({
        spaceName: "",
        spaceTitle: "",
        spaceMessage: "",
        questions: [],
        isCollectingStarRating: false,
        theme: false,
      });
      router.push("/dashboard")
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ?? "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddQuestion = () => {
    if (questions.length < 4) {
      setQuestions([...questions, `question ${questions.length + 1}`]);
    }
  };

  const handleDeleteQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 h-full p-8">
      <div
        className="absolute inset-0 bg-gray-800 opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative bg-white z-10 w-3/6 max-h-[90vh] overflow-y-auto grid grid-cols-5 gap-10 p-10 md:pt-16 rounded">
        <div className="col-span-2">
          <Card
            className={`p-4 pt-10 pb-8 ${
              isDarkTheme ? "bg-[#25282c]" : "bg-white"
            }`}
          >
            <div className="flex flex-col justify-center items-center">
              <div className="mb-6">
                <img
                  src="https://img.icons8.com/?size=100&id=IIX4dzpCp0YI&format=png&color=000000"
                  alt=""
                />
              </div>
              <h1
                className={`text-3xl font-bold mb-4 ${
                  isDarkTheme ? "text-gray-200" : "text-gray-700"
                }`}
              >
                {spaceTitle || "Header goes here..."}
              </h1>
              <p
                className={`text-sm w-full text-center mb-8 ${
                  isDarkTheme ? "text-gray-200" : "text-gray-500"
                }`}
              >
                {spaceMessage || "Your custom message goes here..."}
              </p>
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
            <Button className="w-full mb-2 bg-purple-800 hover:bg-purple-800">
              <PenIcon className="pr-3" size={10} /> Send in Text
            </Button>
          </Card>
        </div>
        <div className="col-span-3">
          <h1 className="text-center text-3xl font-bold mb-4">
            Create a new Space
          </h1>
          <h3 className="text-gray-600 text-center mb-10">
            After the Space is created, it will generate a dedicated page for
            collecting testimonials.
          </h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="spaceName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Space Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="spaceTitle"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Space Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="spaceMessage"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Space Message</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <h2 className="text-lg font-semibold mb-2">Questions</h2>

                {questions.map((question, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <GripVertical />
                    <Input
                      value={question}
                      onChange={(e) =>
                        handleQuestionChange(index, e.target.value)
                      }
                      className="mr-2"
                    />
                    <div
                      onClick={() => handleDeleteQuestion(index)}
                      className="hover:text-gray-600 cursor-pointer"
                    >
                      <Trash2
                        size={20}
                        color="gray"
                        className="transition-colors duration-200"
                      />
                    </div>
                  </div>
                ))}
                {questions.length < 4 && (
                  <div
                    className="flex gap-2 text-sm cursor-pointer "
                    onClick={handleAddQuestion}
                  >
                    <PlusCircleIcon size={18} /> Add one (upto 4)
                  </div>
                )}
              </div>

              <div className="flex gap-12 items-center">
                <FormField
                  control={form.control}
                  name="isCollectingStarRating"
                  render={({ field }) => (
                    <FormItem className="flex flex-col ">
                      <div className="text-sm">Collect star ratings</div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="theme"
                  render={({ field }) => (
                    <FormItem className="flex flex-col ">
                      <div className="text-sm">Choose a theme</div>
                      <FormControl>
                        <Switch
                          checked={isDarkTheme}
                          onCheckedChange={(value) => {
                            field.onChange(value);
                            setIsDarkTheme(value);
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div>
                {isLoading ? (
                  <Button disabled className="w-full">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-purple-800 hover:bg-purple-700"
                  >
                    Create New Space
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
