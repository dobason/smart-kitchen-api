import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const sampleCookbooks = [
  { id: 1, title: 'Bữa sáng 15 phút', description: 'Các món ăn sáng nhanh gọn, đủ năng lượng cho người bận rộn.' },
  { id: 2, title: 'Eat Clean căn bản', description: 'Hướng dẫn nấu các món ăn tốt cho sức khỏe, hỗ trợ ăn kiêng hiệu quả.' },
  { id: 3, title: 'Sổ tay làm bánh & Eggdrop Sandwich', description: 'Bí quyết làm các loại bánh nướng và công thức sandwich trứng chuẩn vị Hàn Quốc.' },
  { id: 4, title: 'Thực đơn tăng cơ giảm mỡ cho dân tập tạ', description: 'Tổng hợp các bữa ăn giàu protein, dễ chuẩn bị để hỗ trợ tập luyện.' },
  { id: 5, title: 'Món chay thanh đạm', description: 'Thực đơn các món chay dễ làm, giàu dinh dưỡng từ rau củ.' },
  { id: 6, title: 'Món nhậu cuối tuần', description: null },
  { id: 7, title: 'Cơm nhà mẹ nấu', description: 'Gợi ý những mâm cơm gia đình ấm cúng, đậm vị truyền thống và tiết kiệm.' },
  { id: 8, title: 'Đồ uống giải nhiệt mùa hè', description: 'Công thức pha chế sinh tố, nước ép và các loại trà trái cây tươi mát.' },
  { id: 9, title: 'Bí kíp nấu ăn bằng nồi chiên không dầu', description: 'Hơn 50 món ăn ngon tuyệt, giòn rụm chỉ với chiếc nồi chiên không dầu.' },
  { id: 10, title: 'Công thức nước xốt đa năng', description: 'Cách làm các loại nước xốt chấm, xốt ướp thịt nướng thần thánh.' }
];

const seed = async () => {
  for (const cookbook of sampleCookbooks) {
    await prisma.cookbook.upsert({
      where: { id: cookbook.id },
      update: cookbook,
      create: cookbook,
    });
  }
};

seed()
  .then(() => console.log('Data seeded successfully!'))
  .catch((error) => {
    console.error('Data seed failed: ', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });