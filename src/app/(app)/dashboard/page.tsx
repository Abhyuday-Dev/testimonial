"use client";

import Modal from "@/components/app/Modal";
import { OverviewCard } from "@/components/app/OverviewCard";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";


const Dashboard: React.FC = () => {
  const { data: session, status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Loading state handling
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Redirect to login if not authenticated
  if (!session || !session.user) {
    return <div>Please Login</div>;
  }

  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 rounded w-full max-w-6xl  bg-gray-100">
      <h1 className="text-4xl font-semibold mb-6">Overview</h1>
      <div className="mb-6 flex justify-between items-center md:mb-20 ">
        <OverviewCard title="Spaces" extraData="2" />
        <OverviewCard title="Feedbacks" extraData="100" />
        <OverviewCard title="Plan" extraData="Free Plan:Upgrade Plan" />
      </div>
      <div className="mb-4 mt">
        <div className="mb-4 flex justify-between mt-8">
          <h1 className="text-4xl font-semibold mb-4">Spaces</h1>
          <Button
            className="bg-purple-800 font-semibold hover:bg-purple-700"
            onClick={() => setIsModalOpen(true)}
          >
            <PlusIcon size={20} className="mr-2 font-semibold" /> Create New
            Space
          </Button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Dashboard;