// /src/app/community/page.tsx

import React from 'react';
import CommunityList from '@/components/CommunityList';
import { Container } from '@mui/material';

const CommunityPage: React.FC = () => {
  return (
    <Container>
      <CommunityList />
    </Container>
  );
};

export default CommunityPage;
