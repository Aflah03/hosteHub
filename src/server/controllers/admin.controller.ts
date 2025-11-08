import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const getAdminDashboard = async (req: Request, res: Response) => {
  try {
    const [totalUsers, totalHostels, totalMesses, totalStudents] = await Promise.all([
      prisma.user.count(),
      prisma.hostel.count({ where: { isActive: true } }),
      prisma.mess.count({ where: { isActive: true } }),
      prisma.student.count(),
    ]);

    const recentUsers = await prisma.user.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    res.json({
      stats: {
        totalUsers,
        totalHostels,
        totalMesses,
        totalStudents,
      },
      recentUsers,
    });
  } catch (error) {
    console.error('Get admin dashboard error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard' });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { role } = req.query;

    const where: any = {};
    if (role) {
      where.role = role;
    }

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        phone: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove sensitive fields
    delete updateData.password;
    delete updateData.id;

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        phone: true,
      },
    });

    res.json(user);
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({
      where: { id },
    });

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

export const getAllMessesAdmin = async (req: Request, res: Response) => {
  try {
    const messes = await prisma.mess.findMany({
      include: {
        hostel: {
          select: {
            name: true,
            city: true,
          },
        },
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
    console.error('Get messes error:', error);
    res.status(500).json({ error: 'Failed to fetch messes' });
  }
};

export const updateMessStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const mess = await prisma.mess.update({
      where: { id },
      data: { isActive },
    });

    res.json(mess);
  } catch (error) {
    console.error('Update mess status error:', error);
    res.status(500).json({ error: 'Failed to update mess status' });
  }
};
