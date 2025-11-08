import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
import { AuthRequest } from '../middleware/auth.middleware';

export const getAllMesses = async (req: Request, res: Response) => {
  try {
    const { hostelId, isVeg, isNonVeg } = req.query;

    const where: any = { isActive: true };

    if (hostelId) {
      where.hostelId = hostelId;
    }
    if (isVeg === 'true') {
      where.isVeg = true;
    }
    if (isNonVeg === 'true') {
      where.isNonVeg = true;
    }

    const messes = await prisma.mess.findMany({
      where,
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
      orderBy: { rating: 'desc' },
    });

    res.json(messes);
  } catch (error) {
    console.error('Get messes error:', error);
    res.status(500).json({ error: 'Failed to fetch messes' });
  }
};

export const getMessById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const mess = await prisma.mess.findUnique({
      where: { id },
      include: {
        hostel: true,
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
        menuItems: {
          orderBy: { day: 'asc' },
        },
        feedback: {
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
          take: 10,
        },
      },
    });

    if (!mess) {
      return res.status(404).json({ error: 'Mess not found' });
    }

    res.json(mess);
  } catch (error) {
    console.error('Get mess error:', error);
    res.status(500).json({ error: 'Failed to fetch mess' });
  }
};

export const getMessMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const menuItems = await prisma.menuItem.findMany({
      where: { messId: id },
      orderBy: { day: 'asc' },
    });

    res.json(menuItems);
  } catch (error) {
    console.error('Get menu error:', error);
    res.status(500).json({ error: 'Failed to fetch menu' });
  }
};

export const createMess = async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const {
      name,
      description,
      hostelId,
      monthlyPrice,
      breakfastPrice,
      lunchPrice,
      dinnerPrice,
      isVeg,
      isNonVeg,
      capacity,
      images,
      features,
      menu,
    } = req.body;

    // Get or create owner profile
    let owner = await prisma.owner.findUnique({
      where: { userId: authReq.user?.id },
    });

    if (!owner) {
      owner = await prisma.owner.create({
        data: { userId: authReq.user?.id! },
      });
    }

    const mess = await prisma.mess.create({
      data: {
        name,
        description,
        ownerId: owner.id,
        hostelId,
        monthlyPrice,
        breakfastPrice,
        lunchPrice,
        dinnerPrice,
        isVeg: isVeg || false,
        isNonVeg: isNonVeg || false,
        capacity,
        images: images || [],
        features: features || [],
      },
    });

    // Create menu items if provided
    if (menu && Array.isArray(menu)) {
      await prisma.menuItem.createMany({
        data: menu.map((item: any) => ({
          messId: mess.id,
          day: item.day,
          mealType: item.mealType,
          items: item.items,
        })),
      });
    }

    res.status(201).json(mess);
  } catch (error) {
    console.error('Create mess error:', error);
    res.status(500).json({ error: 'Failed to create mess' });
  }
};

export const updateMess = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const mess = await prisma.mess.update({
      where: { id },
      data: updateData,
    });

    res.json(mess);
  } catch (error) {
    console.error('Update mess error:', error);
    res.status(500).json({ error: 'Failed to update mess' });
  }
};

export const deleteMess = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.mess.update({
      where: { id },
      data: { isActive: false },
    });

    res.json({ message: 'Mess deleted successfully' });
  } catch (error) {
    console.error('Delete mess error:', error);
    res.status(500).json({ error: 'Failed to delete mess' });
  }
};
