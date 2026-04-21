import { PrismaClient } from "@prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

// ─── Users ──────────────────────────────────────────────
const sampleUsers = [
  { userId: "1", email: 'hoangminh@gmail.com', username: 'hoangminh', avartarUrl: null },
  { userId: "2", email: 'thuylinh@gmail.com', username: 'thuylinh', avartarUrl: 'https://i.pravatar.cc/150?u=thuylinh' },
  { userId: "3", email: 'ducbao@gmail.com', username: 'ducbao', avartarUrl: null },
  { userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", email: 'admin@example.com', username: 'Admin_test', avartarUrl: null },
];

// ─── Cookbooks ──────────────────────────────────────────
const sampleCookbooks = [
  { id: 1, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Bữa sáng 15 phút' },
  { id: 2, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Eat Clean căn bản' },
  { id: 3, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Sổ tay làm bánh & Eggdrop Sandwich' },
  { id: 4, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Thực đơn tăng cơ giảm mỡ cho dân tập tạ' },
  { id: 5, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Món chay thanh đạm' },
  { id: 6, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Món nhậu cuối tuần' },
  { id: 7, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Cơm nhà mẹ nấu' },
  { id: 8, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Đồ uống giải nhiệt mùa hè' },
  { id: 9, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Bí kíp nấu ăn bằng nồi chiên không dầu' },
  { id: 10, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Công thức nước xốt đa năng' },
];

// ─── Tags ───────────────────────────────────────────────
const sampleTags = [
  // --- COOKWARE (Dụng cụ) ---
  { id: 1, name: 'Frying Pan', category: 'Cookware', emoji: '🍳' },
  { id: 2, name: 'Skillet', category: 'Cookware', emoji: '🍳' },
  { id: 3, name: 'Microwave', category: 'Cookware', emoji: '📟' },
  { id: 4, name: 'Air Fryer', category: 'Cookware', emoji: '🍟' },
  { id: 5, name: 'Oven', category: 'Cookware', emoji: '♨️' },
  { id: 6, name: 'Blender', category: 'Cookware', emoji: '🥤' },
  { id: 7, name: 'Slow Cooker', category: 'Cookware', emoji: '🍲' },

  // --- DISH TYPE (Loại bữa ăn) ---
  { id: 8, name: 'Breakfast', category: 'Dish Type', emoji: '🥐' },
  { id: 9, name: 'Lunch', category: 'Dish Type', emoji: '🥪' },
  { id: 10, name: 'Dinner', category: 'Dish Type', emoji: '🍜' },
  { id: 11, name: 'Snack', category: 'Dish Type', emoji: '🍿' },
  { id: 12, name: 'Dessert', category: 'Dish Type', emoji: '🍰' },
  { id: 13, name: 'Drink', category: 'Dish Type', emoji: '🍹' },

  // --- DIET (Chế độ ăn) ---
  { id: 14, name: 'Vegan', category: 'Diet', emoji: '🥕' },
  { id: 15, name: 'Vegetarian', category: 'Diet', emoji: '🥗' },
  { id: 16, name: 'Keto', category: 'Diet', emoji: '🥑' },
  { id: 17, name: 'Low Carb', category: 'Diet', emoji: '🥬' },
  { id: 18, name: 'Low Calorie', category: 'Diet', emoji: '🥒' },
  { id: 19, name: 'Low Fat', category: 'Diet', emoji: '🚫' },
  { id: 20, name: 'High Protein', category: 'Diet', emoji: '💪' },
  { id: 21, name: 'High Fiber', category: 'Diet', emoji: '🌾' },
  { id: 22, name: 'Pet Food', category: 'Diet', emoji: '🐾' },

  // --- CUISINE (Ẩm thực) ---
  { id: 23, name: 'American', category: 'Cuisine', emoji: '🍔' },
  { id: 24, name: 'Mexican', category: 'Cuisine', emoji: '🌮' },
  { id: 25, name: 'Chinese', category: 'Cuisine', emoji: '🥟' },
  { id: 26, name: 'Italian', category: 'Cuisine', emoji: '🍕' },
  { id: 27, name: 'Japanese', category: 'Cuisine', emoji: '🍱' },
  { id: 28, name: 'Korean', category: 'Cuisine', emoji: '🍲' },
  { id: 29, name: 'Spicy', category: 'Cuisine', emoji: '🌶️' },
  { id: 30, name: 'Sweet', category: 'Cuisine', emoji: '🍯' },
  { id: 31, name: 'Savory', category: 'Cuisine', emoji: '🧂' },

  // --- ALLERGEN FREE (Dị ứng) ---
  { id: 32, name: 'Nut Free', category: 'Allergen Free', emoji: '🥜' },
  { id: 33, name: 'Egg Free', category: 'Allergen Free', emoji: '🥚' },
  { id: 34, name: 'Soy Free', category: 'Allergen Free', emoji: '🫛' },
  { id: 35, name: 'Shellfish Free', category: 'Allergen Free', emoji: '🦐' },

  // --- TIME (Thời gian) ---
  { id: 36, name: '15 mins', category: 'Time', emoji: '⏱️' },
  { id: 37, name: '30 mins', category: 'Time', emoji: '⏱️' },
  { id: 38, name: '60 mins', category: 'Time', emoji: '⏱️' },
];

// ─── Ingredients ────────────────────────────────────────
const sampleIngredients = [
  { id: 1, name: 'Thịt gà', icon: '🍗', bgColor: '#FFEEEE' },
  { id: 2, name: 'Trứng', icon: '🥚', bgColor: '#FFF8E1' },
  { id: 3, name: 'Sữa tươi', icon: '🥛', bgColor: '#E3F2FD' },
  { id: 4, name: 'Bánh mì', icon: '🍞', bgColor: '#FFF8E1' },
  { id: 5, name: 'Phô mai', icon: '🧀', bgColor: '#E3F2FD' },
  { id: 6, name: 'Gạo tẻ', icon: '🍚', bgColor: '#F5F5F5' },
  { id: 7, name: 'Mì Ý', icon: '🍝', bgColor: '#E3F2FD' },
  { id: 8, name: 'Khoai tây', icon: '🥔', bgColor: '#FFFDE7' },
  { id: 9, name: 'Hành tây', icon: '🧅', bgColor: '#FCE4EC' },
  { id: 10, name: 'Cà chua', icon: '🍅', bgColor: '#FFFDE7' },
  { id: 11, name: 'Xà lách', icon: '🥬', bgColor: '#E8F5E9' },
  { id: 12, name: 'Thịt băm', icon: '🥩', bgColor: '#FFEEEE' },
  { id: 13, name: 'Thịt bò', icon: '🥩', bgColor: '#FFEEEE' },
  { id: 14, name: 'Thịt xông khói', icon: '🥓', bgColor: '#FFEEEE' },
  { id: 15, name: 'Xúc xích', icon: '🌭', bgColor: '#FFEEEE' },
  { id: 16, name: 'Cà rốt', icon: '🥕', bgColor: '#FFFDE7' },
  { id: 17, name: 'Táo', icon: '🍎', bgColor: '#FCE4EC' },
  { id: 18, name: 'Chuối', icon: '🍌', bgColor: '#FFF9C4' },
  { id: 19, name: 'Cam', icon: '🍊', bgColor: '#FFFDE7' },
  { id: 20, name: 'Dâu tây', icon: '🍓', bgColor: '#FFEEEE' },
  { id: 21, name: 'Việt quất', icon: '🫐', bgColor: '#E3F2FD' },
  { id: 22, name: 'Cải bó xôi', icon: '🥬', bgColor: '#E8F5E9' },
  { id: 23, name: 'Dưa leo', icon: '🥒', bgColor: '#E8F5E9' },
  { id: 24, name: 'Bơ', icon: '🥑', bgColor: '#E8F5E9' },
  { id: 25, name: 'Khoai lang', icon: '🍠', bgColor: '#FCE4EC' },
  { id: 26, name: 'Bắp (Ngô)', icon: '🌽', bgColor: '#FFF9C4' },
  { id: 27, name: 'Sữa chua', icon: '🥣', bgColor: '#E3F2FD' },
  { id: 28, name: 'Cá hồi', icon: '🐟', bgColor: '#FCE4EC' },
  { id: 29, name: 'Gà tây', icon: '🍗', bgColor: '#FCE4EC' },
  { id: 30, name: 'Thịt nguội', icon: '🍖', bgColor: '#FFEEEE' },
  { id: 31, name: 'Tôm', icon: '🦐', bgColor: '#FCE4EC' },
  { id: 32, name: 'Thịt lợn', icon: '🥩', bgColor: '#FFEEEE' },
  { id: 33, name: 'Đậu phụ', icon: '⬜', bgColor: '#E3F2FD' },
  { id: 34, name: 'Hạnh nhân', icon: '🫘', bgColor: '#F5F5F5' },
  { id: 35, name: 'Hạt điều', icon: '🥜', bgColor: '#FFF8E1' },
  { id: 36, name: 'Nấm', icon: '🍄', bgColor: '#FFF8E1' },
  { id: 37, name: 'Đậu que', icon: '🫛', bgColor: '#E8F5E9' },
  { id: 38, name: 'Bí ngòi', icon: '🥒', bgColor: '#E8F5E9' },
  { id: 39, name: 'Nho', icon: '🍇', bgColor: '#E3F2FD' },
  { id: 40, name: 'Lê', icon: '🍐', bgColor: '#FFF9C4' },
  { id: 41, name: 'Đào', icon: '🍑', bgColor: '#FCE4EC' },
  { id: 42, name: 'Xoài', icon: '🥭', bgColor: '#FFFDE7' },
  { id: 43, name: 'Chanh vàng', icon: '🍋', bgColor: '#FFF9C4' },
  { id: 44, name: 'Hạt chia', icon: '⚫', bgColor: '#FFF8E1' },
  { id: 45, name: 'Đậu đen', icon: '🫘', bgColor: '#FFF8E1' },
  { id: 46, name: 'Đậu gà', icon: '🫘', bgColor: '#F5F5F5' },
  { id: 47, name: 'Cải xoăn', icon: '🥬', bgColor: '#E8F5E9' },
  { id: 48, name: 'Súp lơ trắng', icon: '🥦', bgColor: '#E8F5E9' },
  { id: 49, name: 'Ớt chuông', icon: '🫑', bgColor: '#FFF9C4' },
  { id: 50, name: 'Bí đỏ', icon: '🎃', bgColor: '#FFFDE7' },
  { id: 51, name: 'Củ cải', icon: '🌱', bgColor: '#FCE4EC' },
  { id: 52, name: 'Bắp cải tím', icon: '🥬', bgColor: '#FCE4EC' },
  { id: 53, name: 'Xà lách lolo đỏ', icon: '🥬', bgColor: '#FCE4EC' },
  { id: 54, name: 'Kiwi', icon: '🥝', bgColor: '#E8F5E9' },
  { id: 55, name: 'Atisô', icon: '🌿', bgColor: '#E8F5E9' },
  { id: 56, name: 'Măng tây', icon: '🥬', bgColor: '#E8F5E9' },
  { id: 57, name: 'Thịt cua', icon: '🦀', bgColor: '#FCE4EC' },
  { id: 58, name: 'Nghêu', icon: '🦪', bgColor: '#FCE4EC' },
  { id: 59, name: 'Cá tuyết', icon: '🐟', bgColor: '#FFEEEE' },
  { id: 60, name: 'Vẹm', icon: '🦪', bgColor: '#FCE4EC' },
  { id: 61, name: 'Mực', icon: '🦑', bgColor: '#FCE4EC' },
  { id: 62, name: 'Hàu', icon: '🦪', bgColor: '#FCE4EC' },
  { id: 63, name: 'Mì sợi', icon: '🍜', bgColor: '#FFF8E1' },
  { id: 64, name: 'Bột mì', icon: '🥣', bgColor: '#F5F5F5' },
  { id: 65, name: 'Nước lọc', icon: '🥛', bgColor: '#E3F2FD' },
  { id: 66, name: 'Húng quế', icon: '🌿', bgColor: '#E8F5E9' },
  { id: 67, name: 'Ngò rí', icon: '🌿', bgColor: '#E8F5E9' },
  { id: 68, name: 'Anh đào (Cherry)', icon: '🍒', bgColor: '#FFEEEE' },
  { id: 69, name: 'Dưa lưới', icon: '🍈', bgColor: '#E8F5E9' },
  { id: 70, name: 'Sườn cừu', icon: '🍖', bgColor: '#FFEEEE' },
  { id: 71, name: 'Giá đỗ', icon: '🌱', bgColor: '#FCE4EC' },
  { id: 72, name: 'Xương bò', icon: '🍖', bgColor: '#FCE4EC' },
  { id: 73, name: 'Sườn bò', icon: '🍖', bgColor: '#FFEEEE' },
  { id: 74, name: 'Dồi huyết', icon: '🌭', bgColor: '#FCE4EC' },
  { id: 75, name: 'Chả cá ống', icon: '🍢', bgColor: '#FFFDE7' },
  { id: 76, name: 'Đậu phụ rán', icon: '🧆', bgColor: '#FFF8E1' },
  { id: 77, name: 'Lươn', icon: '🐟', bgColor: '#FCE4EC' },
  { id: 78, name: 'Nấm kim châm', icon: '🍄', bgColor: '#FFF8E1' },
  { id: 79, name: 'Chả cá', icon: '🍢', bgColor: '#FFF9C4' },
  { id: 80, name: 'Đậu phụ cá', icon: '🧊', bgColor: '#FFF9C4' },
  { id: 81, name: 'Rong biển cuộn', icon: '🍙', bgColor: '#E8F5E9' },
  { id: 82, name: 'Gạo nếp', icon: '🍚', bgColor: '#FFF9C4' },
  { id: 83, name: 'Mì ăn liền', icon: '🍜', bgColor: '#E3F2FD' },
  { id: 84, name: 'Chả xoắn Nhật', icon: '🍥', bgColor: '#FCE4EC' },
  { id: 85, name: 'Nấm đùi gà', icon: '🍄', bgColor: '#FFF8E1' },
  { id: 86, name: 'Tảo bẹ', icon: '🌿', bgColor: '#E8F5E9' },
  { id: 87, name: 'Nấm tùng nhung', icon: '🍄', bgColor: '#FFF8E1' },
  { id: 88, name: 'Cá thu đao', icon: '🐟', bgColor: '#E3F2FD' },
  { id: 89, name: 'Lá tía tô', icon: '🌿', bgColor: '#E8F5E9' },
  { id: 90, name: 'Thịt ba chỉ', icon: '🥓', bgColor: '#FFEEEE' },
  { id: 91, name: 'Rượu trắng', icon: '🍾', bgColor: '#E3F2FD' },
  { id: 92, name: 'Bánh gạo', icon: '🍡', bgColor: '#FFFDE7' },
  { id: 93, name: 'Mì Udon', icon: '🍜', bgColor: '#E3F2FD' },
  { id: 94, name: 'Rau cần nước', icon: '🌿', bgColor: '#E8F5E9' },
  { id: 95, name: 'Khoai mỡ', icon: '🍠', bgColor: '#FFFDE7' },
  { id: 96, name: 'Bào ngư', icon: '🦪', bgColor: '#FFF9C4' },
  { id: 97, name: 'Hạt dẻ', icon: '🌰', bgColor: '#FFF9C4' },
  { id: 98, name: 'Mề gà', icon: '🫀', bgColor: '#FCE4EC' },
  { id: 99, name: 'Hẹ', icon: '🌿', bgColor: '#E8F5E9' },
  { id: 100, name: 'Cá khô', icon: '🐟', bgColor: '#FFFDE7' },
  { id: 101, name: 'Cà tím', icon: '🍆', bgColor: '#E3F2FD' },
  { id: 102, name: 'Cá viên', icon: '🍡', bgColor: '#FFF8E1' },
  { id: 103, name: 'Miến', icon: '🍜', bgColor: '#E3F2FD' },
  { id: 104, name: 'Táo tàu', icon: '🫘', bgColor: '#FCE4EC' },
  { id: 105, name: 'Kim chi', icon: '🥬', bgColor: '#FCE4EC' },
  { id: 106, name: 'Thịt bò nội', icon: '🥩', bgColor: '#FFEEEE' },
  { id: 107, name: 'Đậu phụ khô', icon: '🧊', bgColor: '#FFF9C4' },
  { id: 108, name: 'Đậu tương lên men', icon: '🫘', bgColor: '#FFF8E1' },
  { id: 109, name: 'Sò điệp', icon: '🦪', bgColor: '#FCE4EC' },
  { id: 110, name: 'Rong biển', icon: '🌿', bgColor: '#E8F5E9' },
  { id: 111, name: 'Bún nưa', icon: '🍜', bgColor: '#FFF9C4' },
  { id: 112, name: 'Ngao hai cồi', icon: '🦪', bgColor: '#FCE4EC' },
  { id: 113, name: 'Cá cơm', icon: '🐟', bgColor: '#FFFDE7' }
];

// ─── Recipes ────────────────────────────────────────────
const sampleRecipes: Array<{
  id: number; userId: string; name: string; description: string | null;
  imageRecipe: string | null; totalTime: number | null; calories: number | null;
  protein: number | null; carbs: number | null; fats: number | null;
  sourceType: 'MANUAL' | 'IMPORTED' | 'AI_GENERATED' | null; numberOfServes: number | null;
}> = [
  {
    id: 1, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Bánh mì trứng ốp la',
    description: 'Món ăn sáng cực nhanh với bánh mì giòn và trứng ốp la vàng ươm.',
    imageRecipe: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&q=80', totalTime: 10, calories: 350, protein: 15, carbs: 40, fats: 14,
    sourceType: 'MANUAL', numberOfServes: 1,
  },
  {
    id: 2, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Overnight Oats',
    description: 'Yến mạch ngâm qua đêm với sữa tươi, chuối và hạt chia thơm ngon.',
    imageRecipe: 'https://images.unsplash.com/photo-1517673132405-a56a62b18acc?w=800&q=80', totalTime: 5, calories: 300, protein: 10, carbs: 45, fats: 8,
    sourceType: 'MANUAL', numberOfServes: 1,
  },
  {
    id: 3, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Salad ức gà',
    description: 'Món salad tốt cho sức khỏe với ức gà luộc, xà lách và sốt dầu giấm.',
    imageRecipe: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80', totalTime: 20, calories: 350, protein: 30, carbs: 10, fats: 12,
    sourceType: 'MANUAL', numberOfServes: 1,
  },
  {
    id: 4, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Cơm gà teriyaki',
    description: 'Gà áp chảo với xốt teriyaki Nhật Bản đậm đà ăn kèm cơm trắng.',
    imageRecipe: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8ec?w=800&q=80', totalTime: 25, calories: 520, protein: 35, carbs: 65, fats: 15,
    sourceType: 'MANUAL', numberOfServes: 1,
  },
  {
    id: 5, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Canh rau củ chay',
    description: 'Canh thanh đạm với súp lơ, cà rốt và khoai tây.',
    imageRecipe: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80', totalTime: 30, calories: 150, protein: 5, carbs: 25, fats: 2,
    sourceType: 'MANUAL', numberOfServes: 2,
  },
  {
    id: 6, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Gỏi cuốn tôm thịt',
    description: 'Món gỏi cuốn tươi mát với tôm, thịt ba chỉ và rau sống.',
    imageRecipe: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=800&q=80', totalTime: 20, calories: 200, protein: 12, carbs: 30, fats: 4,
    sourceType: 'MANUAL', numberOfServes: 2,
  },
  {
    id: 7, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Cánh gà chiên nước mắm',
    description: 'Cánh gà chiên giòn quyện sốt nước mắm tỏi ớt đậm đà.',
    imageRecipe: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=800&q=80', totalTime: 30, calories: 450, protein: 25, carbs: 5, fats: 35,
    sourceType: 'MANUAL', numberOfServes: 2,
  },
  {
    id: 8, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Trà đào sả vải',
    description: 'Thức uống giải nhiệt với trà, đào miếng và hương sả thơm mát.',
    imageRecipe: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80', totalTime: 10, calories: 120, protein: 0, carbs: 30, fats: 0,
    sourceType: 'MANUAL', numberOfServes: 1,
  },
  {
    id: 9, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Khoai lang nướng nồi chiên không dầu',
    description: 'Khoai lang nướng mật ngọt lịm, giữ trọn dinh dưỡng.',
    imageRecipe: 'https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?w=800&q=80', totalTime: 30, calories: 200, protein: 2, carbs: 45, fats: 0,
    sourceType: 'MANUAL', numberOfServes: 1,
  },
  {
    id: 10, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Sốt me đa năng',
    description: 'Sốt me chua ngọt dùng để xào tôm, sườn hoặc chấm đồ nướng.',
    imageRecipe: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=800&q=80', totalTime: 15, calories: 100, protein: 1, carbs: 20, fats: 2,
    sourceType: 'MANUAL', numberOfServes: 4,
  },
  {
    id: 11, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Mì Ý sốt bò băm cà chua',
    description: 'Sự kết hợp giữa mì Ý, thịt bò băm và xốt cà chua tươi cùng hành tây.',
    imageRecipe: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&q=80', totalTime: 25, calories: 450, protein: 25, carbs: 60, fats: 12,
    sourceType: 'MANUAL', numberOfServes: 2,
  },
  {
    id: 12, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Bò xào bông cải xanh',
    description: 'Thịt bò nội xào cùng súp lơ trắng và cà rốt, hành tây.',
    imageRecipe: 'https://images.unsplash.com/photo-1512058560566-42724afbc2aa?w=800&q=80', totalTime: 15, calories: 320, protein: 28, carbs: 15, fats: 18,
    sourceType: 'MANUAL', numberOfServes: 2,
  },
  {
    id: 13, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Canh kim chi đậu phụ',
    description: 'Vị chua cay của kim chi nấu cùng đậu phụ, thịt ba chỉ và hành tây.',
    imageRecipe: 'https://images.unsplash.com/photo-1583064313642-a7c1df76efe5?w=800&q=80', totalTime: 30, calories: 280, protein: 18, carbs: 20, fats: 15,
    sourceType: 'MANUAL', numberOfServes: 2,
  },
  {
    id: 14, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Mì Udon hải sản',
    description: 'Mì Udon dai giòn nấu cùng tôm, mực và vẹm trong nước dùng tảo bẹ.',
    imageRecipe: 'https://images.unsplash.com/photo-1552611052-33e04de081de?w=800&q=80', totalTime: 20, calories: 410, protein: 22, carbs: 65, fats: 8,
    sourceType: 'MANUAL', numberOfServes: 1,
  },
  {
    id: 15, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Cá hồi áp chảo sốt bơ chanh',
    description: 'Cá hồi tươi áp chảo ăn kèm măng tây và sốt chanh vàng béo ngậy.',
    imageRecipe: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80', totalTime: 15, calories: 450, protein: 35, carbs: 5, fats: 32,
    sourceType: 'MANUAL', numberOfServes: 1,
  },
  {
    id: 16, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Salad bơ và hạt chia',
    description: 'Món salad xanh mát từ bơ, xà lách, dưa leo rắc hạt chia bổ dưỡng.',
    imageRecipe: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80', totalTime: 10, calories: 220, protein: 5, carbs: 12, fats: 18,
    sourceType: 'MANUAL', numberOfServes: 1,
  },
  {
    id: 17, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Súp bí đỏ kem tươi',
    description: 'Bí đỏ nghiền mịn nấu cùng sữa tươi và hành tây.',
    imageRecipe: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=800&q=80', totalTime: 30, calories: 180, protein: 4, carbs: 25, fats: 8,
    sourceType: 'MANUAL', numberOfServes: 3,
  },
  {
    id: 18, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Lẩu nấm tổng hợp',
    description: 'Nước dùng thanh đạm nấu từ củ cải, nấm kim châm, nấm đùi gà và nấm tùng nhung.',
    imageRecipe: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80', totalTime: 40, calories: 150, protein: 10, carbs: 20, fats: 2,
    sourceType: 'MANUAL', numberOfServes: 4,
  },
  {
    id: 19, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Bào ngư hầm táo tàu',
    description: 'Món ăn bổ dưỡng với bào ngư tươi, táo tàu và kỷ tử hầm kỹ.',
    imageRecipe: 'https://images.unsplash.com/photo-1626202340502-999333967401?w=800&q=80', totalTime: 60, calories: 320, protein: 40, carbs: 30, fats: 5,
    sourceType: 'MANUAL', numberOfServes: 2,
  },
  {
    id: 20, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Cơm rang dưa bò',
    description: 'Gạo tẻ rang săn cùng thịt bò nội và dưa cải muối chua.',
    imageRecipe: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80', totalTime: 25, calories: 550, protein: 22, carbs: 70, fats: 20,
    sourceType: 'MANUAL', numberOfServes: 1,
  },
  {
    id: 21, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Mực xào cần tỏi',
    description: 'Mực tươi xào cùng rau cần nước, hành tây và ớt chuông.',
    imageRecipe: 'https://images.unsplash.com/photo-1533630666244-93437452d3a9?w=800&q=80', totalTime: 15, calories: 210, protein: 25, carbs: 10, fats: 8,
    sourceType: 'MANUAL', numberOfServes: 2,
  },
  {
    id: 22, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Bún nưa trộn chay',
    description: 'Bún nưa ít calo trộn cùng đậu phụ rán, dưa leo và giá đỗ.',
    imageRecipe: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80', totalTime: 15, calories: 120, protein: 8, carbs: 15, fats: 5,
    sourceType: 'MANUAL', numberOfServes: 1,
  },
  {
    id: 23, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Ngao hấp sả ớt',
    description: 'Ngao hai cồi hấp cùng sả tươi, chanh vàng và chút rượu trắng.',
    imageRecipe: 'https://images.unsplash.com/photo-1534422298391-e4f8c170db06?w=800&q=80', totalTime: 15, calories: 140, protein: 15, carbs: 5, fats: 3,
    sourceType: 'MANUAL', numberOfServes: 2,
  },
  {
    id: 24, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Sườn cừu nướng thảo mộc',
    description: 'Sườn cừu nướng cùng húng quế, khoai tây và tỏi.',
    imageRecipe: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80', totalTime: 45, calories: 600, protein: 45, carbs: 20, fats: 40,
    sourceType: 'MANUAL', numberOfServes: 2,
  },
  {
    id: 25, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Sữa chua việt quất hạt điều',
    description: 'Bữa phụ nhẹ nhàng với sữa chua, quả việt quất và hạt điều giòn rụm.',
    imageRecipe: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80', totalTime: 5, calories: 250, protein: 8, carbs: 30, fats: 12,
    sourceType: 'MANUAL', numberOfServes: 1,
  },
  {
    id: 26, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Tôm rim tỏi ớt',
    description: 'Tôm tươi rim cùng nước mắm, đường, tỏi và ớt chuông.',
    imageRecipe: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=800&q=80', totalTime: 20, calories: 240, protein: 28, carbs: 8, fats: 10,
    sourceType: 'MANUAL', numberOfServes: 2,
  },
  {
    id: 27, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Canh rong biển sườn bò',
    description: 'Rong biển nấu cùng sườn bò và tỏi theo phong cách Hàn Quốc.',
    imageRecipe: 'https://images.unsplash.com/photo-1547928576-a4a33237ce35?w=800&q=80', totalTime: 50, calories: 350, protein: 30, carbs: 10, fats: 22,
    sourceType: 'MANUAL', numberOfServes: 3,
  },
  {
    id: 28, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Khoai mỡ bọc tôm chiên',
    description: 'Khoai mỡ hấp nghiền mịn bọc tôm tươi rồi chiên giòn.',
    imageRecipe: 'https://images.unsplash.com/photo-1541529086526-db283c563270?w=800&q=80', totalTime: 35, calories: 380, protein: 15, carbs: 45, fats: 18,
    sourceType: 'MANUAL', numberOfServes: 3,
  },
  {
    id: 29, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Mì ăn liền xào hải sản',
    description: 'Mì ăn liền xào cùng mực, tôm và cải bó xôi.',
    imageRecipe: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&q=80', totalTime: 15, calories: 480, protein: 20, carbs: 55, fats: 20,
    sourceType: 'MANUAL', numberOfServes: 1,
  },
  {
    id: 30, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Sinh tố chuối dâu tây',
    description: 'Thức uống từ chuối, dâu tây và sữa tươi thanh mát.',
    imageRecipe: 'https://images.unsplash.com/photo-1550507992-eb63ffee0847?w=800&q=80', totalTime: 5, calories: 190, protein: 5, carbs: 40, fats: 2,
    sourceType: 'MANUAL', numberOfServes: 1,
  },
  {
    id: 31, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Đậu phụ sốt nấm',
    description: 'Đậu phụ rán mềm sốt cùng nấm kim châm và nấm đùi gà.',
    imageRecipe: 'https://images.unsplash.com/photo-1525855715739-0965ad2613cb?w=800&q=80', totalTime: 20, calories: 210, protein: 15, carbs: 12, fats: 12,
    sourceType: 'MANUAL', numberOfServes: 2,
  },
  {
    id: 32, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Cá thu đao nướng muối',
    description: 'Cá thu đao nướng giòn da, ăn kèm chanh vàng và củ cải bào.',
    imageRecipe: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80', totalTime: 25, calories: 320, protein: 28, carbs: 0, fats: 24,
    sourceType: 'MANUAL', numberOfServes: 1,
  },
  {
    id: 33, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Bánh gạo Tokbokki',
    description: 'Bánh gạo nấu cùng chả cá xoắn Nhật, kim chi và sốt cay.',
    imageRecipe: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800&q=80', totalTime: 20, calories: 450, protein: 12, carbs: 85, fats: 6,
    sourceType: 'MANUAL', numberOfServes: 2,
  },
  {
    id: 34, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Gà hầm hạt dẻ',
    description: 'Thịt gà ta hầm cùng hạt dẻ thơm bùi và cà rốt.',
    imageRecipe: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80', totalTime: 50, calories: 480, protein: 35, carbs: 30, fats: 25,
    sourceType: 'MANUAL', numberOfServes: 3,
  },
  {
    id: 35, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Salad táo việt quất',
    description: 'Táo xắt nhỏ trộn cùng quả việt quất, hạnh nhân và sốt sữa chua.',
    imageRecipe: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80', totalTime: 10, calories: 180, protein: 4, carbs: 35, fats: 5,
    sourceType: 'MANUAL', numberOfServes: 1,
  },
  {
    id: 36, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Hàu nướng phô mai',
    description: 'Hàu tươi phủ phô mai và sữa tươi nướng thơm lừng.',
    imageRecipe: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80', totalTime: 20, calories: 350, protein: 18, carbs: 10, fats: 28,
    sourceType: 'MANUAL', numberOfServes: 2,
  },
  {
    id: 37, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Miến xào cua',
    description: 'Miến dai xào cùng thịt cua tươi, mộc nhĩ và hành tây.',
    imageRecipe: 'https://images.unsplash.com/photo-1540331547168-8b63109225b7?w=800&q=80', totalTime: 30, calories: 420, protein: 25, carbs: 55, fats: 14,
    sourceType: 'MANUAL', numberOfServes: 2,
  },
  {
    id: 38, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Sò điệp áp chảo bơ tỏi',
    description: 'Sò điệp áp chảo cùng bơ và tỏi, trang trí bằng ngò rí.',
    imageRecipe: 'https://images.unsplash.com/photo-1626645272163-460fe3877b96?w=800&q=80', totalTime: 15, calories: 280, protein: 22, carbs: 8, fats: 18,
    sourceType: 'MANUAL', numberOfServes: 1,
  },
  {
    id: 39, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Bắp nướng mỡ hành ba chỉ',
    description: 'Bắp ngô nướng ăn kèm mỡ hành và vụn thịt ba chỉ chiên giòn.',
    imageRecipe: 'https://images.unsplash.com/photo-1541304916205-f3c5b3699889?w=800&q=80', totalTime: 20, calories: 310, protein: 8, carbs: 45, fats: 14,
    sourceType: 'MANUAL', numberOfServes: 2,
  },
  {
    id: 40, userId: "user_3BbkvYViAMYnHhHcNQ7eWXdLyG1", name: 'Canh cá khô củ cải',
    description: 'Món canh thanh nhiệt giải rượu từ cá khô, củ cải và hành lá.',
    imageRecipe: 'https://images.unsplash.com/photo-1511910849309-0dffb8785146?w=800&q=80', totalTime: 25, calories: 160, protein: 18, carbs: 12, fats: 4,
    sourceType: 'MANUAL', numberOfServes: 3,
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

// ─── Destroy function ───────────────────────────────────
const destroy = async () => {
  console.log('🗑️  Destroying all data...');
  await prisma.$executeRawUnsafe(
    `TRUNCATE TABLE users, cookbooks, recipes, steps, ingredients, tags,
     cookbook_recipes, recipe_ingredients, recipe_tags RESTART IDENTITY CASCADE`
  );
  console.log('✅ All data destroyed.');
};

// ─── Seed function ──────────────────────────────────────
const seed = async () => {
  await destroy();
  console.log('🌱 Seeding users...');
  for (const user of sampleUsers) {
    await prisma.user.upsert({
      where: { userId: user.userId },
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
  console.log('✅ Cookbooks');

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