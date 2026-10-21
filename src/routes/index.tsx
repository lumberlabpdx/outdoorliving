import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Star, X } from "lucide-react";
import tree from "@/assets/tree.jpg";
import stamp from "@/assets/stamp.jpg";
import deck from "@/assets/deck.jpg";
import c4 from "@/assets/c4.jpg";
import logo from "@/assets/lumber-lab-logo.png";
import lockup from "@/assets/lumber-lab-lockup.png";
import { ContactForm } from "@/components/contact-form";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumber Lab Outdoor Construction for the Pacific Northwest" },
      {
        name: "description",
        content:
          "Custom decks, pergolas, outdoor kitchens and fire features built in Portland, Oregon.",
      },
      {
        property: "og:title",
        content: "Lumber Lab Outdoor Construction for the Pacific Northwest",
      },
      {
        property: "og:description",
        content:
          "Custom decks, pergolas, outdoor kitchens and fire features built in Portland, Oregon.",
      },
    ],
  }),
  component: Index,
});

const slides = [
  {
    src: tree,
    label: "Forest treehouse retreat",
    location: "Sellwood",
    review: "Sample project review for a Sellwood treehouse.",
    client: "John Doe",
  },
  {
    src: stamp,
    label: "Stamped stone patio & pergola",
    location: "Mount Tabor",
    review: "Review for a stamped concrete job in Mt. Tabor.",
    client: "Amanda R.",
  },
  {
    src: deck,
    label: "Hardwood deck & view stairs",
    location: "Lents",
    review: "A project done in the Lents neighborhood.",
    client: "Patrick S.",
  },
  {
    src: c4,
    label: "Louvered pergola & garden",
    location: "Northwest",
    review: "These reviews, locations, and pictures are placeholders and are not real.",
    client: "Client Name",
  },
];

type Panel = "about" | "services" | "contact" | null;

const services: [string, string[]][] = [
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
    "Patios & Hardscape",
    [
      "Stamped concrete, paver & flagstone patios",
      "Walkways & garden paths",
      "Retaining & seat walls",
      "Outdoor steps",
      "Fencing & gates",
    ],
  ],
  [
    "Pergolas & Covers",
    [
      "Timber & louvered pergolas",
      "Covered patios & patio roofs",
      "Pavilions & gazebos",
      "Arbors, trellises & privacy screens",
      "Heaters, fans & retractable shades",
    ],
  ],
  [
    "Garden Structures",
    ["Treehouses", "Backyard studios & offices", "Saunas", "Garden & potting sheds"],
  ],
  [
    "Outdoor Kitchens",
    [
      "Built-in grill islands",
      "Full kitchens with sink & fridge",
      "Pizza ovens & smokers",
      "Outdoor bars & dining areas",
    ],
  ],
  [
    "Fire & Water",
    [
      "Fire pits & fire tables",
      "Outdoor fireplaces",
      "Hot tub & spa decks",
      "Cold plunges & outdoor showers",
      "Ponds & water features",
    ],
  ],
  [
    "Lighting & Landscape",
    [
      "Path, step & rail lighting",
      "String & café lights",
      "Raised beds & built-in planters",
      "Landscaping & irrigation",
      "Privacy plantings",
    ],
  ],
];

function Index() {
  const [i, setI] = useState(0);
  const [open, setOpen] = useState<Panel>(null);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  const closeButton = (className: string) => (
    <button
      onClick={() => setOpen(null)}
      aria-label="Close"
      className={`${className} text-muted-foreground transition-colors hover:text-primary`}
    >
      <X className="h-5 w-5" />
    </button>
  );

  return (
    <main className="relative flex min-h-dvh w-full flex-col overflow-x-hidden bg-background font-sans text-foreground md:h-dvh md:flex-row md:overflow-hidden">
      {/* Brand, hero, and navigation */}
      <section className="relative z-10 flex w-full flex-col px-8 py-7 md:h-full md:w-1/2 md:px-10 lg:px-16">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt=""
              aria-hidden="true"
              width={48}
              height={48}
              className="h-12 w-12 shrink-0 object-contain"
            />
            <div className="leading-none">
              <p className="font-display text-2xl font-medium tracking-[0.16em] text-accent">
                Lumber Lab
              </p>
              <p className="mt-2 font-display text-[0.62rem] tracking-[0.28em] text-primary uppercase">
                Outdoor Construction
              </p>
            </div>
          </div>

          <div className="mt-2.5 font-display text-[0.62rem] leading-tight tracking-[0.16em] text-muted-foreground uppercase">
            <p>OR CCB# 000000</p>
            <p>WA L&amp;I# LUMLAB000000</p>
          </div>
        </div>

        {/* The bottom padding lifts the centered heading a little above the middle */}
        <div className="mt-8 mb-10 md:mt-auto md:mb-auto md:pb-[6vh]">
          <h1 className="font-display text-3xl leading-[1.1] font-light tracking-tight md:text-4xl lg:text-[2.6rem]">
            <span className="block" style={{ color: "#708238" }}>
              handcrafted
            </span>
            <span className="block text-primary">outdoor spaces</span>
          </h1>
          <p className="mt-3 text-xs text-muted-foreground">
            Developed and maintained by Dom Saint P.
            <br />
            Work in progress.
          </p>
        </div>

        <nav className="flex w-full max-w-xs flex-col gap-2.5">
          {(["about", "services", "contact"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setOpen(p)}
              aria-expanded={open === p}
              className="group flex w-full items-center gap-3 rounded-md border border-accent bg-accent px-4 py-2.5 text-left transition-colors duration-300 hover:border-primary hover:bg-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <span className="font-display text-sm font-medium tracking-[0.25em] text-background uppercase">
                {p}
              </span>
              <span className="ml-auto h-px w-4 bg-background/50 transition-all duration-500 group-hover:w-8 group-hover:bg-background" />
            </button>
          ))}
        </nav>
        <p className="mt-3 text-xs text-muted-foreground">© Lumber Lab Outdoor Construction</p>
      </section>

      {/* Rotating photo carousel */}
      <section className="relative h-[55vh] min-h-[360px] w-full shrink-0 bg-background md:h-auto md:min-h-0 md:flex-1">
        {slides.map((s, n) => (
          <div
            key={n}
            className={`absolute inset-0 overflow-hidden transition-opacity duration-[1500ms] ${
              n === i ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={s.src}
              alt={s.label}
              width={1024}
              height={1280}
              className={`h-full w-full object-cover ${n === i ? "animate-kenburns" : ""}`}
            />
          </div>
        ))}
        <div className="bg-fade-left absolute inset-0 hidden md:block" />
        <div className="absolute inset-0 bg-overlay md:hidden" />
        <div className="bg-fade-bottom absolute inset-x-0 bottom-0 h-1/3" />

        {/* Review card for the current slide */}
        {slides.map((s, n) => (
          <figure
            key={s.label}
            aria-hidden={n !== i}
            className={`absolute top-6 right-6 z-10 w-72 max-w-[calc(100%-3rem)] rounded-md border border-accent bg-background p-5 transition-opacity duration-[1500ms] md:top-8 md:right-10 md:w-80 ${
              n === i ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <blockquote className="text-sm leading-relaxed text-foreground">
              “{s.review}”
            </blockquote>
            <div className="mt-3 flex items-center justify-between gap-3">
              <div role="img" aria-label="5 out of 5 stars" className="flex gap-1">
                {Array.from({ length: 5 }, (_, k) => (
                  <Star
                    key={k}
                    aria-hidden="true"
                    className="h-3.5 w-3.5 fill-primary text-primary"
                  />
                ))}
              </div>
              <figcaption className="text-xs text-primary">— {s.client}</figcaption>
            </div>
          </figure>
        ))}

        <div className="absolute bottom-6 left-6 z-10 font-display font-medium tracking-[0.25em] uppercase md:bottom-8 md:left-10">
          <p className="text-[0.65rem] text-accent">{slides[i]?.location}</p>
          <p className="mt-0.5 text-xs text-primary">{slides[i]?.label}</p>
        </div>
      </section>

      {/* Drawer overlay */}
      <div
        onClick={() => setOpen(null)}
        className={`fixed inset-0 z-20 bg-overlay transition-opacity duration-500 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 z-30 flex h-dvh w-full max-w-md flex-col border-r border-border bg-card px-8 pt-5 pb-5 transition-transform duration-500 ease-out md:px-10 md:pt-6 md:pb-5 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {open !== "contact" && closeButton("self-end")}

        {open === "about" ? (
          <>
            <img
              src={lockup}
              alt="Lumber Lab Outdoor Construction"
              width={1110}
              height={1110}
              className="mx-auto mt-1 h-52 w-auto max-h-[36vh] sm:h-64 md:h-72 object-contain"
            />
            <span className="mx-auto mt-2 h-px w-16 bg-primary" />
          </>
        ) : open === "contact" ? (
          // Heading on the left, close button on the right in the same row
          // Both lines step down a size below 360px so the close button still fits beside them
          <div className="flex items-start justify-between gap-2">
            <div>
              <h2
                className="font-display text-base min-[360px]:text-lg sm:text-xl font-light tracking-[0.14em] uppercase whitespace-nowrap"
                style={{ color: "#708238" }}
              >
                click to call or text
              </h2>
              <p className="mt-0.5 font-display text-[0.6rem] min-[360px]:text-[0.68rem] sm:text-xs font-medium tracking-[0.18em] text-primary uppercase whitespace-nowrap">
                for a free quote/consultation
              </p>
            </div>
            {closeButton("mt-1 shrink-0")}
          </div>
        ) : (
          <h2
            className="mt-3 font-display text-2xl sm:text-3xl font-light tracking-[0.2em] uppercase"
            style={{ color: "#708238" }}
          >
            {open}
          </h2>
        )}

        {/* Keyed by panel so each one starts fresh: scrolled to the top, with an empty contact form */}
        <div
          key={open ?? "closed"}
          className="mt-2.5 flex-1 overflow-y-auto text-xs sm:text-sm leading-relaxed text-muted-foreground"
        >
          {open === "about" && (
            <div className="space-y-2.5 sm:space-y-3.5">
              <p>This is a labor of love.</p>
              <p>Southeast.</p>
              <p className="font-display text-accent">Licensed · Bonded · Insured</p>
            </div>
          )}

          {open === "services" && (
            // Fixed at 12px on every screen size to keep scrolling to a minimum
            <ul className="space-y-3 text-xs leading-normal">
              {services.map(([t, items]) => (
                <li key={t}>
                  <p className="font-display text-sm font-medium tracking-wide text-primary">{t}</p>
                  <ul className="mt-0.5 list-disc pl-4 marker:text-accent">
                    {items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}

          {open === "contact" && (
            <div className="pt-5.5">
              <ContactForm onClose={() => setOpen(null)} />
            </div>
          )}
        </div>

        {(open === "about" || open === "services") && (
          <button
            onClick={() => setOpen("contact")}
            className="mt-5 h-12.5 w-full rounded-md border border-accent bg-accent px-4 font-display text-sm font-medium tracking-[0.25em] text-background uppercase transition-colors duration-300 hover:border-primary hover:bg-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            click to get in touch
          </button>
        )}
      </aside>
    </main>
  );
}
