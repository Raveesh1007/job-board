'use client';
import React from 'react';
import CommunityForm from '@/components/communityform';
import { useRouter } from 'next/navigation';

const CreateCommunity = () => {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/community');
  };

  return (
    <div>
      <h1>Create a New Community</h1>
      <CommunityForm onSubmitSuccess={handleSuccess} />
    </div>
  );
};

export default CreateCommunity;
