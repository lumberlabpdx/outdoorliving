// The page's words and photos: the carousel slides, the Services drawer's list, and the cities the
// search-engine data names as the service area. src/routes/index.tsx lays them out.
import tree from "@/assets/tree.jpg";
import stamp from "@/assets/stamp.jpg";
import deck from "@/assets/deck.jpg";
import c4 from "@/assets/c4.jpg";

export const serviceArea = [
  "Portland",
  "Gresham",
  "Troutdale",
  "Hillsboro",
  "Beaverton",
  "Tigard",
  "Tualatin",
  "Sherwood",
  "Forest Grove",
  "Cornelius",
  "Lake Oswego",
  "Oregon City",
  "West Linn",
  "Milwaukie",
  "Happy Valley",
  "Wilsonville",
  "Gladstone",
];

// width and height are the photo file's own size in pixels
export const slides = [
  {
    src: tree,
    width: 1600,
    height: 1200,
    label: "Forest treehouse retreat",
    location: "Sellwood",
    review: "They had a particular set of skills, skills acquired over a very long career.",
    client: "Liam Neeson",
  },
  {
    src: stamp,
    width: 1600,
    height: 1200,
    label: "Stamped stone patio & pergola",
    location: "Mount Tabor",
    review: "I like very much! Great Success!",
    client: "Borat Sagdiyev",
  },
  {
    src: deck,
    width: 1600,
    height: 1200,
    label: "Hardwood deck & view stairs",
    location: "Lents",
    review: "My dog would've loved this deck.",
    client: "John Wick",
  },
  {
    src: c4,
    width: 1024,
    height: 1280,
    label: "Louvered pergola & garden",
    location: "Northwest Portland",
    review: "These reviews, locations, and pictures are placeholders and are not real.",
    client: "Client Name",
  },
];

// Category and service names use the words Portland homeowners search for (Google Trends,
// 2026-10-24), e.g. "patio covers" not "covers", "hot tubs" not "spa & wellness".
export const services: [string, string[]][] = [
  [
    "Decks & Railings",
    [
      "Cedar, hardwood & composite decks",
      "Multi-level, hillside & rooftop decks",
      "Deck stairs, landings & built-in benches",
      "Cable, glass & metal deck railings",
      "Deck repair, resurfacing & replacement",
      "Under-deck drainage",
    ],
  ],
  [
    "Patios & Landscaping",
    [
      "Concrete, paver & flagstone patios",
      "Walkways, garden paths & outdoor steps",
      "Retaining walls & seat walls",
      "Ponds & waterfalls",
      "Raised garden beds & planters",
      "Planting & privacy hedges",
      "Irrigation & sprinkler systems",
      "Landscape, path & deck lighting",
    ],
  ],
  [
    "Fences & Gates",
    ["Cedar & wood privacy fences", "Gates & gate repair", "Fence repair & replacement"],
  ],
  [
    "Pergolas, Patio Covers & Awnings",
    [
      "Wood & louvered pergolas",
      "Pergola roofs & covers",
      "Patio covers & covered patios",
      "Lean-to patio covers & awnings",
      "Pavilions & gazebos",
      "Arbors, trellises & privacy screens",
      "Patio heaters, fans, string lights & shades",
    ],
  ],
  [
    "Hot Tubs & Saunas",
    ["Hot tub decks & surrounds", "Backyard saunas", "Cold plunges & outdoor showers"],
  ],
  [
    "Fire Pits & Outdoor Kitchens",
    [
      "Fire pits & fire tables",
      "Outdoor fireplaces",
      "Outdoor kitchens & built-in grills",
      "Pizza ovens & smokers",
      "Outdoor bars & dining areas",
    ],
  ],
  [
    "Backyard Offices, Sheds & Treehouses",
    ["Backyard offices & studios", "Garden, storage & potting sheds", "Treehouses"],
  ],
];
