import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const getLaundryServices = async (req: Request, res: Response) => {
  try {
    const { hostelId } = req.query;

    const where: any = { isActive: true };
    if (hostelId) {
      where.hostelId = hostelId;
    }

    const services = await prisma.laundryService.findMany({
      where,
      include: {
        hostel: {
          select: {
            name: true,
            city: true,
          },
        },
      },
      orderBy: { rating: 'desc' },
    });

    res.json(services);
  } catch (error) {
    console.error('Get laundry services error:', error);
    res.status(500).json({ error: 'Failed to fetch laundry services' });
  }
};

export const getCleaningServices = async (req: Request, res: Response) => {
  try {
    const { hostelId } = req.query;

    const where: any = { isActive: true };
    if (hostelId) {
      where.hostelId = hostelId;
    }

    const services = await prisma.cleaningService.findMany({
      where,
      include: {
        hostel: {
          select: {
            name: true,
            city: true,
          },
        },
      },
      orderBy: { rating: 'desc' },
    });

    res.json(services);
  } catch (error) {
    console.error('Get cleaning services error:', error);
    res.status(500).json({ error: 'Failed to fetch cleaning services' });
  }
};
