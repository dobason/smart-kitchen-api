import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

// ─── Users ──────────────────────────────────────────────
const sampleUsers = [
  { id: 1, email: 'hoangminh@gmail.com', passwordHash: '$2b$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ12', username: 'hoangminh', avartarUrl: null },
  { id: 2, email: 'thuylinh@gmail.com', passwordHash: '$2b$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ34', username: 'thuylinh', avartarUrl: 'https://i.pravatar.cc/150?u=thuylinh' },
  { id: 3, email: 'ducbao@gmail.com', passwordHash: '$2b$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ56', username: 'ducbao', avartarUrl: null },
];

// ─── Cookbooks ──────────────────────────────────────────
const sampleCookbooks = [
  { id: 1, userId: 1, name: 'Bữa sáng 15 phút' },
  { id: 2, userId: 1, name: 'Eat Clean căn bản' },
  { id: 3, userId: 1, name: 'Sổ tay làm bánh & Eggdrop Sandwich' },
  { id: 4, userId: 1, name: 'Thực đơn tăng cơ giảm mỡ cho dân tập tạ' },
  { id: 5, userId: 2, name: 'Món chay thanh đạm' },
  { id: 6, userId: 2, name: 'Món nhậu cuối tuần' },
  { id: 7, userId: 2, name: 'Cơm nhà mẹ nấu' },
  { id: 8, userId: 3, name: 'Đồ uống giải nhiệt mùa hè' },
  { id: 9, userId: 3, name: 'Bí kíp nấu ăn bằng nồi chiên không dầu' },
  { id: 10, userId: 3, name: 'Công thức nước xốt đa năng' },
];

// ─── Tags ───────────────────────────────────────────────
const sampleTags = [
  { id: 1, name: 'Bữa sáng', category: 'Bữa ăn' },
  { id: 2, name: 'Bữa trưa', category: 'Bữa ăn' },
  { id: 3, name: 'Bữa tối', category: 'Bữa ăn' },
  { id: 4, name: 'Ăn vặt', category: 'Bữa ăn' },
  { id: 5, name: 'Eat Clean', category: 'Chế độ ăn' },
  { id: 6, name: 'Low Carb', category: 'Chế độ ăn' },
  { id: 7, name: 'Chay', category: 'Chế độ ăn' },
  { id: 8, name: 'Tăng cơ', category: 'Chế độ ăn' },
  { id: 9, name: 'Món Việt', category: 'Ẩm thực' },
  { id: 10, name: 'Món Hàn', category: 'Ẩm thực' },
  { id: 11, name: 'Món Nhật', category: 'Ẩm thực' },
  { id: 12, name: 'Đồ uống', category: 'Loại' },
  { id: 13, name: 'Nước xốt', category: 'Loại' },
  { id: 14, name: 'Nồi chiên không dầu', category: 'Dụng cụ' },
  { id: 15, name: 'Nhanh & Dễ', category: 'Độ khó' },
];

// ─── Ingredients ────────────────────────────────────────
const sampleIngredients = [
  { id: 1, name: 'Trứng gà', icon: '🥚' },
  { id: 2, name: 'Bột mì', icon: '🌾' },
  { id: 3, name: 'Sữa tươi', icon: '🥛' },
  { id: 4, name: 'Ức gà', icon: '🍗' },
  { id: 5, name: 'Cơm trắng', icon: '🍚' },
  { id: 6, name: 'Rau xà lách', icon: '🥬' },
  { id: 7, name: 'Cà chua', icon: '🍅' },
  { id: 8, name: 'Hành tây', icon: '🧅' },
  { id: 9, name: 'Tỏi', icon: '🧄' },
  { id: 10, name: 'Dầu ô liu', icon: '🫒' },
  { id: 11, name: 'Nước mắm', icon: '🐟' },
  { id: 12, name: 'Đường', icon: '🍬' },
  { id: 13, name: 'Muối', icon: '🧂' },
  { id: 14, name: 'Tiêu đen', icon: '🌶️' },
  { id: 15, name: 'Bơ lạt', icon: '🧈' },
  { id: 16, name: 'Yến mạch', icon: '🥣' },
  { id: 17, name: 'Chuối', icon: '🍌' },
  { id: 18, name: 'Bơ (avocado)', icon: '🥑' },
  { id: 19, name: 'Khoai lang', icon: '🍠' },
  { id: 20, name: 'Nước tương', icon: '🥫' },
];

// ─── Recipes ────────────────────────────────────────────
const sampleRecipes: Array<{
  id: number; userId: number; recipesName: string; description: string | null;
  imageRecipe: string | null; totalTime: number | null; calories: number | null;
  protein: number | null; carbs: number | null; fats: number | null;
  sourceType: 'MANUAL' | 'IMPORTED' | 'AI_GENERATED' | null; numberOfServes: number | null;
}> = [
    {
      id: 1, userId: 1, recipesName: 'Bánh mì trứng ốp la',
      description: 'Món ăn sáng cực nhanh với bánh mì giòn và trứng ốp la vàng ươm.',
      imageRecipe: null, totalTime: 10, calories: 350, protein: 15, carbs: 40, fats: 14,
      sourceType: 'MANUAL', numberOfServes: 1,
    },
    {
      id: 2, userId: 1, recipesName: 'Overnight Oats chuối bơ đậu phộng',
      description: 'Yến mạch ngâm qua đêm với chuối, bơ đậu phộng — bữa sáng healthy không cần nấu.',
      imageRecipe: null, totalTime: 5, calories: 420, protein: 14, carbs: 55, fats: 16,
      sourceType: 'MANUAL', numberOfServes: 1,
    },
    {
      id: 3, userId: 1, recipesName: 'Salad ức gà Eat Clean',
      description: 'Salad ức gà luộc với rau xà lách, cà chua bi và sốt dầu giấm.',
      imageRecipe: null, totalTime: 20, calories: 280, protein: 35, carbs: 10, fats: 12,
      sourceType: 'MANUAL', numberOfServes: 2,
    },
    {
      id: 4, userId: 1, recipesName: 'Cơm gà teriyaki',
      description: 'Cơm trắng ăn kèm ức gà áp chảo sốt teriyaki kiểu Nhật.',
      imageRecipe: null, totalTime: 30, calories: 520, protein: 38, carbs: 55, fats: 12,
      sourceType: 'MANUAL', numberOfServes: 2,
    },
    {
      id: 5, userId: 2, recipesName: 'Canh rau củ chay',
      description: 'Canh rau củ thanh mát, bổ dưỡng cho bữa cơm gia đình.',
      imageRecipe: null, totalTime: 25, calories: 120, protein: 4, carbs: 18, fats: 3,
      sourceType: 'MANUAL', numberOfServes: 4,
    },
    {
      id: 6, userId: 2, recipesName: 'Gỏi cuốn tôm thịt',
      description: 'Gỏi cuốn tươi mát với tôm, thịt heo, bún và rau sống.',
      imageRecipe: null, totalTime: 30, calories: 200, protein: 18, carbs: 22, fats: 5,
      sourceType: 'MANUAL', numberOfServes: 4,
    },
    {
      id: 7, userId: 2, recipesName: 'Cánh gà chiên nước mắm',
      description: 'Cánh gà chiên giòn rim nước mắm tỏi ớt — món nhậu số 1.',
      imageRecipe: null, totalTime: 40, calories: 480, protein: 30, carbs: 15, fats: 32,
      sourceType: 'MANUAL', numberOfServes: 3,
    },
    {
      id: 8, userId: 3, recipesName: 'Trà đào cam sả',
      description: 'Thức uống mát lạnh, thanh nhiệt mùa hè với đào, cam và sả.',
      imageRecipe: null, totalTime: 15, calories: 90, protein: 0, carbs: 22, fats: 0,
      sourceType: 'MANUAL', numberOfServes: 2,
    },
    {
      id: 9, userId: 3, recipesName: 'Khoai lang nướng nồi chiên không dầu',
      description: 'Khoai lang nướng dẻo ngọt tự nhiên, chỉ cần nồi chiên không dầu.',
      imageRecipe: null, totalTime: 25, calories: 160, protein: 2, carbs: 37, fats: 0.2,
      sourceType: 'MANUAL', numberOfServes: 2,
    },
    {
      id: 10, userId: 3, recipesName: 'Sốt me chua ngọt',
      description: 'Nước xốt me chua ngọt dùng chấm hải sản, gỏi cuốn cực hợp.',
      imageRecipe: null, totalTime: 10, calories: 60, protein: 0.5, carbs: 14, fats: 0.3,
      sourceType: 'MANUAL', numberOfServes: 4,
    },
  ];

// ─── Steps ──────────────────────────────────────────────
const sampleSteps = [
  // Bánh mì trứng ốp la (recipe 1)
  { id: 1, recipeId: 1, stepNumber: 1, instruction: 'Bắc chảo lên bếp, cho một ít dầu ăn, đợi dầu nóng.', tip: 'Dùng chảo chống dính để trứng không bị vỡ.', time: 2 },
  { id: 2, recipeId: 1, stepNumber: 2, instruction: 'Đập trứng vào chảo, chiên lửa vừa đến khi lòng trắng chín, lòng đỏ còn lỏng.', tip: 'Đậy nắp để lòng trắng chín đều hơn.', time: 3 },
  { id: 3, recipeId: 1, stepNumber: 3, instruction: 'Nướng bánh mì cho giòn, cho trứng lên trên, nêm chút muối tiêu.', tip: null, time: 2 },

  // Overnight Oats (recipe 2)
  { id: 4, recipeId: 2, stepNumber: 1, instruction: 'Cho yến mạch, sữa tươi vào lọ thủy tinh, khuấy đều.', tip: 'Tỷ lệ yến mạch:sữa là 1:1.', time: 2 },
  { id: 5, recipeId: 2, stepNumber: 2, instruction: 'Cắt lát chuối, cho lên trên cùng bơ đậu phộng.', tip: null, time: 1 },
  { id: 6, recipeId: 2, stepNumber: 3, instruction: 'Đậy nắp, để ngăn mát tủ lạnh qua đêm (ít nhất 4 tiếng).', tip: 'Sáng hôm sau lấy ra ăn ngay, có thể rắc thêm hạt chia.', time: null },

  // Salad ức gà (recipe 3)
  { id: 7, recipeId: 3, stepNumber: 1, instruction: 'Ức gà rửa sạch, luộc chín trong nước có chút muối, vớt ra để nguội, xé sợi.', tip: 'Luộc lửa nhỏ để thịt mềm, không bị khô.', time: 10 },
  { id: 8, recipeId: 3, stepNumber: 2, instruction: 'Rau xà lách rửa sạch, cà chua bi cắt đôi, bày ra đĩa.', tip: null, time: 3 },
  { id: 9, recipeId: 3, stepNumber: 3, instruction: 'Cho ức gà xé sợi lên trên, rưới sốt dầu giấm (dầu ô liu + giấm táo + mật ong + muối).', tip: 'Làm sốt trước để các vị hòa quyện.', time: 5 },

  // Cơm gà teriyaki (recipe 4)
  { id: 10, recipeId: 4, stepNumber: 1, instruction: 'Ức gà cắt lát mỏng, ướp nước tương, mirin, đường, tỏi băm trong 15 phút.', tip: 'Ướp càng lâu càng thấm vị.', time: 15 },
  { id: 11, recipeId: 4, stepNumber: 2, instruction: 'Áp chảo ức gà trên lửa vừa cho đến khi vàng hai mặt.', tip: 'Không lật quá nhiều để thịt không bị nát.', time: 8 },
  { id: 12, recipeId: 4, stepNumber: 3, instruction: 'Rưới phần nước ướp còn lại vào chảo, đun sôi cho sốt sệt lại.', tip: null, time: 3 },
  { id: 13, recipeId: 4, stepNumber: 4, instruction: 'Xới cơm ra đĩa, xếp gà teriyaki lên trên, rắc mè trắng.', tip: 'Ăn kèm rau luộc hoặc salad.', time: 2 },
];

// ─── Cookbook ↔ Recipe (junction) ────────────────────────
const sampleCookbookRecipes = [
  { recipeId: 1, cookbookId: 1 },   // Bánh mì trứng → Bữa sáng 15 phút
  { recipeId: 2, cookbookId: 1 },   // Overnight Oats → Bữa sáng 15 phút
  { recipeId: 2, cookbookId: 2 },   // Overnight Oats → Eat Clean căn bản
  { recipeId: 3, cookbookId: 2 },   // Salad ức gà → Eat Clean căn bản
  { recipeId: 3, cookbookId: 4 },   // Salad ức gà → Tăng cơ giảm mỡ
  { recipeId: 4, cookbookId: 4 },   // Cơm gà teriyaki → Tăng cơ giảm mỡ
  { recipeId: 5, cookbookId: 5 },   // Canh rau củ chay → Món chay thanh đạm
  { recipeId: 6, cookbookId: 7 },   // Gỏi cuốn → Cơm nhà mẹ nấu
  { recipeId: 7, cookbookId: 6 },   // Cánh gà nước mắm → Món nhậu cuối tuần
  { recipeId: 8, cookbookId: 8 },   // Trà đào → Đồ uống giải nhiệt
  { recipeId: 9, cookbookId: 9 },   // Khoai lang nướng → Nồi chiên không dầu
  { recipeId: 10, cookbookId: 10 }, // Sốt me → Nước xốt đa năng
];

// ─── Recipe ↔ Tag (junction) ────────────────────────────
const sampleRecipeTags = [
  { recipeId: 1, tagId: 1 },   // Bánh mì trứng → Bữa sáng
  { recipeId: 1, tagId: 15 },  // Bánh mì trứng → Nhanh & Dễ
  { recipeId: 2, tagId: 1 },   // Overnight Oats → Bữa sáng
  { recipeId: 2, tagId: 5 },   // Overnight Oats → Eat Clean
  { recipeId: 3, tagId: 2 },   // Salad ức gà → Bữa trưa
  { recipeId: 3, tagId: 5 },   // Salad ức gà → Eat Clean
  { recipeId: 3, tagId: 8 },   // Salad ức gà → Tăng cơ
  { recipeId: 4, tagId: 3 },   // Cơm gà teriyaki → Bữa tối
  { recipeId: 4, tagId: 11 },  // Cơm gà teriyaki → Món Nhật
  { recipeId: 4, tagId: 8 },   // Cơm gà teriyaki → Tăng cơ
  { recipeId: 5, tagId: 7 },   // Canh rau củ → Chay
  { recipeId: 5, tagId: 9 },   // Canh rau củ → Món Việt
  { recipeId: 6, tagId: 9 },   // Gỏi cuốn → Món Việt
  { recipeId: 6, tagId: 15 },  // Gỏi cuốn → Nhanh & Dễ
  { recipeId: 7, tagId: 9 },   // Cánh gà → Món Việt
  { recipeId: 7, tagId: 4 },   // Cánh gà → Ăn vặt
  { recipeId: 8, tagId: 12 },  // Trà đào → Đồ uống
  { recipeId: 9, tagId: 14 },  // Khoai lang → Nồi chiên không dầu
  { recipeId: 9, tagId: 6 },   // Khoai lang → Low Carb
  { recipeId: 10, tagId: 13 }, // Sốt me → Nước xốt
];

// ─── Recipe ↔ Ingredient (junction) ─────────────────────
const sampleRecipeIngredients = [
  // Bánh mì trứng (recipe 1)
  { recipeId: 1, ingredientId: 1, quantity: 2, unit: 'quả', note: null },
  { recipeId: 1, ingredientId: 13, quantity: 0.5, unit: 'thìa cà phê', note: null },
  { recipeId: 1, ingredientId: 14, quantity: 0.25, unit: 'thìa cà phê', note: null },

  // Overnight Oats (recipe 2)
  { recipeId: 2, ingredientId: 16, quantity: 50, unit: 'g', note: null },
  { recipeId: 2, ingredientId: 3, quantity: 100, unit: 'ml', note: 'Có thể thay bằng sữa hạnh nhân' },
  { recipeId: 2, ingredientId: 17, quantity: 1, unit: 'quả', note: 'Cắt lát' },

  // Salad ức gà (recipe 3)
  { recipeId: 3, ingredientId: 4, quantity: 200, unit: 'g', note: null },
  { recipeId: 3, ingredientId: 6, quantity: 100, unit: 'g', note: null },
  { recipeId: 3, ingredientId: 7, quantity: 5, unit: 'quả', note: 'Cà chua bi' },
  { recipeId: 3, ingredientId: 10, quantity: 1, unit: 'thìa canh', note: 'Dùng cho sốt' },
  { recipeId: 3, ingredientId: 13, quantity: 0.5, unit: 'thìa cà phê', note: null },

  // Cơm gà teriyaki (recipe 4)
  { recipeId: 4, ingredientId: 4, quantity: 300, unit: 'g', note: 'Cắt lát mỏng' },
  { recipeId: 4, ingredientId: 5, quantity: 2, unit: 'chén', note: null },
  { recipeId: 4, ingredientId: 20, quantity: 2, unit: 'thìa canh', note: null },
  { recipeId: 4, ingredientId: 12, quantity: 1, unit: 'thìa canh', note: null },
  { recipeId: 4, ingredientId: 9, quantity: 2, unit: 'tép', note: 'Băm nhuyễn' },

  // Canh rau củ chay (recipe 5)
  { recipeId: 5, ingredientId: 7, quantity: 2, unit: 'quả', note: null },
  { recipeId: 5, ingredientId: 8, quantity: 1, unit: 'củ', note: 'Cắt múi cau' },
  { recipeId: 5, ingredientId: 13, quantity: 1, unit: 'thìa cà phê', note: null },

  // Cánh gà chiên nước mắm (recipe 7)
  { recipeId: 7, ingredientId: 11, quantity: 3, unit: 'thìa canh', note: null },
  { recipeId: 7, ingredientId: 12, quantity: 2, unit: 'thìa canh', note: null },
  { recipeId: 7, ingredientId: 9, quantity: 3, unit: 'tép', note: 'Băm nhuyễn' },

  // Sốt me chua ngọt (recipe 10)
  { recipeId: 10, ingredientId: 11, quantity: 2, unit: 'thìa canh', note: null },
  { recipeId: 10, ingredientId: 12, quantity: 3, unit: 'thìa canh', note: null },
  { recipeId: 10, ingredientId: 13, quantity: 0.5, unit: 'thìa cà phê', note: null },
];

// ─── Seed function ──────────────────────────────────────
const seed = async () => {
  console.log('🌱 Seeding users...');
  for (const user of sampleUsers) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: user,
      create: user,
    });
  }

  console.log('📚 Seeding cookbooks...');
  for (const cookbook of sampleCookbooks) {
    await prisma.cookbook.upsert({
      where: { id: cookbook.id },
      update: cookbook,
      create: cookbook,
    });
  }
  console.log('✅ RecipeIngredients');

  console.log('🏷️ Seeding tags...');
  for (const tag of sampleTags) {
    await prisma.tag.upsert({
      where: { id: tag.id },
      update: tag,
      create: tag,
    });
  }

  console.log('🥕 Seeding ingredients...');
  for (const ingredient of sampleIngredients) {
    await prisma.ingredient.upsert({
      where: { id: ingredient.id },
      update: ingredient,
      create: ingredient,
    });
  }

  console.log('🍳 Seeding recipes...');
  for (const recipe of sampleRecipes) {
    await prisma.recipe.upsert({
      where: { id: recipe.id },
      update: recipe,
      create: recipe,
    });
  }

  console.log('📝 Seeding steps...');
  for (const step of sampleSteps) {
    await prisma.step.upsert({
      where: { id: step.id },
      update: step,
      create: step,
    });
  }

  console.log('📖 Seeding cookbook ↔ recipe links...');
  for (const cr of sampleCookbookRecipes) {
    await prisma.cookbookRecipe.upsert({
      where: { recipeId_cookbookId: { recipeId: cr.recipeId, cookbookId: cr.cookbookId } },
      update: cr,
      create: cr,
    });
  }

  console.log('🔗 Seeding recipe ↔ tag links...');
  for (const rt of sampleRecipeTags) {
    await prisma.recipeTag.upsert({
      where: { recipeId_tagId: { recipeId: rt.recipeId, tagId: rt.tagId } },
      update: rt,
      create: rt,
    });
  }

  console.log('🧂 Seeding recipe ↔ ingredient links...');
  for (const ri of sampleRecipeIngredients) {
    await prisma.recipeIngredient.upsert({
      where: { recipeId_ingredientId: { recipeId: ri.recipeId, ingredientId: ri.ingredientId } },
      update: ri,
      create: ri,
    });
  }

  console.log('✅ All data seeded successfully!');
};

seed()
  .catch((error) => {
    console.error('❌ Data seed failed: ', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });