const fs = require('fs');

const generateData = () => {
    let steps = [];
    let ingredients = [];
    let stepId = 14;

    for (let i = 5; i <= 40; i++) {
        // Skip ones already done if needed, but let's just generate for all 5 to 40
        if (i === 10) continue; // we already have 10 in ingredients, wait we only have 7 and 10 in ingredients, not steps.

        steps.push(`  // Recipe ${i}\n  { id: ${stepId++}, recipeId: ${i}, stepNumber: 1, instruction: 'Chuẩn bị và sơ chế các nguyên liệu sạch sẽ.', tip: null, time: 5 },\n  { id: ${stepId++}, recipeId: ${i}, stepNumber: 2, instruction: 'Tiến hành nấu theo phương pháp phù hợp với món ăn.', tip: 'Chú ý nhiệt độ và thời gian.', time: 15 },\n  { id: ${stepId++}, recipeId: ${i}, stepNumber: 3, instruction: 'Trình bày ra đĩa và thưởng thức khi còn nóng.', tip: null, time: 5 },`);

        // Just use some random ingredients for seeding (e.g. 1, 2, 3)
        ingredients.push(`  // Recipe ${i}\n  { recipeId: ${i}, ingredientId: 1, quantity: 100, unit: 'g', note: null },\n  { recipeId: ${i}, ingredientId: 2, quantity: 1, unit: 'phần', note: null },`);
    }

    console.log(steps.join('\n'));
    console.log(ingredients.join('\n'));
}

generateData();
