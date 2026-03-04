import { prisma } from "../lib/prisma";

export class TagService {
  async findAll(category?: string) {
    const where = category ? { category } : {};

    return prisma.tag.findMany({
      where,
      include: {
        _count: { select: { recipeTags: true } },
      },
      orderBy: [{ category: "asc" }, { name: "asc" }],
    });
  }

  async findById(tagId: number) {
    return prisma.tag.findUnique({
      where: { tagId },
      include: {
        _count: { select: { recipeTags: true } },
      },
    });
  }

  async create(data: { name: string; category?: string }) {
    return prisma.tag.create({
      data,
    });
  }

  async update(tagId: number, data: { name?: string; category?: string }) {
    return prisma.tag.update({
      where: { tagId },
      data,
    });
  }

  async delete(tagId: number): Promise<boolean> {
    await prisma.tag.delete({
      where: { tagId },
    });
    return true;
  }

  // Get all categories
  async getCategories() {
    const tags = await prisma.tag.findMany({
      select: { category: true },
      distinct: ["category"],
      where: { category: { not: null } },
    });
    return tags.map((t) => t.category).filter(Boolean);
  }

  // Get tags grouped by category
  async getTagsGroupedByCategory() {
    const tags = await prisma.tag.findMany({
      include: { _count: { select: { recipeTags: true } } },
      orderBy: [{ category: "asc" }, { name: "asc" }],
    });

    const grouped: Record<string, typeof tags> = {};
    for (const tag of tags) {
      const cat = tag.category || "Uncategorized";
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(tag);
    }
    return grouped;
  }
}

export const tagService = new TagService();
