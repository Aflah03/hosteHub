import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create hostels
  const hostels = await Promise.all([
    prisma.hostel.create({
      data: {
        name: 'Green Valley Hostel',
        address: '123 College Road',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        phone: '+91-9876543210',
        email: 'greenvalley@example.com',
        totalRooms: 100,
        occupiedRooms: 75,
        facilities: ['WiFi', 'Gym', 'Laundry', '24/7 Security', 'Common Room'],
        images: [
          'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800',
          'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800',
        ],
      },
    }),
    prisma.hostel.create({
      data: {
        name: 'Sunrise Hostel',
        address: '456 University Lane',
        city: 'Pune',
        state: 'Maharashtra',
        pincode: '411001',
        phone: '+91-9876543211',
        email: 'sunrise@example.com',
        totalRooms: 80,
        occupiedRooms: 60,
        facilities: ['WiFi', 'Parking', 'Mess', 'Study Room'],
        images: [
          'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
        ],
      },
    }),
    prisma.hostel.create({
      data: {
        name: 'City Heights Hostel',
        address: '789 Student Street',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560001',
        phone: '+91-9876543212',
        email: 'cityheights@example.com',
        totalRooms: 120,
        occupiedRooms: 95,
        facilities: ['WiFi', 'Gym', 'Library', 'Cafeteria', 'AC Rooms'],
        images: [
          'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800',
        ],
      },
    }),
  ]);

  console.log(`✅ Created ${hostels.length} hostels`);

  // Create admin user
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@hostelhub.com',
      password: await bcrypt.hash('admin123', 10),
      name: 'Admin User',
      role: 'ADMIN',
      phone: '+91-9999999999',
    },
  });

  await prisma.admin.create({
    data: { userId: adminUser.id },
  });

  console.log('✅ Created admin user');

  // Create owners
  const ownerUsers = await Promise.all([
    prisma.user.create({
      data: {
        email: 'owner1@example.com',
        password: await bcrypt.hash('owner123', 10),
        name: 'Rajesh Kumar',
        role: 'OWNER',
        phone: '+91-9111111111',
      },
    }),
    prisma.user.create({
      data: {
        email: 'owner2@example.com',
        password: await bcrypt.hash('owner123', 10),
        name: 'Priya Sharma',
        role: 'OWNER',
        phone: '+91-9222222222',
      },
    }),
  ]);

  const owners = await Promise.all(
    ownerUsers.map((user) =>
      prisma.owner.create({
        data: { userId: user.id },
      })
    )
  );

  console.log(`✅ Created ${owners.length} owners`);

  // Create messes
  const messes = await Promise.all([
    prisma.mess.create({
      data: {
        name: 'Healthy Bites Mess',
        description: 'Nutritious and delicious home-style cooking',
        ownerId: owners[0].id,
        hostelId: hostels[0].id,
        monthlyPrice: 3500,
        breakfastPrice: 40,
        lunchPrice: 60,
        dinnerPrice: 60,
        isVeg: true,
        isNonVeg: false,
        rating: 4.5,
        totalReviews: 45,
        capacity: 100,
        currentStudents: 75,
        images: [
          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
        ],
        features: ['Hygienic', 'Home-style cooking', 'Balanced diet'],
      },
    }),
    prisma.mess.create({
      data: {
        name: 'Spice Paradise',
        description: 'Variety of vegetarian and non-vegetarian options',
        ownerId: owners[0].id,
        hostelId: hostels[0].id,
        monthlyPrice: 4000,
        breakfastPrice: 45,
        lunchPrice: 70,
        dinnerPrice: 70,
        isVeg: true,
        isNonVeg: true,
        rating: 4.2,
        totalReviews: 38,
        capacity: 80,
        currentStudents: 60,
        images: [
          'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
        ],
        features: ['Both Veg & Non-Veg', 'Variety', 'Quality ingredients'],
      },
    }),
    prisma.mess.create({
      data: {
        name: 'Pure Veg Delight',
        description: 'Exclusively vegetarian meals with traditional recipes',
        ownerId: owners[1].id,
        hostelId: hostels[1].id,
        monthlyPrice: 3200,
        breakfastPrice: 35,
        lunchPrice: 55,
        dinnerPrice: 55,
        isVeg: true,
        isNonVeg: false,
        rating: 4.7,
        totalReviews: 52,
        capacity: 90,
        currentStudents: 70,
        images: [
          'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
        ],
        features: ['Pure Veg', 'Traditional', 'Homely taste'],
      },
    }),
    prisma.mess.create({
      data: {
        name: 'Fitness First Mess',
        description: 'High-protein, balanced meals for fitness enthusiasts',
        ownerId: owners[1].id,
        hostelId: hostels[2].id,
        monthlyPrice: 4500,
        breakfastPrice: 50,
        lunchPrice: 75,
        dinnerPrice: 75,
        isVeg: true,
        isNonVeg: true,
        rating: 4.8,
        totalReviews: 67,
        capacity: 70,
        currentStudents: 65,
        images: [
          'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800',
        ],
        features: ['High Protein', 'Gym Diet', 'Balanced Nutrition'],
      },
    }),
  ]);

  console.log(`✅ Created ${messes.length} messes`);

  // Create menu items for messes
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const menuData = [
    {
      messId: messes[0].id,
      items: [
        { day: 'Monday', mealType: 'Breakfast', items: ['Poha', 'Tea', 'Banana'] },
        { day: 'Monday', mealType: 'Lunch', items: ['Dal', 'Rice', 'Chapati', 'Vegetable', 'Salad'] },
        { day: 'Monday', mealType: 'Dinner', items: ['Paneer Curry', 'Rice', 'Chapati', 'Curd'] },
        { day: 'Tuesday', mealType: 'Breakfast', items: ['Idli', 'Sambar', 'Chutney', 'Coffee'] },
        { day: 'Tuesday', mealType: 'Lunch', items: ['Rajma', 'Rice', 'Chapati', 'Salad'] },
        { day: 'Tuesday', mealType: 'Dinner', items: ['Mix Veg', 'Dal', 'Rice', 'Chapati'] },
        { day: 'Wednesday', mealType: 'Breakfast', items: ['Upma', 'Tea', 'Fruit'] },
        { day: 'Wednesday', mealType: 'Lunch', items: ['Chole', 'Rice', 'Chapati', 'Pickle'] },
        { day: 'Wednesday', mealType: 'Dinner', items: ['Palak Paneer', 'Rice', 'Chapati', 'Papad'] },
      ],
    },
  ];

  for (const menu of menuData) {
    await prisma.menuItem.createMany({
      data: menu.items.map((item) => ({
        messId: menu.messId,
        day: item.day,
        mealType: item.mealType,
        items: item.items,
      })),
    });
  }

  console.log('✅ Created menu items');

  // Create student users
  const studentUsers = await Promise.all([
    prisma.user.create({
      data: {
        email: 'student1@example.com',
        password: await bcrypt.hash('student123', 10),
        name: 'Amit Patel',
        role: 'STUDENT',
        phone: '+91-9333333333',
      },
    }),
    prisma.user.create({
      data: {
        email: 'student2@example.com',
        password: await bcrypt.hash('student123', 10),
        name: 'Sneha Reddy',
        role: 'STUDENT',
        phone: '+91-9444444444',
      },
    }),
    prisma.user.create({
      data: {
        email: 'student3@example.com',
        password: await bcrypt.hash('student123', 10),
        name: 'Rahul Verma',
        role: 'STUDENT',
        phone: '+91-9555555555',
      },
    }),
    prisma.user.create({
      data: {
        email: 'student4@example.com',
        password: await bcrypt.hash('student123', 10),
        name: 'Priyanka Singh',
        role: 'STUDENT',
        phone: '+91-9666666666',
      },
    }),
    prisma.user.create({
      data: {
        email: 'student5@example.com',
        password: await bcrypt.hash('student123', 10),
        name: 'Arjun Mehta',
        role: 'STUDENT',
        phone: '+91-9777777777',
      },
    }),
  ]);

  const students = await Promise.all([
    prisma.student.create({
      data: {
        userId: studentUsers[0].id,
        hostelId: hostels[0].id,
        roomNumber: 'A-101',
        enrollmentNumber: 'ENR2023001',
        course: 'Computer Science',
        year: 2,
        bloodGroup: 'O+',
        emergencyContact: '+91-9888888888',
      },
    }),
    prisma.student.create({
      data: {
        userId: studentUsers[1].id,
        hostelId: hostels[0].id,
        roomNumber: 'A-102',
        enrollmentNumber: 'ENR2023002',
        course: 'Electrical Engineering',
        year: 3,
        bloodGroup: 'A+',
        emergencyContact: '+91-9888888889',
      },
    }),
    prisma.student.create({
      data: {
        userId: studentUsers[2].id,
        hostelId: hostels[1].id,
        roomNumber: 'B-201',
        enrollmentNumber: 'ENR2023003',
        course: 'Mechanical Engineering',
        year: 1,
        bloodGroup: 'B+',
        emergencyContact: '+91-9888888890',
      },
    }),
    prisma.student.create({
      data: {
        userId: studentUsers[3].id,
        hostelId: hostels[2].id,
        roomNumber: 'C-301',
        enrollmentNumber: 'ENR2023004',
        course: 'Civil Engineering',
        year: 4,
        bloodGroup: 'AB+',
        emergencyContact: '+91-9888888891',
      },
    }),
    prisma.student.create({
      data: {
        userId: studentUsers[4].id,
        hostelId: hostels[2].id,
        roomNumber: 'C-302',
        enrollmentNumber: 'ENR2023005',
        course: 'Information Technology',
        year: 2,
        bloodGroup: 'O-',
        emergencyContact: '+91-9888888892',
      },
    }),
  ]);

  console.log(`✅ Created ${students.length} students`);

  // Create mess subscriptions
  const subscriptions = await Promise.all([
    prisma.messSubscription.create({
      data: {
        studentId: students[0].id,
        messId: messes[0].id,
        startDate: new Date('2024-01-01'),
        monthlyPrice: 3500,
        isActive: true,
      },
    }),
    prisma.messSubscription.create({
      data: {
        studentId: students[1].id,
        messId: messes[1].id,
        startDate: new Date('2024-01-01'),
        monthlyPrice: 4000,
        isActive: true,
      },
    }),
    prisma.messSubscription.create({
      data: {
        studentId: students[2].id,
        messId: messes[2].id,
        startDate: new Date('2024-01-01'),
        monthlyPrice: 3200,
        isActive: true,
      },
    }),
    prisma.messSubscription.create({
      data: {
        studentId: students[3].id,
        messId: messes[3].id,
        startDate: new Date('2024-01-01'),
        monthlyPrice: 4500,
        isActive: true,
      },
    }),
    prisma.messSubscription.create({
      data: {
        studentId: students[4].id,
        messId: messes[3].id,
        startDate: new Date('2024-01-01'),
        monthlyPrice: 4500,
        isActive: true,
      },
    }),
  ]);

  console.log(`✅ Created ${subscriptions.length} subscriptions`);

  // Create feedback
  const feedbacks = await Promise.all([
    prisma.feedback.create({
      data: {
        studentId: students[0].id,
        messId: messes[0].id,
        rating: 5,
        comment: 'Excellent food quality and taste. Very hygienic and the staff is very cooperative.',
        sentiment: 'POSITIVE',
        sentimentScore: 0.95,
      },
    }),
    prisma.feedback.create({
      data: {
        studentId: students[1].id,
        messId: messes[1].id,
        rating: 4,
        comment: 'Good variety of food. Sometimes the quantity could be more.',
        sentiment: 'POSITIVE',
        sentimentScore: 0.75,
      },
    }),
    prisma.feedback.create({
      data: {
        studentId: students[2].id,
        messId: messes[2].id,
        rating: 5,
        comment: 'Best vegetarian mess! Tastes just like home-cooked food.',
        sentiment: 'POSITIVE',
        sentimentScore: 0.98,
      },
    }),
    prisma.feedback.create({
      data: {
        studentId: students[3].id,
        messId: messes[3].id,
        rating: 5,
        comment: 'Perfect for fitness enthusiasts. High protein options and balanced meals.',
        sentiment: 'POSITIVE',
        sentimentScore: 0.92,
      },
    }),
    prisma.feedback.create({
      data: {
        studentId: students[4].id,
        messId: messes[3].id,
        rating: 4,
        comment: 'Great food but sometimes a bit pricey. Overall satisfied.',
        sentiment: 'NEUTRAL',
        sentimentScore: 0.65,
      },
    }),
  ]);

  console.log(`✅ Created ${feedbacks.length} feedback entries`);

  // Create mess cuts
  const messCuts = await Promise.all([
    prisma.messCut.create({
      data: {
        studentId: students[0].id,
        messId: messes[0].id,
        startDate: new Date('2024-12-20'),
        endDate: new Date('2024-12-30'),
        reason: 'Going home for winter break',
        status: 'APPROVED',
        refundAmount: 1166.67,
      },
    }),
    prisma.messCut.create({
      data: {
        studentId: students[2].id,
        messId: messes[2].id,
        startDate: new Date('2025-01-15'),
        endDate: new Date('2025-01-20'),
        reason: 'Family function',
        status: 'PENDING',
        refundAmount: 533.33,
      },
    }),
  ]);

  console.log(`✅ Created ${messCuts.length} mess cuts`);

  // Create custom requests
  const customRequests = await Promise.all([
    prisma.customRequest.create({
      data: {
        studentId: students[1].id,
        messId: messes[1].id,
        planType: 'High Protein Diet',
        description: 'I need a high-protein diet plan with extra eggs and chicken for gym.',
        dietaryRestrictions: ['No spicy food'],
        status: 'APPROVED',
        ownerResponse: 'We can provide extra protein at additional ₹500/month.',
      },
    }),
    prisma.customRequest.create({
      data: {
        studentId: students[3].id,
        messId: messes[3].id,
        planType: 'Veg Only',
        description: 'Please provide only vegetarian meals.',
        dietaryRestrictions: ['No onion', 'No garlic'],
        status: 'PENDING',
      },
    }),
  ]);

  console.log(`✅ Created ${customRequests.length} custom requests`);

  // Create dues
  const dues = await Promise.all([
    prisma.dues.create({
      data: {
        studentId: students[0].id,
        description: 'Mess Fee - January 2025',
        amount: 3500,
        dueDate: new Date('2025-01-05'),
        status: 'PAID',
        paidDate: new Date('2025-01-03'),
      },
    }),
    prisma.dues.create({
      data: {
        studentId: students[1].id,
        description: 'Mess Fee - January 2025',
        amount: 4000,
        dueDate: new Date('2025-01-05'),
        status: 'PENDING',
      },
    }),
    prisma.dues.create({
      data: {
        studentId: students[2].id,
        description: 'Mess Fee - January 2025',
        amount: 3200,
        dueDate: new Date('2025-01-05'),
        status: 'PAID',
        paidDate: new Date('2025-01-04'),
      },
    }),
    prisma.dues.create({
      data: {
        studentId: students[3].id,
        description: 'Mess Fee - January 2025',
        amount: 4500,
        dueDate: new Date('2025-01-05'),
        status: 'OVERDUE',
      },
    }),
  ]);

  console.log(`✅ Created ${dues.length} dues`);

  // Create laundry services
  const laundryServices = await Promise.all([
    prisma.laundryService.create({
      data: {
        hostelId: hostels[0].id,
        name: 'Quick Wash Laundry',
        description: 'Fast and reliable laundry service with pickup and drop',
        pricePerKg: 50,
        washingPrice: 40,
        ironingPrice: 10,
        dryCleanPrice: 150,
        rating: 4.3,
        phone: '+91-9123456789',
        images: ['https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=800'],
        features: ['Same Day Service', 'Pickup & Drop', 'Eco-friendly detergents'],
      },
    }),
    prisma.laundryService.create({
      data: {
        hostelId: hostels[1].id,
        name: 'Fresh & Clean Laundry',
        description: 'Professional laundry with dry cleaning facility',
        pricePerKg: 55,
        washingPrice: 45,
        ironingPrice: 15,
        dryCleanPrice: 180,
        rating: 4.6,
        phone: '+91-9123456790',
        images: ['https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800'],
        features: ['Dry Cleaning', 'Express Service', 'Quality assured'],
      },
    }),
  ]);

  console.log(`✅ Created ${laundryServices.length} laundry services`);

  // Create cleaning services
  const cleaningServices = await Promise.all([
    prisma.cleaningService.create({
      data: {
        hostelId: hostels[0].id,
        name: 'Sparkle Clean Services',
        description: 'Professional room and bathroom cleaning',
        dailyPrice: 100,
        weeklyPrice: 600,
        monthlyPrice: 2000,
        rating: 4.5,
        phone: '+91-9123456791',
        images: ['https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800'],
        services: ['Room Cleaning', 'Bathroom Cleaning', 'Dusting', 'Mopping'],
      },
    }),
    prisma.cleaningService.create({
      data: {
        hostelId: hostels[2].id,
        name: 'Perfect Clean Co.',
        description: 'Deep cleaning and maintenance services',
        dailyPrice: 120,
        weeklyPrice: 700,
        monthlyPrice: 2500,
        rating: 4.7,
        phone: '+91-9123456792',
        images: ['https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=800'],
        services: ['Deep Cleaning', 'Sanitization', 'Pest Control', 'AC Cleaning'],
      },
    }),
  ]);

  console.log(`✅ Created ${cleaningServices.length} cleaning services`);

  console.log('');
  console.log('🎉 Database seeding completed successfully!');
  console.log('');
  console.log('📝 Test Credentials:');
  console.log('Admin: admin@hostelhub.com / admin123');
  console.log('Owner: owner1@example.com / owner123');
  console.log('Student: student1@example.com / student123');
  console.log('');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
