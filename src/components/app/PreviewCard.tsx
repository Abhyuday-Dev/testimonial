import React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dot, PenIcon } from "lucide-react"

interface PreviewCardProps {
  spaceTitle: string
  spaceMessage: string
  questions: string[]
  isDarkTheme: boolean
}

export default function PreviewCard({ spaceTitle, spaceMessage, questions, isDarkTheme }: PreviewCardProps) {
  return (
    <div className="col-span-1 md:col-span-2">
      
      <Card className={`p-4 pt-10 pb-8 ${isDarkTheme ? "bg-[#25282c]" : "bg-white"}`}>
     
        <div className="flex flex-col justify-center items-center">
          <div className="mb-6">
            <img
              src="https://img.icons8.com/?size=100&id=IIX4dzpCp0YI&format=png&color=000000"
              alt="Space icon"
              width={100}
              height={100}
            />
          </div>
          <h1
            className={`text-sm md:text-2xl font-bold mb-4 ${
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
            className={`text-xl font-semibold ${isDarkTheme ? "text-gray-200" : "text-gray-800"}`}
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
        <Button className="w-full mb-2 bg-purple-800 hover:bg-purple-700">
          <PenIcon className="mr-2 h-4 w-4" /> Send in Text
        </Button>
      </Card>
    </div>
  )
}