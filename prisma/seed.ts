import prisma from '../src/db';

// ─── 1. USERS ────────────────────────────────────────────────
const sampleUsers = [
  { id: 1, email: 'an@smartkitchen.vn', passwordHash: 'hashed_pw_1', username: 'Nguyễn Văn An', avartarUrl: null },
  { id: 2, email: 'binh@smartkitchen.vn', passwordHash: 'hashed_pw_2', username: 'Trần Thị Bình', avartarUrl: null },
  { id: 3, email: 'cuong@smartkitchen.vn', passwordHash: 'hashed_pw_3', username: 'Lê Minh Cường', avartarUrl: null },
];

// ─── 2. TAGS ─────────────────────────────────────────────────
const sampleTags = [
  { id: 1, name: 'Bữa sáng', category: 'Bữa ăn' },
  { id: 2, name: 'Bữa trưa', category: 'Bữa ăn' },
  { id: 3, name: 'Bữa tối', category: 'Bữa ăn' },
  { id: 4, name: 'Eat Clean', category: 'Chế độ ăn' },
  { id: 5, name: 'Món chay', category: 'Chế độ ăn' },
  { id: 6, name: 'Tăng cơ', category: 'Chế độ ăn' },
  { id: 7, name: 'Món Việt', category: 'Ẩm thực' },
  { id: 8, name: 'Món Á', category: 'Ẩm thực' },
  { id: 9, name: 'Nhanh & Dễ', category: 'Độ khó' },
  { id: 10, name: 'Nâng cao', category: 'Độ khó' },
  { id: 11, name: 'Đồ uống', category: 'Loại' },
  { id: 12, name: 'Món nhậu', category: 'Loại' },
];

// ─── 3. INGREDIENTS ──────────────────────────────────────────
const sampleIngredients = [
  { id: 1, name: 'Trứng gà', icon: '🥚' },
  { id: 2, name: 'Cơm trắng', icon: '🍚' },
  { id: 3, name: 'Ức gà', icon: '🍗' },
  { id: 4, name: 'Bông cải xanh', icon: '🥦' },
  { id: 5, name: 'Cà chua', icon: '🍅' },
  { id: 6, name: 'Hành tây', icon: '🧅' },
  { id: 7, name: 'Tỏi', icon: '🧄' },
  { id: 8, name: 'Nước mắm', icon: '🫗' },
  { id: 9, name: 'Đường', icon: '🍬' },
  { id: 10, name: 'Tiêu', icon: '🌶️' },
  { id: 11, name: 'Dầu ăn', icon: '🫒' },
  { id: 12, name: 'Bún', icon: '🍜' },
  { id: 13, name: 'Thịt bò', icon: '🥩' },
  { id: 14, name: 'Rau muống', icon: '🥬' },
  { id: 15, name: 'Đậu hũ', icon: '🧈' },
  { id: 16, name: 'Nấm', icon: '🍄' },
  { id: 17, name: 'Sả', icon: '🌿' },
  { id: 18, name: 'Gừng', icon: '🫚' },
  { id: 19, name: 'Chanh', icon: '🍋' },
  { id: 20, name: 'Ớt', icon: '🌶️' },
];

// ─── 4. RECIPES ──────────────────────────────────────────────
const sampleRecipes = [
  {
    id: 1, userId: 1,
    recipesName: 'Trứng chiên nước mắm',
    description: 'Trứng chiên giòn rìa, thơm phức nước mắm – món đơn giản chuẩn vị mẹ nấu.',
    totalTime: 10, calories: 220, protein: 14, carbs: 2, fats: 18,
    sourceType: 'MANUAL' as const, numberOfServes: 1,
  },
  {
    id: 2, userId: 1,
    recipesName: 'Cơm chiên trứng',
    description: 'Cơm chiên trứng nhanh gọn cho bữa sáng hoặc khi lười nấu, tốn chưa tới 15 phút.',
    totalTime: 15, calories: 450, protein: 15, carbs: 55, fats: 18,
    sourceType: 'MANUAL' as const, numberOfServes: 2,
  },
  {
    id: 3, userId: 1,
    recipesName: 'Ức gà áp chảo eat clean',
    description: 'Ức gà ướp sả ớt, áp chảo giữ nước – chuẩn eat clean cho dân tập gym.',
    totalTime: 25, calories: 300, protein: 42, carbs: 5, fats: 12,
    sourceType: 'MANUAL' as const, numberOfServes: 1,
  },
  {
    id: 4, userId: 2,
    recipesName: 'Canh cà chua trứng',
    description: 'Canh cà chua trứng thanh mát, nấu siêu nhanh mà vẫn ngon ngọt tự nhiên.',
    totalTime: 15, calories: 150, protein: 10, carbs: 8, fats: 9,
    sourceType: 'MANUAL' as const, numberOfServes: 2,
  },
  {
    id: 5, userId: 2,
    recipesName: 'Bún bò xào sả ớt',
    description: 'Bún bò xào sả ớt đậm đà, cay thơm – ăn là ghiền, làm cực nhanh.',
    totalTime: 20, calories: 520, protein: 30, carbs: 50, fats: 20,
    sourceType: 'MANUAL' as const, numberOfServes: 2,
  },
  {
    id: 6, userId: 2,
    recipesName: 'Rau muống xào tỏi',
    description: 'Rau muống xào lửa lớn với tỏi phi thơm – món rau xanh kinh điển mâm cơm Việt.',
    totalTime: 10, calories: 80, protein: 3, carbs: 6, fats: 5,
    sourceType: 'MANUAL' as const, numberOfServes: 2,
  },
  {
    id: 7, userId: 3,
    recipesName: 'Đậu hũ sốt cà chua',
    description: 'Đậu hũ chiên giòn sốt cà chua ngọt thanh – món chay ngon miệng cả nhà thích.',
    totalTime: 20, calories: 200, protein: 12, carbs: 15, fats: 10,
    sourceType: 'MANUAL' as const, numberOfServes: 2,
  },
  {
    id: 8, userId: 3,
    recipesName: 'Nấm xào thập cẩm',
    description: 'Nấm xào với rau củ giòn sựt, thanh nhẹ mà vẫn đủ chất.',
    totalTime: 15, calories: 120, protein: 6, carbs: 10, fats: 7,
    sourceType: 'MANUAL' as const, numberOfServes: 2,
  },
];

// ─── 5. STEPS ────────────────────────────────────────────────
const sampleSteps = [
  // Recipe 1 – Trứng chiên nước mắm
  { id: 1, recipeId: 1, stepNumber: 1, instruction: 'Đập 2 quả trứng vào bát, thêm 1 thìa cà phê nước mắm, đánh đều.', tip: 'Không cần thêm muối vì nước mắm đã đủ mặn.', time: 2 },
  { id: 2, recipeId: 1, stepNumber: 2, instruction: 'Đun nóng dầu ăn trên chảo lửa vừa đến khi dầu hơi bốc khói nhẹ.', tip: 'Dầu nóng già giúp trứng giòn rìa.', time: 2 },
  { id: 3, recipeId: 1, stepNumber: 3, instruction: 'Đổ trứng vào chảo, chiên đến khi mặt dưới vàng giòn rồi lật mặt.', tip: null, time: 3 },

  // Recipe 2 – Cơm chiên trứng
  { id: 4, recipeId: 2, stepNumber: 1, instruction: 'Đánh tan 2 quả trứng, nêm chút muối tiêu.', tip: null, time: 2 },
  { id: 5, recipeId: 2, stepNumber: 2, instruction: 'Phi thơm tỏi băm với dầu ăn, cho trứng vào xào chín, xới tơi.', tip: null, time: 3 },
  { id: 6, recipeId: 2, stepNumber: 3, instruction: 'Cho cơm nguội vào đảo đều lửa lớn, nêm nước mắm và tiêu.', tip: 'Dùng cơm nguội để hạt cơm tơi, không dính nhau.', time: 5 },
  { id: 7, recipeId: 2, stepNumber: 4, instruction: 'Thêm hành lá cắt nhỏ, đảo nhanh rồi tắt bếp.', tip: null, time: 2 },

  // Recipe 3 – Ức gà áp chảo eat clean
  { id: 8, recipeId: 3, stepNumber: 1, instruction: 'Ức gà rửa sạch, dùng dao rạch vài đường cho đều miếng, ướp sả băm, ớt, nước mắm, tiêu trong 15 phút.', tip: 'Dùng nĩa đâm lỗ để gia vị thấm đều hơn.', time: 15 },
  { id: 9, recipeId: 3, stepNumber: 2, instruction: 'Áp chảo gà trên lửa vừa, mỗi mặt khoảng 4-5 phút cho đến khi vàng đều.', tip: 'Không lật quá nhiều lần, gà sẽ mất nước.', time: 10 },

  // Recipe 4 – Canh cà chua trứng
  { id: 10, recipeId: 4, stepNumber: 1, instruction: 'Cà chua rửa sạch, bổ múi cau. Đập trứng vào bát đánh tan.', tip: null, time: 3 },
  { id: 11, recipeId: 4, stepNumber: 2, instruction: 'Phi thơm hành tỏi, cho cà chua vào xào mềm, thêm nước và đun sôi.', tip: null, time: 5 },
  { id: 12, recipeId: 4, stepNumber: 3, instruction: 'Đổ trứng vào nồi canh theo vòng tròn, nêm nước mắm, tiêu. Tắt bếp, rắc hành lá.', tip: 'Đổ trứng từ từ để trứng nổi thành từng mảng đẹp.', time: 5 },

  // Recipe 5 – Bún bò xào sả ớt
  { id: 13, recipeId: 5, stepNumber: 1, instruction: 'Thịt bò thái mỏng, ướp sả băm, ớt, nước mắm, tiêu, dầu ăn trong 15 phút.', tip: 'Thái bò ngược thớ để thịt mềm hơn.', time: 15 },
  { id: 14, recipeId: 5, stepNumber: 2, instruction: 'Xào bò lửa lớn cho nhanh chín tái, múc riêng ra.', tip: 'Xào lửa lớn, không đảo liên tục để bò không ra nước.', time: 3 },
  { id: 15, recipeId: 5, stepNumber: 3, instruction: 'Trụng bún qua nước sôi, cho ra tô. Xếp bò lên trên, rưới nước xào.', tip: null, time: 3 },

  // Recipe 6 – Rau muống xào tỏi
  { id: 16, recipeId: 6, stepNumber: 1, instruction: 'Rau muống nhặt lá, rửa sạch, cắt khúc. Tỏi bóc vỏ, đập dập.', tip: null, time: 5 },
  { id: 17, recipeId: 6, stepNumber: 2, instruction: 'Phi thơm tỏi, cho rau muống vào xào lửa lớn, nêm nước mắm, chút đường.', tip: 'Xào lửa lớn và nhanh để rau xanh giòn, không bị nhũn.', time: 3 },

  // Recipe 7 – Đậu hũ sốt cà chua
  { id: 18, recipeId: 7, stepNumber: 1, instruction: 'Đậu hũ cắt miếng vuông, chiên vàng giòn các mặt. Vớt ra để ráo dầu.', tip: 'Thấm khô đậu hũ trước khi chiên để không bị bắn dầu.', time: 7 },
  { id: 19, recipeId: 7, stepNumber: 2, instruction: 'Cà chua bổ múi cau, phi hành tỏi thơm rồi cho cà chua vào xào nhuyễn.', tip: null, time: 5 },
  { id: 20, recipeId: 7, stepNumber: 3, instruction: 'Cho đậu hũ vào sốt cà chua, đảo nhẹ, nêm nước mắm chay, đường. Rắc hành lá.', tip: null, time: 5 },

  // Recipe 8 – Nấm xào thập cẩm
  { id: 21, recipeId: 8, stepNumber: 1, instruction: 'Nấm rửa sạch, xé miếng vừa ăn. Rau củ (bông cải, cà rốt) cắt miếng nhỏ.', tip: null, time: 5 },
  { id: 22, recipeId: 8, stepNumber: 2, instruction: 'Phi thơm tỏi gừng, cho rau củ vào xào trước, rồi thêm nấm.', tip: 'Cho rau củ cứng vào trước vì cần thời gian chín lâu hơn.', time: 5 },
  { id: 23, recipeId: 8, stepNumber: 3, instruction: 'Nêm nước tương, chút dầu mè, đảo đều rồi tắt bếp.', tip: null, time: 3 },
];

// ─── 6. COOKBOOKS ────────────────────────────────────────────
const sampleCookbooks = [
  { id: 1, userId: 1, name: 'Bữa sáng 15 phút' },
  { id: 2, userId: 1, name: 'Eat Clean căn bản' },
  { id: 3, userId: 1, name: 'Cơm nhà mẹ nấu' },
  { id: 4, userId: 2, name: 'Sổ tay làm bánh & Eggdrop Sandwich' },
  { id: 5, userId: 2, name: 'Thực đơn tăng cơ giảm mỡ' },
  { id: 6, userId: 2, name: 'Món nhậu cuối tuần' },
  { id: 7, userId: 3, name: 'Món chay thanh đạm' },
  { id: 8, userId: 3, name: 'Đồ uống giải nhiệt mùa hè' },
  { id: 9, userId: 3, name: 'Bí kíp nồi chiên không dầu' },
  { id: 10, userId: 3, name: 'Công thức nước xốt đa năng' },
];

// ─── 7. COOKBOOK ↔ RECIPE (many-to-many) ──────────────────────
const sampleCookbookRecipes = [
  { recipeId: 1, cookbookId: 1 },  // Trứng chiên → Bữa sáng 15 phút
  { recipeId: 2, cookbookId: 1 },  // Cơm chiên trứng → Bữa sáng 15 phút
  { recipeId: 3, cookbookId: 2 },  // Ức gà eat clean → Eat Clean
  { recipeId: 6, cookbookId: 3 },  // Rau muống xào → Cơm nhà mẹ nấu
  { recipeId: 1, cookbookId: 3 },  // Trứng chiên → Cơm nhà mẹ nấu
  { recipeId: 4, cookbookId: 3 },  // Canh cà chua → Cơm nhà mẹ nấu
  { recipeId: 5, cookbookId: 5 },  // Bún bò xào → Tăng cơ giảm mỡ
  { recipeId: 3, cookbookId: 5 },  // Ức gà eat clean → Tăng cơ giảm mỡ
  { recipeId: 7, cookbookId: 7 },  // Đậu hũ sốt cà → Món chay
  { recipeId: 8, cookbookId: 7 },  // Nấm xào → Món chay
];

// ─── 8. RECIPE ↔ TAG (many-to-many) ─────────────────────────
const sampleRecipeTags = [
  { recipeId: 1, tagId: 1 },   // Trứng chiên → Bữa sáng
  { recipeId: 1, tagId: 9 },   // Trứng chiên → Nhanh & Dễ
  { recipeId: 1, tagId: 7 },   // Trứng chiên → Món Việt
  { recipeId: 2, tagId: 1 },   // Cơm chiên → Bữa sáng
  { recipeId: 2, tagId: 9 },   // Cơm chiên → Nhanh & Dễ
  { recipeId: 3, tagId: 4 },   // Ức gà → Eat Clean
  { recipeId: 3, tagId: 6 },   // Ức gà → Tăng cơ
  { recipeId: 4, tagId: 2 },   // Canh cà chua → Bữa trưa
  { recipeId: 4, tagId: 7 },   // Canh cà chua → Món Việt
  { recipeId: 5, tagId: 3 },   // Bún bò xào → Bữa tối
  { recipeId: 5, tagId: 6 },   // Bún bò xào → Tăng cơ
  { recipeId: 6, tagId: 7 },   // Rau muống → Món Việt
  { recipeId: 6, tagId: 9 },   // Rau muống → Nhanh & Dễ
  { recipeId: 7, tagId: 5 },   // Đậu hũ → Món chay
  { recipeId: 7, tagId: 7 },   // Đậu hũ → Món Việt
  { recipeId: 8, tagId: 5 },   // Nấm xào → Món chay
  { recipeId: 8, tagId: 9 },   // Nấm xào → Nhanh & Dễ
];

// ─── 9. RECIPE ↔ INGREDIENT (many-to-many) ──────────────────
const sampleRecipeIngredients = [
  // Recipe 1 – Trứng chiên nước mắm
  { recipeId: 1, ingredientId: 1, quantity: 2, unit: 'quả', note: null },
  { recipeId: 1, ingredientId: 8, quantity: 1, unit: 'tbsp', note: null },
  { recipeId: 1, ingredientId: 11, quantity: 2, unit: 'tbsp', note: 'dầu chiên' },

  // Recipe 2 – Cơm chiên trứng
  { recipeId: 2, ingredientId: 2, quantity: 2, unit: 'chén', note: 'cơm nguội' },
  { recipeId: 2, ingredientId: 1, quantity: 2, unit: 'quả', note: null },
  { recipeId: 2, ingredientId: 7, quantity: 3, unit: 'tép', note: 'băm nhỏ' },
  { recipeId: 2, ingredientId: 8, quantity: 1, unit: 'tbsp', note: null },

  // Recipe 3 – Ức gà eat clean
  { recipeId: 3, ingredientId: 3, quantity: 200, unit: 'g', note: null },
  { recipeId: 3, ingredientId: 17, quantity: 2, unit: 'cây', note: 'băm nhỏ' },
  { recipeId: 3, ingredientId: 20, quantity: 1, unit: 'trái', note: 'thái lát' },
  { recipeId: 3, ingredientId: 8, quantity: 1, unit: 'tbsp', note: null },

  // Recipe 4 – Canh cà chua trứng
  { recipeId: 4, ingredientId: 5, quantity: 3, unit: 'trái', note: 'bổ múi cau' },
  { recipeId: 4, ingredientId: 1, quantity: 2, unit: 'quả', note: null },
  { recipeId: 4, ingredientId: 8, quantity: 1, unit: 'tbsp', note: null },

  // Recipe 5 – Bún bò xào sả ớt
  { recipeId: 5, ingredientId: 13, quantity: 200, unit: 'g', note: 'thái mỏng' },
  { recipeId: 5, ingredientId: 12, quantity: 200, unit: 'g', note: null },
  { recipeId: 5, ingredientId: 17, quantity: 2, unit: 'cây', note: 'băm nhỏ' },
  { recipeId: 5, ingredientId: 20, quantity: 2, unit: 'trái', note: null },

  // Recipe 6 – Rau muống xào tỏi
  { recipeId: 6, ingredientId: 14, quantity: 300, unit: 'g', note: null },
  { recipeId: 6, ingredientId: 7, quantity: 5, unit: 'tép', note: 'đập dập' },
  { recipeId: 6, ingredientId: 8, quantity: 1, unit: 'tbsp', note: null },

  // Recipe 7 – Đậu hũ sốt cà chua
  { recipeId: 7, ingredientId: 15, quantity: 200, unit: 'g', note: 'cắt miếng vuông' },
  { recipeId: 7, ingredientId: 5, quantity: 2, unit: 'trái', note: null },
  { recipeId: 7, ingredientId: 7, quantity: 3, unit: 'tép', note: null },

  // Recipe 8 – Nấm xào thập cẩm
  { recipeId: 8, ingredientId: 16, quantity: 200, unit: 'g', note: 'xé miếng' },
  { recipeId: 8, ingredientId: 4, quantity: 100, unit: 'g', note: 'cắt miếng nhỏ' },
  { recipeId: 8, ingredientId: 18, quantity: 1, unit: 'nhánh', note: 'thái lát' },
  { recipeId: 8, ingredientId: 7, quantity: 3, unit: 'tép', note: null },
];

// ═══════════════════════════════════════════════════════════════
//  SEED RUNNER — order: users → tags → ingredients → recipes
//    → steps → cookbooks → junction tables → reset sequences
// ═══════════════════════════════════════════════════════════════
const seed = async () => {
  console.log('⏳ Seeding...');

  // 1. Users (no FK deps)
  for (const u of sampleUsers) {
    await prisma.user.upsert({ where: { id: u.id }, update: u, create: u });
  }
  console.log('✅ Users');

  // 2. Tags (no FK deps)
  for (const t of sampleTags) {
    await prisma.tag.upsert({ where: { id: t.id }, update: t, create: t });
  }
  console.log('✅ Tags');

  // 3. Ingredients (no FK deps)
  for (const i of sampleIngredients) {
    await prisma.ingredient.upsert({ where: { id: i.id }, update: i, create: i });
  }
  console.log('✅ Ingredients');

  // 4. Recipes (depends on users)
  for (const r of sampleRecipes) {
    await prisma.recipe.upsert({ where: { id: r.id }, update: r, create: r });
  }
  console.log('✅ Recipes');

  // 5. Steps (depends on recipes)
  for (const s of sampleSteps) {
    await prisma.step.upsert({ where: { id: s.id }, update: s, create: s });
  }
  console.log('✅ Steps');

  // 6. Cookbooks (depends on users)
  for (const c of sampleCookbooks) {
    await prisma.cookbook.upsert({ where: { id: c.id }, update: c, create: c });
  }
  console.log('✅ Cookbooks');

  // 7. CookbookRecipe (junction — depends on cookbooks & recipes)
  for (const cr of sampleCookbookRecipes) {
    await prisma.cookbookRecipe.upsert({
      where: { recipeId_cookbookId: { recipeId: cr.recipeId, cookbookId: cr.cookbookId } },
      update: cr, create: cr,
    });
  }
  console.log('✅ CookbookRecipes');

  // 8. RecipeTag (junction — depends on recipes & tags)
  for (const rt of sampleRecipeTags) {
    await prisma.recipeTag.upsert({
      where: { recipeId_tagId: { recipeId: rt.recipeId, tagId: rt.tagId } },
      update: rt, create: rt,
    });
  }
  console.log('✅ RecipeTags');

  // 9. RecipeIngredient (junction — depends on recipes & ingredients)
  for (const ri of sampleRecipeIngredients) {
    await prisma.recipeIngredient.upsert({
      where: { recipeId_ingredientId: { recipeId: ri.recipeId, ingredientId: ri.ingredientId } },
      update: ri, create: ri,
    });
  }
  console.log('✅ RecipeIngredients');

  // Reset PG auto-increment sequences
  const sequences = [
    { table: 'users', col: 'user_id' },
    { table: 'tags', col: 'tag_id' },
    { table: 'ingredients', col: 'ingredient_id' },
    { table: 'recipes', col: 'recipe_id' },
    { table: 'steps', col: 'step_id' },
    { table: 'cookbooks', col: 'cookbook_id' },
  ];
  for (const { table, col } of sequences) {
    await prisma.$executeRawUnsafe(
      `SELECT setval(pg_get_serial_sequence('${table}', '${col}'), COALESCE((SELECT MAX(${col}) FROM ${table}), 0));`
    );
  }
  console.log('✅ Sequences reset');
};

seed()
  .then(() => console.log('🎉 Data seeded successfully!'))
  .catch((error) => {
    console.error('❌ Data seed failed: ', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });