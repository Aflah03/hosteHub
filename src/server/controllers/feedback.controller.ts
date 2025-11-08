import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
import { AuthRequest } from '../middleware/auth.middleware';

export const submitFeedback = async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const { messId, rating, comment } = req.body;

    const student = await prisma.student.findUnique({
      where: { userId: authReq.user?.id },
    });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Create feedback
    const feedback = await prisma.feedback.create({
      data: {
        studentId: student.id,
        messId,
        rating,
        comment,
      },
    });

    // Update mess rating
    const allFeedback = await prisma.feedback.findMany({
      where: { messId },
      select: { rating: true },
    });

    const avgRating =
      allFeedback.reduce((sum, f) => sum + f.rating, 0) / allFeedback.length;

    await prisma.mess.update({
      where: { id: messId },
      data: {
        rating: parseFloat(avgRating.toFixed(2)),
        totalReviews: allFeedback.length,
      },
    });

    res.status(201).json(feedback);
  } catch (error) {
    console.error('Submit feedback error:', error);
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
};

export const getAllFeedback = async (req: Request, res: Response) => {
  try {
    const feedback = await prisma.feedback.findMany({
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
        mess: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    res.json(feedback);
  } catch (error) {
    console.error('Get feedback error:', error);
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
};

export const getFeedbackByMess = async (req: Request, res: Response) => {
  try {
    const { messId } = req.params;

    const feedback = await prisma.feedback.findMany({
      where: { messId },
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
    console.error('Get feedback by mess error:', error);
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
};
