'use client';

import React from 'react';
import { X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

// Define the type for props
interface OverviewCardProps {
  title: string;
  content?: React.ReactNode;  // Optional content for the card
  extraData?: string;         // Optional extra data to display
  onClose?: () => void;       // Optional callback for a close action
}

export function OverviewCard({
  title,
  content,
  extraData,
  onClose,
}: OverviewCardProps) {
  const { toast } = useToast();

  return (
    <Card className="card-bordered" style={{ width: '350px' }}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className='text-lg text-gray-500'>{title}</CardTitle>
        </div>
       
      </CardHeader>
      <CardContent className='text-xl font-semibold'>
        {extraData}
      </CardContent>
    </Card>
  );
}