// /pages/api/community.ts

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/config/prisma.config';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;

  switch (method) {
    case 'POST':
      return createCommunity(req, res);
    case 'GET':
      if (query.id) {
        return getCommunityById(req, res);
      } else {
        return getAllCommunities(req, res);
      }
    case 'PUT':
      return updateCommunity(req, res);
    case 'DELETE':
      return deleteCommunity(req, res);
    default:
      return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

// Create a new community
const createCommunity = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required' });
  }

  try {
    const newCommunity = await prisma.community.create({
      data: { name, description },
    });
    return res.status(201).json(newCommunity);
  } catch (error) {
    console.error('Error creating community:', error);
    return res.status(500).json({ error: 'Failed to create community' });
  }
};

// Fetch all communities
const getAllCommunities = async (
  _req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const communities = await prisma.community.findMany();
    return res.status(200).json(communities);
  } catch (error) {
    console.error('Error fetching communities:', error);
    return res.status(500).json({ error: 'Failed to fetch communities' });
  }
};

// Fetch a single community by ID
const getCommunityById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const community = await prisma.community.findUnique({
      where: { id: String(id) },
    });

    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }

    return res.status(200).json(community);
  } catch (error) {
    console.error('Error fetching community:', error);
    return res.status(500).json({ error: 'Failed to fetch community' });
  }
};

// Update a community by ID
const updateCommunity = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { name, description } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Community ID is required' });
  }

  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required' });
  }

  try {
    const updatedCommunity = await prisma.community.update({
      where: { id: String(id) },
      data: { name, description },
    });
    return res.status(200).json(updatedCommunity);
  } catch (error) {
    console.error('Error updating community:', error);
    return res.status(500).json({ error: 'Failed to update community' });
  }
};

// Delete a community by ID
const deleteCommunity = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Community ID is required' });
  }

  try {
    await prisma.community.delete({
      where: { id: String(id) },
    });
    return res.status(204).end();
  } catch (error) {
    console.error('Error deleting community:', error);
    return res.status(500).json({ error: 'Failed to delete community' });
  }
};
