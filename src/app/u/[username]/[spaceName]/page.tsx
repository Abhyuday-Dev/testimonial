'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from '@/components/ui/card';
import { Dot, PenIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Modal from '@/components/app/Modal';
import FeedbackForm from '@/components/app/FeedbackForm';
import Loader from '@/components/app/Loader';


interface Space {
  _id: string;
  spaceName: string;
  spaceTitle: string;
  spaceMessage: string;
  spaceQuestions: string[];
  isCollectingStarRating: boolean;
  theme: boolean;
  feedback: any[]; 
}

const SpacePage = () => {
    const { username, spaceName } = useParams();
    const [space, setSpace] = useState<Space | null>(null);
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchSpace = async () => {
            try {
              const response = await axios.get('/api/get-link-space', {
                params: { username, spaceName }
              });
              if (response.status === 200) {
                const data = response.data;
                if (data.success) {
                  setSpace(data.space);
                  setIsDarkTheme(data.space.theme);
                  console.log(data.space);
                } else {
                  console.error(data.message);
                }
              } else {
                console.error('Failed to fetch space data');
              }
            } catch (error) {
              console.error('Error fetching space data:', error);
            }
          };
        fetchSpace();
    }, [username, spaceName]);

    if (!space) {
        return <p><Loader /></p>;
    }

    return (
       <div>
         <div className={`flex items-center justify-center min-h-screen ${isDarkTheme ? 'bg-[#25282c]' : 'bg-gray-100'}`}>
            <div className="w-full max-w-2xl">
                <div className={`p-4 pt-10 pb-8 ${isDarkTheme ? 'bg-[#25282c]' : 'bg-gray-100'} border-none`}>
                    <div className="flex flex-col justify-center items-center mb-8">
                        <div className="mb-6">
                            <img
                                src="https://img.icons8.com/?size=100&id=IIX4dzpCp0YI&format=png&color=000000"
                                alt="Space Logo"
                            />
                        </div>
                        <h1 className={`text-5xl font-bold mb-4 ${isDarkTheme ? 'text-gray-200' : 'text-gray-700'}`}>
                            {space.spaceTitle || "Header goes here..."}
                        </h1>
                        <p className={`text-lg w-full text-center mb-8 ${isDarkTheme ? 'text-gray-200' : 'text-gray-500'}`}>
                            {space.spaceMessage || "Your custom message goes here..."}
                        </p>
                    </div>
                    <div className="flex flex-col items-start mb-8">
                        <h2 className={`text-2xl font-semibold mb-4 ${isDarkTheme ? 'text-gray-200' : 'text-gray-800'}`}>Questions</h2>
                        <ul className="list-disc pl-5 text-gray-700">
                            {space.spaceQuestions && space.spaceQuestions.length > 0 ? (
                                space.spaceQuestions.map((question, index) => (
                                    <li
                                      className={`text-lg mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}
                                      key={index}
                                    >
                                        
                                        {question}
                                    </li>
                                ))
                            ) : (
                                <li className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>No questions available</li>
                            )}
                        </ul>
                    </div>
                    <div className="flex justify-center">
                        <Button className="w-full bg-purple-800 hover:bg-purple-900 flex items-center justify-center font-bold text-lg"  onClick={() => setIsModalOpen(true)}>
                            <PenIcon className="pr-2" size={22} /> Send in Text
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        <FeedbackForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} questions={space.spaceQuestions} />
       </div>
    );
};

export default SpacePage;
