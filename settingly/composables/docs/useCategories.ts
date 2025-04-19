interface Category {
  name: string;
  slug: string;
  order: number;
  pages: ContentPage[];
}

interface ContentPage {
  stem: string; // z.B. "installation/01.installation-overview"
  title: string; // z.B. "Installation Overview"
  meta: {
    name?: string;
    slug?: string;
    order?: number;
    [key: string]: any;
  };
  [key: string]: any;
}

export default async function useCategories() {
  const { data: pages } = await useAsyncData(() =>
    queryCollection("content").all()
  );

  function categorize(pages: ContentPage[]): Category[] {
    // 1) Kategorien definieren (aus den Config‑Files mit meta.slug)
    const cats: Record<string, Category> = {};
    for (const page of pages) {
      if (page.meta.slug && page.stem.endsWith("config")) {
        const slug = page.meta.slug;
        cats[slug] = {
          name: page.meta.name || slug,
          slug,
          order: page.meta.order ?? 0,
          pages: [],
        };
      }
    }

    // 2) Seiten zuordnen, dabei Config‑Files (meta.slug) überspringen
    for (const page of pages) {
      const [catSlug] = page.stem.split("/");
      if (catSlug && cats[catSlug] && !page.stem.endsWith("config")) {
        cats[catSlug].pages.push(page);
      }
    }

    // 3) Innerhalb jeder Kategorie nach meta.order sortieren
    for (const cat of Object.values(cats)) {
      cat.pages.sort((a, b) => (a.meta.order ?? 0) - (b.meta.order ?? 0));
    }

    // 4) Kategorien nach order sortiert zurückgeben
    return Object.values(cats).sort((a, b) => a.order - b.order);
  }

  const categories = categorize(pages.value || []);

  function fetchPage(
    categorySlug: string,
    pageSlug: string
  ): ContentPage | undefined {
    const category = categories.find((c) => c.slug === categorySlug);

    if (!category) return undefined;
    return category.pages.find((page) => {
      return page.meta.slug === pageSlug;
    });
  }

  return {
    categories,
    fetchPage,
  };
}
