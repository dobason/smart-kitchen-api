import prisma from '../src/db';

const sampleCookbooks = [
  { id: 1, userId: 1, name: 'Bữa sáng 15 phút' },
  { id: 2, userId: 1, name: 'Eat Clean căn bản' },
  { id: 3, userId: 1, name: 'Sổ tay làm bánh & Eggdrop Sandwich' },
  { id: 4, userId: 1, name: 'Thực đơn tăng cơ giảm mỡ cho dân tập tạ' },
  { id: 5, userId: 1, name: 'Món chay thanh đạm' },
  { id: 6, userId: 1, name: 'Món nhậu cuối tuần' },
  { id: 7, userId: 1, name: 'Cơm nhà mẹ nấu' },
  { id: 8, userId: 1, name: 'Đồ uống giải nhiệt mùa hè' },
  { id: 9, userId: 1, name: 'Bí kíp nấu ăn bằng nồi chiên không dầu' },
  { id: 10, userId: 1, name: 'Công thức nước xốt đa năng' },
];

const seed = async () => {
  for (const cookbook of sampleCookbooks) {
    await prisma.cookbook.upsert({
      where: { id: cookbook.id },
      update: cookbook,
      create: cookbook,
    });
  }

  // Reset the PG sequence so the next auto-increment id is above the max seeded id
  await prisma.$executeRawUnsafe(
    `SELECT setval(pg_get_serial_sequence('cookbooks', 'cookbook_id'), COALESCE((SELECT MAX(cookbook_id) FROM cookbooks), 0));`
  );
};

seed()
  .then(() => console.log('Data seeded successfully!'))
  .catch((error) => {
    console.error('Data seed failed: ', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });