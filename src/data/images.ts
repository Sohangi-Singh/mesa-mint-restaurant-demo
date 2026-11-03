import type { StaticImageData } from "next/image";

import amberLightsDiningRoom from "@/assets/images/amber-lights-dining-room.jpg";
import bartenderPour from "@/assets/images/bartender-pour.jpg";
import chefGarnishGreens from "@/assets/images/chef-garnish-greens.jpg";
import chefTweezersHerbs from "@/assets/images/chef-tweezers-herbs.jpg";
import cocktailTrio from "@/assets/images/cocktail-trio.jpg";
import dimlyLitDiningRoom from "@/assets/images/dimly-lit-dining-room.jpg";
import diningRoomHangingLights from "@/assets/images/dining-room-hanging-lights.jpg";
import dishBeetrootTartare from "@/assets/images/dish-beetroot-tartare.jpg";
import dishBurrata from "@/assets/images/dish-burrata.jpg";
import dishChocolateTart from "@/assets/images/dish-chocolate-tart.jpg";
import dishCoffeeTiramisu from "@/assets/images/dish-coffee-tiramisu.jpg";
import dishGheeRoastChicken from "@/assets/images/dish-ghee-roast-chicken.jpg";
import dishHeirloomCarrots from "@/assets/images/dish-heirloom-carrots.jpg";
import dishKingfishCrudo from "@/assets/images/dish-kingfish-crudo.jpg";
import dishLambChops from "@/assets/images/dish-lamb-chops.jpg";
import dishLobsterMorels from "@/assets/images/dish-lobster-morels.jpg";
import dishMushroomRisotto from "@/assets/images/dish-mushroom-risotto.jpg";
import dishPoachedPear from "@/assets/images/dish-poached-pear.jpg";
import dishRoastCauliflower from "@/assets/images/dish-roast-cauliflower.jpg";
import dishRosePannaCotta from "@/assets/images/dish-rose-panna-cotta.jpg";
import dishSeabass from "@/assets/images/dish-seabass.jpg";
import dishTagliatelle from "@/assets/images/dish-tagliatelle.jpg";
import dishTandoorPaneer from "@/assets/images/dish-tandoor-paneer.jpg";
import dishTigerPrawns from "@/assets/images/dish-tiger-prawns.jpg";
import drinkJaggeryOldFashioned from "@/assets/images/drink-jaggery-old-fashioned.jpg";
import drinkMasalaChai from "@/assets/images/drink-masala-chai.jpg";
import drinkMintCooler from "@/assets/images/drink-mint-cooler.jpg";
import drinkPassionfruitSour from "@/assets/images/drink-passionfruit-sour.jpg";
import emptyDiningRoom from "@/assets/images/empty-dining-room.jpg";
import freshMint from "@/assets/images/fresh-mint.jpg";
import interiorPendantLights from "@/assets/images/interior-pendant-lights.jpg";
import roundTableAlcove from "@/assets/images/round-table-alcove.jpg";
import saucePour from "@/assets/images/sauce-pour.jpg";
import sharedTableWine from "@/assets/images/shared-table-wine.jpg";
import spicesCurryLeaves from "@/assets/images/spices-curry-leaves.jpg";
import tableGlassesLinen from "@/assets/images/table-glasses-linen.jpg";
import tableLampGlasses from "@/assets/images/table-lamp-glasses.jpg";
import tableLowLight from "@/assets/images/table-low-light.jpg";
import whiteLinenDining from "@/assets/images/white-linen-dining.jpg";
import wineAndPlateLowLight from "@/assets/images/wine-and-plate-low-light.jpg";

export interface SiteImage {
  src: StaticImageData;
  alt: string;
  /** CSS object-position focal point used when the photo is cropped. */
  position?: string;
}

/**
 * Atmosphere and editorial photography. Every image is sourced from Unsplash
 * under the Unsplash License — see scripts/image-manifest.json and the README
 * for photographer credits.
 */
export const atmosphere = {
  heroInterior: {
    src: interiorPendantLights,
    alt: "A dark, wood-panelled dining room lit by warm pendant lamps over set tables",
  },
  tableLowLight: {
    src: tableLowLight,
    alt: "A single place setting on a wooden table caught in a pool of low, warm light",
  },
  tableLampGlasses: {
    src: tableLampGlasses,
    alt: "Wine glasses and folded napkins beside a brass table lamp in a warmly lit dining room",
  },
  diningRoomHangingLights: {
    src: diningRoomHangingLights,
    alt: "A long, dim dining room with disc pendant lights glowing above rows of tables",
  },
  chefGarnishGreens: {
    src: chefGarnishGreens,
    alt: "A chef's hands placing fresh greens on a small plated dish with fine tweezers",
  },
  wineAndPlateLowLight: {
    src: wineAndPlateLowLight,
    alt: "A glass of white wine and a plated dish on a table in deep shadow",
  },
  dimlyLitDiningRoom: {
    src: dimlyLitDiningRoom,
    alt: "A dimly lit restaurant with a long bar and Edison bulbs glowing against the windows",
  },
  amberLightsDiningRoom: {
    src: amberLightsDiningRoom,
    alt: "Dozens of amber glass pendant lights suspended over a dining room",
  },
  saucePour: {
    src: saucePour,
    alt: "Sauce being spooned over a plated main course against a black background",
  },
  chefTweezersHerbs: {
    src: chefTweezersHerbs,
    alt: "Close-up of a chef in whites garnishing a plate with delicate herbs",
  },
  spicesCurryLeaves: {
    src: spicesCurryLeaves,
    alt: "Whole and ground spices with fresh curry leaves spread across a dark surface",
  },
  freshMint: {
    src: freshMint,
    alt: "A dense cluster of fresh mint leaves",
  },
  whiteLinenDining: {
    src: whiteLinenDining,
    alt: "Tables dressed in white linen in front of warm wooden shelving",
  },
  sharedTableWine: {
    src: sharedTableWine,
    alt: "A table shared over several small plates and glasses of red wine",
  },
  tableGlassesLinen: {
    src: tableGlassesLinen,
    alt: "A table laid with white linen, polished wine glasses and cutlery beside bentwood chairs",
  },
  roundTableAlcove: {
    src: roundTableAlcove,
    alt: "A round table in a softly lit alcove beneath a woven pendant lamp",
  },
  emptyDiningRoom: {
    src: emptyDiningRoom,
    alt: "An empty dining room in near darkness, chairs neatly tucked under the tables",
  },
  bartenderPour: {
    src: bartenderPour,
    alt: "Amber spirit being poured over ice in a tumbler with an orange twist",
  },
  cocktailTrio: {
    src: cocktailTrio,
    alt: "Three cocktails on a dark reflective bar top",
  },
} satisfies Record<string, SiteImage>;

/** One photograph per dish — each image represents exactly one menu item. */
export const dishImages = {
  burrata: {
    src: dishBurrata,
    alt: "Burrata over tomatoes and red leaves with fresh herbs and sourdough",
    position: "32% 62%",
  },
  kingfishCrudo: {
    src: dishKingfishCrudo,
    alt: "Thin slices of raw white fish topped with a green herb salsa and oil",
    position: "50% 30%",
  },
  tigerPrawns: {
    src: dishTigerPrawns,
    alt: "Grilled tiger prawns with lime wedges and basil on a black plate",
  },
  heirloomCarrots: {
    src: dishHeirloomCarrots,
    alt: "Roasted heirloom carrots with orange segments, seeds and herbs in a shallow white bowl",
    position: "55% 55%",
  },
  beetrootTartare: {
    src: dishBeetrootTartare,
    alt: "Beetroot tartare in a white bowl over a golden consommé, set on a wooden tray",
  },
  tandoorPaneer: {
    src: dishTandoorPaneer,
    alt: "Charred paneer pieces and peppers on a sizzling platter",
  },
  lambChops: {
    src: dishLambChops,
    alt: "Charcoal-grilled lamb chops on a wooden board with a bowl of sauce",
  },
  lobsterMorels: {
    src: dishLobsterMorels,
    alt: "Lobster with morel mushrooms in a light sauce on a textured black plate",
  },
  seabass: {
    src: dishSeabass,
    alt: "Seared fish fillet with micro herbs, a charred lime half and green pea risotto",
  },
  gheeRoastChicken: {
    src: dishGheeRoastChicken,
    alt: "Roast chicken over rice with kale and pomegranate seeds",
  },
  tagliatelle: {
    src: dishTagliatelle,
    alt: "Ribbons of tagliatelle twirled around a fork above a dark plate",
  },
  roastCauliflower: {
    src: dishRoastCauliflower,
    alt: "A whole roasted cauliflower with a nut crumb on a bright red pepper sauce",
  },
  mushroomRisotto: {
    src: dishMushroomRisotto,
    alt: "Mushroom risotto topped with a parmesan crisp on a striped plate",
  },
  poachedPear: {
    src: dishPoachedPear,
    alt: "A poached pear with caramel, a crisp tuile and blue cornflower petals on a dark plate",
  },
  chocolateTart: {
    src: dishChocolateTart,
    alt: "A dark chocolate tart with one slice cut away",
  },
  coffeeTiramisu: {
    src: dishCoffeeTiramisu,
    alt: "A slice of tiramisu dusted with cocoa, finished with a seeded brittle shard",
  },
  rosePannaCotta: {
    src: dishRosePannaCotta,
    alt: "A pink panna cotta ringed with raspberries and crumble",
  },
  mintCooler: {
    src: drinkMintCooler,
    alt: "A violet-pink cooler with ice, a lemon wheel and fresh mint",
  },
  passionfruitSour: {
    src: drinkPassionfruitSour,
    alt: "Two foamy passionfruit cocktails in coupe glasses at a bar",
  },
  jaggeryOldFashioned: {
    src: drinkJaggeryOldFashioned,
    alt: "An old fashioned with an orange peel on a dark bar counter",
    position: "80% 50%",
  },
  masalaChai: {
    src: drinkMasalaChai,
    alt: "Masala chai being poured from height into a glass",
  },
} satisfies Record<string, SiteImage>;
