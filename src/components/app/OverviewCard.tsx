'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

interface OverviewCardProps {
  title: string;
  content?: React.ReactNode; 
  extraData?: string; 
  onClose?: () => void; 
}

export function OverviewCard({
  title,
  content,
  extraData,
  onClose,
}: OverviewCardProps) {
  const { toast } = useToast();

  return (
    <Card
      className="card-bordered mx-auto my-4 md:my-4" 
      style={{ width: '350px' }}
    >
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg text-gray-500">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="text-xl font-semibold">
        {extraData}
      </CardContent>
    </Card>
  );
}
