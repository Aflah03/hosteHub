import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
import { AuthRequest } from '../middleware/auth.middleware';

export const getStudentProfile = async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;

    const student = await prisma.student.findUnique({
      where: { userId: authReq.user?.id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            phone: true,
            avatar: true,
          },
        },
        hostel: true,
      },
    });

    if (!student) {
      return res.status(404).json({ error: 'Student profile not found' });
    }

    res.json(student);
  } catch (error) {
    console.error('Get student profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

export const updateStudentProfile = async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const updateData = req.body;

    const student = await prisma.student.update({
      where: { userId: authReq.user?.id },
      data: updateData,
    });

    res.json(student);
  } catch (error) {
    console.error('Update student profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

export const getStudentSubscriptions = async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;

    const student = await prisma.student.findUnique({
      where: { userId: authReq.user?.id },
    });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const subscriptions = await prisma.messSubscription.findMany({
      where: { studentId: student.id },
      include: {
        mess: {
          include: {
            hostel: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(subscriptions);
  } catch (error) {
    console.error('Get subscriptions error:', error);
    res.status(500).json({ error: 'Failed to fetch subscriptions' });
  }
};

export const subscribeToMess = async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const { messId, startDate } = req.body;

    const student = await prisma.student.findUnique({
      where: { userId: authReq.user?.id },
    });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const mess = await prisma.mess.findUnique({
      where: { id: messId },
    });

    if (!mess) {
      return res.status(404).json({ error: 'Mess not found' });
    }

    // Check capacity
    if (mess.currentStudents >= mess.capacity) {
      return res.status(400).json({ error: 'Mess is at full capacity' });
    }

    const subscription = await prisma.messSubscription.create({
      data: {
        studentId: student.id,
        messId,
        startDate: new Date(startDate),
        monthlyPrice: mess.monthlyPrice,
        isActive: true,
      },
    });

    // Update mess current students
    await prisma.mess.update({
      where: { id: messId },
      data: { currentStudents: { increment: 1 } },
    });

    res.status(201).json(subscription);
  } catch (error) {
    console.error('Subscribe to mess error:', error);
    res.status(500).json({ error: 'Failed to subscribe' });
  }
};

export const getMessCuts = async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;

    const student = await prisma.student.findUnique({
      where: { userId: authReq.user?.id },
    });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const messCuts = await prisma.messCut.findMany({
      where: { studentId: student.id },
      include: {
        mess: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(messCuts);
  } catch (error) {
    console.error('Get mess cuts error:', error);
    res.status(500).json({ error: 'Failed to fetch mess cuts' });
  }
};

export const applyMessCut = async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const { messId, startDate, endDate, reason } = req.body;

    const student = await prisma.student.findUnique({
      where: { userId: authReq.user?.id },
    });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const mess = await prisma.mess.findUnique({
      where: { id: messId },
    });

    if (!mess) {
      return res.status(404).json({ error: 'Mess not found' });
    }

    // Calculate refund (simple calculation: daily rate * days)
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const dailyRate = mess.monthlyPrice / 30;
    const refundAmount = dailyRate * days;

    const messCut = await prisma.messCut.create({
      data: {
        studentId: student.id,
        messId,
        startDate: start,
        endDate: end,
        reason,
        refundAmount,
        status: 'PENDING',
      },
    });

    res.status(201).json(messCut);
  } catch (error) {
    console.error('Apply mess cut error:', error);
    res.status(500).json({ error: 'Failed to apply mess cut' });
  }
};

export const getCustomRequests = async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;

    const student = await prisma.student.findUnique({
      where: { userId: authReq.user?.id },
    });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const requests = await prisma.customRequest.findMany({
      where: { studentId: student.id },
      include: {
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
    res.status(500).json({ error: 'Failed to fetch custom requests' });
  }
};

export const submitCustomRequest = async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const { messId, planType, description, dietaryRestrictions } = req.body;

    const student = await prisma.student.findUnique({
      where: { userId: authReq.user?.id },
    });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const request = await prisma.customRequest.create({
      data: {
        studentId: student.id,
        messId,
        planType,
        description,
        dietaryRestrictions: dietaryRestrictions || [],
        status: 'PENDING',
      },
    });

    res.status(201).json(request);
  } catch (error) {
    console.error('Submit custom request error:', error);
    res.status(500).json({ error: 'Failed to submit request' });
  }
};

export const getStudentDues = async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;

    const student = await prisma.student.findUnique({
      where: { userId: authReq.user?.id },
    });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const dues = await prisma.dues.findMany({
      where: { studentId: student.id },
      orderBy: { dueDate: 'desc' },
    });

    res.json(dues);
  } catch (error) {
    console.error('Get student dues error:', error);
    res.status(500).json({ error: 'Failed to fetch dues' });
  }
};
