"use client";

import React, { useEffect, useState, useCallback } from 'react';
import Modal from '@/components/app/Modal';
import { OverviewCard } from '@/components/app/OverviewCard';
import { SpaceCard } from '@/components/app/SpaceCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import { PlusIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';

const Dashboard: React.FC = () => {
  const { data: session, status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [spaces, setSpaces] = useState([]);
  const { toast } = useToast();

  const fetchSpaces = useCallback(async () => {
    try {
      const response = await axios.get('/api/get-user-spaces');
      setSpaces(response.data.data);
      console.log(response.data.data); // Assuming response.data.data contains the spaces array
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch spaces',
        variant: 'destructive',
      });
    }
  }, [toast]);

  useEffect(() => {
    if (session && session.user) {
      fetchSpaces();
    }
  }, [session, fetchSpaces]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  const Tree = () => (
    <img className="text-subtle w-60 dark:invert" src="/tree.svg" alt="Tree" />
  );

  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 rounded w-full max-w-6xl bg-gray-100">
      <h1 className="text-4xl font-semibold mb-6">Overview</h1>
      <div className="mb-6 flex justify-between items-center md:mb-20">
        <OverviewCard title="Spaces" extraData={spaces.length.toString()} />
        <OverviewCard title="Feedbacks" extraData="100" />
        <OverviewCard title="Plan" extraData="Free Plan: Upgrade Plan" />
      </div>
      <div className="mb-4 mt">
        <div className="mb-4 flex justify-between mt-8">
          <h1 className="text-4xl font-semibold mb-4">Spaces</h1>
          <Button
            className="bg-purple-800 font-semibold hover:bg-purple-700"
            onClick={() => setIsModalOpen(true)}
          >
            <PlusIcon size={20} className="mr-2 font-semibold" /> Create New Space
          </Button>
        </div>
        {spaces.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {spaces.map((space) => (
              <SpaceCard
                key={space._id}
                id={space._id} 
                title={space.spaceName}
                feedbackSize={space.feedback.length} // Adjust this to match your data structure
                imageUrl="https://images-platform.99static.com//kkAEl8i2LzGXcQF2jN3icHhgtFA=/1766x2165:2788x3187/fit-in/500x500/projects-files/46/4623/462344/111b69c6-7bcd-44cf-a5f0-1a54d66aca3e.png" // Adjust this to match your data structure
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 ">
            <Tree />
            <p className="mt-6 text-lg text-gray-500 font-medium">No space yet, add a new one?</p>
          </div>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Dashboard;
