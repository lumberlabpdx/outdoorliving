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
      "Stairs, landings & built-in benches",
      "Cable, glass & metal railings",
      "Deck repair, resurfacing & replacement",
      "Under-deck drainage",
    ],
  ],
  [
    "Patios & Landscaping",
    [
      "Stamped concrete patios",
      "Garden paths & walkways",
      "Retaining walls & terracing",
      "Water features (ponds, waterfalls, etc.)",
      "Raised garden beds & planters",
      "Privacy hedges",
      "Landscape, path & deck lighting",
    ],
  ],
  ["Fences & Gates", ["Cedar privacy fences & gates", "Fence & gate repair or replacement"]],
  [
    "Pergolas, Patio Covers & Awnings",
    [
      "Wood & louvered pergolas",
      "Pergola roofs & covers",
      "Patio covers, lean-tos & awnings",
      "Pavilions & gazebos",
      "Arbors, trellises & privacy screens",
      "Heaters, fans, string lights & shades",
    ],
  ],
  [
    "Spa Features",
    ["Hot tub pads & enclosures", "Custom-built or kit saunas", "Cold plunges & outdoor showers"],
  ],
  [
    "Kitchens & Fire Features",
    [
      "Fire pits, fire tables & outdoor fireplaces",
      "Outdoor kitchens & built-in grills",
      "Pizza ovens & smokers",
      "Outdoor bars & dining areas",
    ],
  ],
  [
    "Backyard Structures",
    [
      "Backyard offices & studios",
      "Garden, storage & potting sheds",
      "Greenhouses",
      "Detached garages & carports",
      "ADUs",
      "Treehouses",
    ],
  ],
];
