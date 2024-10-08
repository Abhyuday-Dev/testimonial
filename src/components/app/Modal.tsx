'use client'

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import axios, { AxiosError } from "axios"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { DeleteIcon, Dot, GripVertical, Loader2, PenIcon, PlusCircleIcon, Trash2 } from "lucide-react"
import { spaceSchema } from "@/schemas/spaceSchema"
import { ApiResponse } from "@/types/ApiResponse"
import PreviewCard from "./PreviewCard"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  refreshData:()=>void
}

const MAX_QUESTIONS = 4

export default function Modal({ isOpen, onClose,refreshData }: ModalProps) {
  const router = useRouter()
  const [questions, setQuestions] = useState([
    "Who are you / what are you working on?",
    "What is the best thing about [our product / service]?",
    "What is the worst thing about [our product / service]?",
  ])
  const [isLoading, setIsLoading] = useState(false)

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
  })

  const { watch, handleSubmit, control, reset } = form
  const spaceTitle = watch("spaceTitle")
  const spaceMessage = watch("spaceMessage")
  const isDarkTheme = watch("theme")

  if (!isOpen) return null

  const onSubmit = async (data: z.infer<typeof spaceSchema>) => {
    setIsLoading(true)
    try {
      const response = await axios.post<ApiResponse>("/api/create-space", {
        ...data,
        spaceQuestions: questions,
      })

      toast({
        title: response.data.message,
        variant: "default",
      })
      reset()
      onClose()
      refreshData();
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title: "Error",
        description: axiosError.response?.data.message ?? "Failed to send message",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddQuestion = () => {
    if (questions.length < MAX_QUESTIONS) {
      setQuestions([...questions, `Question ${questions.length + 1}`])
    }
  }

  const handleDeleteQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions]
    newQuestions[index] = value
    setQuestions(newQuestions)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
      <div className="absolute inset-0 bg-gray-800 bg-opacity-50" onClick={onClose} />
      <div className="relative z-10 w-full max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl sm:max-w-4xl">
        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-5 md:gap-10 md:p-10">
          <PreviewCard
            spaceTitle={spaceTitle}
            spaceMessage={spaceMessage}
            questions={questions}
            isDarkTheme={isDarkTheme}
          />
          <div className="col-span-1 md:col-span-3">
            <h1 className="mb-4 text-3xl font-bold text-center">Create a new Space</h1>
            <h3 className="mb-8 text-gray-600 text-center">
              After the Space is created, it will generate a dedicated page for collecting testimonials.
            </h3>
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={control}
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
                  control={control}
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
                  control={control}
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
                <QuestionsSection
                  questions={questions}
                  onAddQuestion={handleAddQuestion}
                  onDeleteQuestion={handleDeleteQuestion}
                  onQuestionChange={handleQuestionChange}
                />
                <div className="flex gap-12 items-center">
                  <FormField
                    control={control}
                    name="isCollectingStarRating"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <div className="text-sm">Collect star ratings</div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="theme"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <div className="text-sm">Choose a theme</div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-purple-800 hover:bg-purple-700"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Create New Space"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}


interface QuestionsSectionProps {
  questions: string[]
  onAddQuestion: () => void
  onDeleteQuestion: (index: number) => void
  onQuestionChange: (index: number, value: string) => void
}

function QuestionsSection({
  questions,
  onAddQuestion,
  onDeleteQuestion,
  onQuestionChange,
}: QuestionsSectionProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Questions</h2>
      {questions.map((question, index) => (
        <div key={index} className="flex items-center mb-2">
          <GripVertical className="mr-2 text-gray-400" />
          <Input
            value={question}
            onChange={(e) => onQuestionChange(index, e.target.value)}
            className="mr-2"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onDeleteQuestion(index)}
            aria-label={`Delete question ${index + 1}`}
          >
            <Trash2 className="h-4 w-4 text-gray-500 hover:text-gray-700" />
          </Button>
        </div>
      ))}
      {questions.length < MAX_QUESTIONS && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onAddQuestion}
          className="mt-2"
        >
          <PlusCircleIcon className="mr-2 h-4 w-4" /> Add question (up to {MAX_QUESTIONS})
        </Button>
      )}
    </div>
  )
}