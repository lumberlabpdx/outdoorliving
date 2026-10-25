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

export const services: [string, string[]][] = [
  [
    "Decks & Railings",
    [
      "Cedar, hardwood & composite decks",
      "Multi-level & hillside decks",
      "Rooftop decks",
      "Stairs, landings & built-in benches",
      "Cable, glass & metal railings",
      "Under-deck drainage",
      "Resurfacing & replacement",
    ],
  ],
  [
    "Landscaping & Hardscaping",
    [
      "Stamped concrete, paver & flagstone patios",
      "Walkways, garden paths & outdoor steps",
      "Retaining & seat walls",
      "Fencing & gates",
      "Ponds & waterfalls",
      "Raised beds & built-in planters",
      "Planting & irrigation",
      "Privacy plantings",
    ],
  ],
  [
    "Pergolas & Covers",
    [
      "Timber & louvered pergolas",
      "Covered patios & patio roofs",
      "Pavilions & gazebos",
      "Arbors, trellises & privacy screens",
    ],
  ],
  [
    "Outdoor Kitchens & Fire",
    [
      "Built-in grill islands",
      "Full kitchens with sink & fridge",
      "Pizza ovens & smokers",
      "Outdoor bars & dining areas",
      "Fire pits & fire tables",
      "Outdoor fireplaces",
    ],
  ],
  ["Spa & Wellness", ["Hot tub & spa decks", "Saunas", "Cold plunges & outdoor showers"]],
  ["Garden Structures", ["Treehouses", "Backyard studios & offices", "Garden & potting sheds"]],
  [
    "Lighting & Comfort",
    ["Path, step & rail lighting", "String & café lights", "Heaters, fans & retractable shades"],
  ],
];
