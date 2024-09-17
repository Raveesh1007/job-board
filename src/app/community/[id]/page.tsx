// /src/app/community/[id]/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { fetchCommunityById, deleteCommunity } from '@/services/communityapi';
import CommunityForm from '@/components/communityform';
import { Button, Container, Typography } from '@mui/material';

interface Community {
  id: string;
  name: string;
  description: string;
}

const CommunityDetails: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [community, setCommunity] = useState<Community | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchCommunity = async () => {
      if (typeof id === 'string') {
        try {
          const data = await fetchCommunityById(id);
          setCommunity(data);
        } catch (err) {
          setError('Failed to fetch community');
          console.error('Error fetching community:', err);
        } finally {
          setLoading(false);
        }
      } else {
        setError('Invalid community ID');
        setLoading(false);
      }
    };

    fetchCommunity();
  }, [id]);

  const handleDelete = async () => {
    if (typeof id !== 'string') {
      setError('Invalid community ID');
      return;
    }
    if (window.confirm('Are you sure you want to delete this community?')) {
      try {
        await deleteCommunity(id);
        router.push('/community');
      } catch (err) {
        setError('Failed to delete community');
        console.error('Error deleting community:', err);
      }
    }
  };

  const handleUpdateSuccess = (updatedCommunity: Community) => {
    setCommunity(updatedCommunity);
    router.push('/community');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!community) return <p>Community not found</p>;

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Community
      </Typography>
      <CommunityForm
        existingCommunity={community}
        onSubmitSuccess={handleUpdateSuccess}
      />
      <Button
        variant="contained"
        color="error"
        onClick={handleDelete}
        sx={{ mt: 2 }}
      >
        Delete Community
      </Button>
    </Container>
  );
};

export default CommunityDetails;
