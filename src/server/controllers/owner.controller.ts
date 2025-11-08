import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
import { AuthRequest } from '../middleware/auth.middleware';

export const getOwnerDashboard = async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;

    const owner = await prisma.owner.findUnique({
      where: { userId: authReq.user?.id },
      include: {
        messes: {
          include: {
            _count: {
              select: {
                subscriptions: true,
                feedback: true,
                customRequests: true,
              },
            },
          },
        },
      },
    });

    if (!owner) {
      return res.status(404).json({ error: 'Owner profile not found' });
    }

    // Calculate total students and revenue
    const totalStudents = owner.messes.reduce(
      (sum, mess) => sum + mess.currentStudents,
      0
    );
    const totalRevenue = owner.messes.reduce(
      (sum, mess) => sum + mess.currentStudents * mess.monthlyPrice,
      0
    );

    res.json({
      owner,
      stats: {
        totalMesses: owner.messes.length,
        totalStudents,
        totalRevenue,
      },
    });
  } catch (error) {
    console.error('Get owner dashboard error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard' });
  }
};

export const getOwnerMesses = async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;

    const owner = await prisma.owner.findUnique({
      where: { userId: authReq.user?.id },
    });

    if (!owner) {
      return res.status(404).json({ error: 'Owner not found' });
    }

    const messes = await prisma.mess.findMany({
      where: { ownerId: owner.id },
      include: {
        hostel: {
          select: {
            name: true,
            city: true,
          },
        },
        _count: {
          select: {
            subscriptions: true,
            feedback: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(messes);
  } catch (error) {
    console.error('Get owner messes error:', error);
    res.status(500).json({ error: 'Failed to fetch messes' });
  }
};

export const getCustomRequestsForOwner = async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;

    const owner = await prisma.owner.findUnique({
      where: { userId: authReq.user?.id },
    });

    if (!owner) {
      return res.status(404).json({ error: 'Owner not found' });
    }

    const requests = await prisma.customRequest.findMany({
      where: {
        mess: {
          ownerId: owner.id,
        },
      },
      include: {
        student: {
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
        mess: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(requests);
  } catch (error) {
    console.error('Get custom requests error:', error);
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
};

export const updateCustomRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, ownerResponse } = req.body;

    const request = await prisma.customRequest.update({
      where: { id },
      data: {
        status,
        ownerResponse,
      },
    });

    res.json(request);
  } catch (error) {
    console.error('Update custom request error:', error);
    res.status(500).json({ error: 'Failed to update request' });
  }
};

export const getMessFeedback = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const feedback = await prisma.feedback.findMany({
      where: { messId: id },
      include: {
        student: {
          include: {
            user: {
              select: {
                name: true,
                avatar: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(feedback);
  } catch (error) {
    console.error('Get mess feedback error:', error);
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
};
