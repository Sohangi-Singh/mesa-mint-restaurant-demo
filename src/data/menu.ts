import { dishImages, type SiteImage } from "@/data/images";

/**
 * Illustrative concept menu. Dishes, descriptions and prices are fictional
 * demonstration content and do not represent a real restaurant's offering.
 */

export type MenuCategoryId = "small-plates" | "main-course" | "desserts" | "beverages";

/** Indian convention: vegetarian means no meat, fish or egg. */
export type DietType = "vegetarian" | "vegan" | "non-vegetarian";

export type Allergen =
  | "gluten"
  | "crustaceans"
  | "eggs"
  | "fish"
  | "peanuts"
  | "soy"
  | "dairy"
  | "tree-nuts"
  | "celery"
  | "mustard"
  | "sesame"
  | "sulphites";

export type DietaryLabel =
  | "signature"
  | "gluten-free"
  | "spicy"
  | "non-alcoholic"
  | "contains-alcohol";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  /** Price in Indian rupees. */
  price: number;
  category: MenuCategoryId;
  diet: DietType;
  allergens: Allergen[];
  labels: DietaryLabel[];
  image: SiteImage;
}

export interface MenuCategory {
  id: MenuCategoryId;
  label: string;
  description: string;
}

export const menuCategories: MenuCategory[] = [
  {
    id: "small-plates",
    label: "Small Plates",
    description: "To open the table — bright, generous and made for passing around.",
  },
  {
    id: "main-course",
    label: "Main Course",
    description: "Slow cooking, open fire and the seasons of the Deccan plateau.",
  },
  {
    id: "desserts",
    label: "Desserts",
    description: "Familiar flavours, quietly reimagined. All prepared without egg.",
  },
  {
    id: "beverages",
    label: "Beverages",
    description: "Considered cocktails, zero-proof coolers and chai pulled to order.",
  },
];

export const dietLabels: Record<DietType, string> = {
  vegetarian: "Vegetarian",
  vegan: "Vegan",
  "non-vegetarian": "Non-vegetarian",
};

export const allergenLabels: Record<Allergen, string> = {
  gluten: "Gluten",
  crustaceans: "Crustaceans",
  eggs: "Eggs",
  fish: "Fish",
  peanuts: "Peanuts",
  soy: "Soy",
  dairy: "Dairy",
  "tree-nuts": "Tree nuts",
  celery: "Celery",
  mustard: "Mustard",
  sesame: "Sesame",
  sulphites: "Sulphites",
};

export const dietaryLabelText: Record<DietaryLabel, string> = {
  signature: "Signature",
  "gluten-free": "Gluten-free",
  spicy: "Spicy",
  "non-alcoholic": "Zero-proof",
  "contains-alcohol": "Contains alcohol",
};

export const menuItems: MenuItem[] = [
  // ---------------------------------------------------------------- Small plates
  {
    id: "burrata-heirloom-tomato",
    name: "Burrata & Heirloom Tomato",
    description:
      "Hand-torn burrata over heirloom tomatoes and red leaves, basil, aged balsamic and cold-pressed olive oil. Served with grilled sourdough.",
    price: 695,
    category: "small-plates",
    diet: "vegetarian",
    allergens: ["dairy", "gluten", "sulphites"],
    labels: [],
    image: dishImages.burrata,
  },
  {
    id: "kingfish-crudo",
    name: "Kingfish Crudo",
    description:
      "Paper-thin kingfish, green chilli and coriander salsa verde, cold-pressed groundnut oil and grated cured yolk.",
    price: 845,
    category: "small-plates",
    diet: "non-vegetarian",
    allergens: ["fish", "eggs", "peanuts"],
    labels: ["gluten-free"],
    image: dishImages.kingfishCrudo,
  },
  {
    id: "charred-tiger-prawns",
    name: "Charred Tiger Prawns",
    description:
      "Whole tiger prawns from the grill, curry leaf and garlic butter, Thai basil and a squeeze of charred lime.",
    price: 925,
    category: "small-plates",
    diet: "non-vegetarian",
    allergens: ["crustaceans", "dairy"],
    labels: ["gluten-free"],
    image: dishImages.tigerPrawns,
  },
  {
    id: "charred-heirloom-carrots",
    name: "Charred Heirloom Carrots",
    description:
      "Heirloom carrots roasted over charcoal with blood orange, whipped curd, dill and a pistachio-sesame dukkah.",
    price: 575,
    category: "small-plates",
    diet: "vegetarian",
    allergens: ["dairy", "tree-nuts", "sesame"],
    labels: ["gluten-free"],
    image: dishImages.heirloomCarrots,
  },
  {
    id: "beetroot-tartare",
    name: "Beetroot Tartare",
    description:
      "Diced roast beetroot with mango kasundi, puffed amaranth and garden herbs, served chilled over a golden beet consommé.",
    price: 595,
    category: "small-plates",
    diet: "vegan",
    allergens: ["mustard"],
    labels: ["signature", "gluten-free"],
    image: dishImages.beetrootTartare,
  },
  {
    id: "tandoor-smoked-paneer",
    name: "Tandoor-Smoked Paneer",
    description:
      "Malai paneer and peppers from the tandoor, charred onion petals and a mint-coriander chutney.",
    price: 625,
    category: "small-plates",
    diet: "vegetarian",
    allergens: ["dairy"],
    labels: ["gluten-free", "spicy"],
    image: dishImages.tandoorPaneer,
  },

  // ---------------------------------------------------------------- Main course
  {
    id: "charcoal-lamb-chops",
    name: "Charcoal Lamb Chops",
    description:
      "Frenched lamb chops grilled over charcoal, mint chimichurri, smoked garlic and their own roasting juices.",
    price: 1650,
    category: "main-course",
    diet: "non-vegetarian",
    allergens: ["sulphites"],
    labels: ["signature", "gluten-free"],
    image: dishImages.lambChops,
  },
  {
    id: "butter-poached-lobster",
    name: "Butter-Poached Lobster & Morels",
    description:
      "Lobster tail poached in brown butter, Kashmiri morels and a light, fragrant crustacean bisque.",
    price: 2850,
    category: "main-course",
    diet: "non-vegetarian",
    allergens: ["crustaceans", "dairy", "celery"],
    labels: ["signature"],
    image: dishImages.lobsterMorels,
  },
  {
    id: "pan-seared-seabass",
    name: "Pan-Seared Seabass",
    description:
      "Crisp-skinned seabass on a green pea and lemon risotto, finished with micro herbs and a charred lime.",
    price: 1450,
    category: "main-course",
    diet: "non-vegetarian",
    allergens: ["fish", "dairy"],
    labels: ["gluten-free"],
    image: dishImages.seabass,
  },
  {
    id: "ghee-roast-chicken",
    name: "Ghee-Roast Chicken",
    description:
      "Chicken roasted in Byadgi chilli ghee, wilted kale, pomegranate and steamed jeera rice.",
    price: 1150,
    category: "main-course",
    diet: "non-vegetarian",
    allergens: ["dairy"],
    labels: ["gluten-free", "spicy"],
    image: dishImages.gheeRoastChicken,
  },
  {
    id: "brown-butter-tagliatelle",
    name: "Brown Butter Tagliatelle",
    description:
      "Hand-cut semolina tagliatelle (made without egg), brown butter, crisp sage, aged hard cheese and cracked pepper.",
    price: 925,
    category: "main-course",
    diet: "vegetarian",
    allergens: ["gluten", "dairy"],
    labels: [],
    image: dishImages.tagliatelle,
  },
  {
    id: "whole-roasted-cauliflower",
    name: "Whole-Roasted Cauliflower",
    description:
      "Spice-rubbed whole cauliflower, smoked pepper and almond romesco, toasted hazelnut crumb.",
    price: 895,
    category: "main-course",
    diet: "vegan",
    allergens: ["tree-nuts"],
    labels: ["gluten-free"],
    image: dishImages.roastCauliflower,
  },
  {
    id: "wild-mushroom-risotto",
    name: "Wild Mushroom Risotto",
    description:
      "Carnaroli rice slowly stirred with wild and button mushrooms, thyme and a crisp parmesan tuile.",
    price: 975,
    category: "main-course",
    diet: "vegetarian",
    allergens: ["dairy", "celery"],
    labels: ["gluten-free"],
    image: dishImages.mushroomRisotto,
  },

  // ---------------------------------------------------------------- Desserts
  {
    id: "saffron-poached-pear",
    name: "Saffron-Poached Pear",
    description:
      "Pear poached in saffron syrup, jaggery caramel, a crisp tuile and cornflower petals.",
    price: 545,
    category: "desserts",
    diet: "vegetarian",
    allergens: ["dairy", "gluten"],
    labels: ["signature"],
    image: dishImages.poachedPear,
  },
  {
    id: "dark-chocolate-tart",
    name: "Dark Chocolate Tart",
    description:
      "Seventy-percent chocolate ganache in a cocoa pastry shell, flaked sea salt and cardamom cream.",
    price: 495,
    category: "desserts",
    diet: "vegetarian",
    allergens: ["gluten", "dairy", "soy"],
    labels: [],
    image: dishImages.chocolateTart,
  },
  {
    id: "filter-coffee-tiramisu",
    name: "Filter Coffee Tiramisu",
    description:
      "Sponge soaked in South Indian filter coffee, eggless mascarpone cream, cocoa and a sesame brittle shard.",
    price: 525,
    category: "desserts",
    diet: "vegetarian",
    allergens: ["gluten", "dairy", "sesame"],
    labels: [],
    image: dishImages.coffeeTiramisu,
  },
  {
    id: "rose-raspberry-panna-cotta",
    name: "Rose & Raspberry Panna Cotta",
    description:
      "Buttermilk panna cotta set with agar, rose and raspberry, fresh berries and a pistachio crumble.",
    price: 475,
    category: "desserts",
    diet: "vegetarian",
    allergens: ["dairy", "tree-nuts", "gluten"],
    labels: [],
    image: dishImages.rosePannaCotta,
  },

  // ---------------------------------------------------------------- Beverages
  {
    id: "mesa-mint-cooler",
    name: "Mesa Mint Cooler",
    description:
      "Butterfly pea flower, garden mint, lemon and soda — it shifts from violet to rose as you stir.",
    price: 325,
    category: "beverages",
    diet: "vegan",
    allergens: [],
    labels: ["non-alcoholic"],
    image: dishImages.mintCooler,
  },
  {
    id: "passionfruit-kokum-sour",
    name: "Passionfruit & Kokum Sour",
    description:
      "Gin, passionfruit, kokum syrup and lemon under an aquafaba foam, finished with dried passionfruit.",
    price: 745,
    category: "beverages",
    diet: "vegan",
    allergens: [],
    labels: ["contains-alcohol"],
    image: dishImages.passionfruitSour,
  },
  {
    id: "jaggery-old-fashioned",
    name: "Jaggery Old Fashioned",
    description:
      "Bourbon stirred down with smoked jaggery syrup and aromatic bitters, expressed orange peel.",
    price: 825,
    category: "beverages",
    diet: "vegan",
    allergens: [],
    labels: ["contains-alcohol"],
    image: dishImages.jaggeryOldFashioned,
  },
  {
    id: "pulled-masala-chai",
    name: "Pulled Masala Chai",
    description:
      "Assam tea simmered with ginger, green cardamom and clove, pulled to order and served in a glass.",
    price: 225,
    category: "beverages",
    diet: "vegetarian",
    allergens: ["dairy"],
    labels: ["non-alcoholic"],
    image: dishImages.masalaChai,
  },
];

export const signatureDishIds = [
  "beetroot-tartare",
  "charcoal-lamb-chops",
  "butter-poached-lobster",
  "saffron-poached-pear",
] as const;

export const featuredMenuIds: Record<Exclude<MenuCategoryId, "beverages">, string[]> = {
  "small-plates": ["burrata-heirloom-tomato", "charred-tiger-prawns", "tandoor-smoked-paneer"],
  "main-course": ["pan-seared-seabass", "whole-roasted-cauliflower", "ghee-roast-chicken"],
  desserts: ["dark-chocolate-tart", "filter-coffee-tiramisu", "rose-raspberry-panna-cotta"],
};

export function getMenuItem(id: string): MenuItem {
  const item = menuItems.find((entry) => entry.id === id);
  if (!item) throw new Error(`Unknown menu item: ${id}`);
  return item;
}

export function getCategory(id: MenuCategoryId): MenuCategory {
  const category = menuCategories.find((entry) => entry.id === id);
  if (!category) throw new Error(`Unknown menu category: ${id}`);
  return category;
}

export function isVegetarian(item: MenuItem): boolean {
  return item.diet === "vegetarian" || item.diet === "vegan";
}
