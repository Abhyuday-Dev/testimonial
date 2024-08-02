"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use 'next/navigation' instead of 'next/router'
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { useSession } from 'next-auth/react';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import FeedbackCard from '@/components/app/FeedbackCard';

interface SpacePageProps {
    params: {
      spaceName: string;
    };
  }
  


const SpacePage :React.FC<SpacePageProps>= ({ params }) => {
  const { spaceName } = params;
  const router = useRouter();
  const [spaceData, setSpaceData] = useState(null);
  const { toast } = useToast();
  const { data: session } = useSession();
  const username = session?.user?.username || "";
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}/${spaceName}`;

useEffect(() => {
    const fetchSpace = async () => {
        try {
          const response = await axios.get('/api/get-space', {
            params: { username, spaceName }
          });
          if (response.status === 200) {
            const data = response.data;
            if (data.success) {
              setSpaceData(data.space);
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

  if (!spaceData) {
    return <div>Loading...</div>;
  }

  const copyToClipboard = ()=>{
    navigator.clipboard.writeText(profileUrl)
    toast({
      title:"Copied URL",
      description:"Profile Url has been copied to clipboard",
    })
  }



  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
      <h1 className="text-4xl font-bold mb-4">{spaceName}</h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Copy Your Space Public URL</h2>{' '}
        <div className="flex items-center">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="input input-bordered w-full p-2 mr-2"
          />
          <Button onClick={copyToClipboard}>Copy</Button>
        </div>
      </div>

     
      <Separator />
      <FeedbackCard />

     

     
    </div>
  );
};

export default SpacePage;
