export const createCommunity = async (name: string, description: string) => {
  const response = await fetch('/api/community', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to create community:', errorText);
    throw new Error('Failed to create community');
  }

  return await response.json();
};

export const updateCommunity = async (
  id: string,
  name: string,
  description: string
) => {
  const response = await fetch(`/api/community?id=${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to update community:', errorText);
    throw new Error('Failed to update community');
  }

  return await response.json();
};

export const getAllCommunities = async () => {
  const response = await fetch('/api/community', {
    method: 'GET',
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to fetch communities:', errorText);
    throw new Error('Failed to fetch communities');
  }

  const data = await response.json();
  return data;
};

export const getCommunityById = async (id: string) => {
  const response = await fetch(`/api/community?id=${id}`, {
    method: 'GET',
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to fetch community:', errorText);
    throw new Error('Failed to fetch community');
  }

  const data = await response.json();
  return data;
};

export const deleteCommunity = async (id: string) => {
  const response = await fetch(`/api/community?id=${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to delete community:', errorText);
    throw new Error('Failed to delete community');
  }

  return response;
};
