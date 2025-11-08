import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const getAllHostels = async (req: Request, res: Response) => {
  try {
    const hostels = await prisma.hostel.findMany({
      where: { isActive: true },
      include: {
        messes: {
          where: { isActive: true },
          select: {
            id: true,
            name: true,
            rating: true,
            monthlyPrice: true,
          },
        },
        _count: {
          select: {
            students: true,
            laundryServices: true,
            cleaningServices: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(hostels);
  } catch (error) {
    console.error('Get hostels error:', error);
    res.status(500).json({ error: 'Failed to fetch hostels' });
  }
};

export const getHostelById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const hostel = await prisma.hostel.findUnique({
      where: { id },
      include: {
        messes: {
          where: { isActive: true },
          include: {
            owner: {
              include: {
                user: {
                  select: {
                    name: true,
                    email: true,
                    phone: true,
                  },
                },
              },
            },
          },
        },
        laundryServices: {
          where: { isActive: true },
        },
        cleaningServices: {
          where: { isActive: true },
        },
        _count: {
          select: {
            students: true,
          },
        },
      },
    });

    if (!hostel) {
      return res.status(404).json({ error: 'Hostel not found' });
    }

    res.json(hostel);
  } catch (error) {
    console.error('Get hostel error:', error);
    res.status(500).json({ error: 'Failed to fetch hostel' });
  }
};

export const createHostel = async (req: Request, res: Response) => {
  try {
    const {
      name,
      address,
      city,
      state,
      pincode,
      phone,
      email,
      totalRooms,
      facilities,
      images,
    } = req.body;

    const hostel = await prisma.hostel.create({
      data: {
        name,
        address,
        city,
        state,
        pincode,
        phone,
        email,
        totalRooms,
        facilities: facilities || [],
        images: images || [],
      },
    });

    res.status(201).json(hostel);
  } catch (error) {
    console.error('Create hostel error:', error);
    res.status(500).json({ error: 'Failed to create hostel' });
  }
};

export const updateHostel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const hostel = await prisma.hostel.update({
      where: { id },
      data: updateData,
    });

    res.json(hostel);
  } catch (error) {
    console.error('Update hostel error:', error);
    res.status(500).json({ error: 'Failed to update hostel' });
  }
};

export const deleteHostel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Soft delete
    await prisma.hostel.update({
      where: { id },
      data: { isActive: false },
    });

    res.json({ message: 'Hostel deleted successfully' });
  } catch (error) {
    console.error('Delete hostel error:', error);
    res.status(500).json({ error: 'Failed to delete hostel' });
  }
};
