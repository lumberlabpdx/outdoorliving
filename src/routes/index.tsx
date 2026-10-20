import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import c1 from "@/assets/c1.jpg";
import c2 from "@/assets/c2.jpg";
import c3 from "@/assets/c3.jpg";
import c4 from "@/assets/c4.jpg";
import logo from "@/assets/lumber-lab-logo.png";
import lockup from "@/assets/lumber-lab-lockup.png";
import { ContactForm } from "@/components/contact-form";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumber Lab — Luxury Outdoor Living, Portland OR" },
      {
        name: "description",
        content:
          "Custom decks, pergolas, outdoor kitchens and fire features built in Portland, Oregon.",
      },
      {
        property: "og:title",
        content: "Lumber Lab — Luxury Outdoor Living, Portland OR",
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
  { src: c1, label: "Cedar pavilion & fire lounge" },
  { src: c2, label: "Covered outdoor kitchen" },
  { src: c3, label: "Hillside deck & spa" },
  { src: c4, label: "Louvered pergola & garden" },
];

type Panel = "about" | "services" | "contact" | null;

const services = [
  ["Decks & Terraces", "Hardwood, cedar and composite builds made for Northwest weather."],
  ["Pergolas & Covers", "Timber and louvered steel structures for year-round use."],
  ["Outdoor Kitchens", "Stone, steel and built-in appliances, designed to cook and host."],
  ["Fire & Water", "Fire pits, linear fireplaces, spas and water features."],
  ["Lighting & Landscape", "Warm low-voltage lighting and native plantings."],
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

  return (
    <main className="relative flex h-dvh w-full overflow-hidden bg-background font-sans text-foreground">
      {/* Left */}
      <section className="relative z-10 flex w-full flex-col px-8 py-7 md:w-1/2 md:px-10 lg:px-16">
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

        <div className="mt-auto mb-auto">
          <p className="mb-3 font-display text-xs tracking-[0.3em] text-accent uppercase">
            Portland, Oregon
          </p>
          <h1 className="font-display text-3xl leading-[1.1] font-light tracking-tight text-primary md:text-4xl lg:text-[2.6rem]">
            Outdoor living,
            <br />
            crafted to last.
          </h1>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Bespoke decks, pergolas, kitchens and fire features — designed and built for the Pacific
            Northwest.
          </p>
        </div>

        <nav className="flex w-full max-w-xs flex-col gap-2.5">
          {(["about", "services", "contact"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setOpen(p)}
              aria-expanded={open === p}
              className="group flex w-full items-center gap-3 rounded-md border border-accent bg-card/50 px-4 py-2.5 text-left transition-colors duration-300 hover:border-primary hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <span className="font-display text-sm font-medium tracking-[0.25em] text-accent uppercase transition-colors group-hover:text-primary">
                {p}
              </span>
              <span className="ml-auto h-px w-4 bg-accent/50 transition-all duration-500 group-hover:w-8 group-hover:bg-primary" />
            </button>
          ))}
        </nav>
      </section>

      {/* Right carousel */}
      <section className="absolute inset-0 md:relative md:flex-1">
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
        <p className="absolute right-6 bottom-6 z-10 font-display text-xs font-medium tracking-[0.25em] text-primary uppercase md:right-10 md:bottom-8">
          {slides[i]?.label}
        </p>
      </section>

      {/* Drawer */}
      <div
        onClick={() => setOpen(null)}
        className={`absolute inset-0 z-20 bg-overlay transition-opacity duration-500 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`absolute top-0 left-0 z-30 flex h-full w-full max-w-md flex-col border-r border-border bg-card px-10 py-12 transition-transform duration-500 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setOpen(null)}
          aria-label="Close"
          className="self-end text-muted-foreground transition-colors hover:text-primary"
        >
          <X className="h-5 w-5" />
        </button>

        {open === "about" ? (
          <>
            <img
              src={lockup}
              alt="Lumber Lab — Outdoor Construction"
              width={1110}
              height={1110}
              className="mx-auto mt-2 h-40 w-auto object-contain md:h-48 lg:h-56"
            />
            <span className="mx-auto mt-4 h-px w-16 bg-primary" />
          </>
        ) : (
          <>
            <h2 className="mt-6 font-display text-3xl font-light tracking-[0.2em] uppercase">
              {open}
            </h2>
            <span className="mt-4 h-px w-12 bg-primary" />
          </>
        )}

        <div className="mt-6 flex-1 overflow-y-auto text-sm leading-relaxed text-muted-foreground">
          {open === "about" && (
            <div className="space-y-4">
              <p>
                Lumber Lab is a Portland design-build studio devoted to one thing: outdoor spaces
                that feel like an extension of the home.
              </p>
              <p>
                We pair premium materials with craftsmanship engineered for Oregon rain — so your
                deck, pergola or kitchen is as beautiful in year ten as on day one.
              </p>
              <p className="font-display text-accent">Licensed · Bonded · Insured</p>
            </div>
          )}

          {open === "services" && (
            <ul className="space-y-6">
              {services.map(([t, d]) => (
                <li key={t}>
                  <p className="font-display text-lg font-medium tracking-wide text-foreground">
                    {t}
                  </p>
                  <p className="mt-1">{d}</p>
                </li>
              ))}
            </ul>
          )}

          {open === "contact" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="tel:+15035550142"
                  className="rounded-md border border-primary bg-primary/10 px-3 py-2 text-center font-display text-sm font-medium tracking-[0.18em] text-primary uppercase transition-colors duration-300 hover:bg-primary/20 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  Call us
                </a>

                <a
                  href="sms:+15035550142"
                  className="rounded-md border border-primary bg-primary/10 px-3 py-2 text-center font-display text-sm font-medium tracking-[0.18em] text-primary uppercase transition-colors duration-300 hover:bg-primary/20 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  or text
                </a>
              </div>

              <ContactForm />
            </div>
          )}
        </div>
      </aside>
    </main>
  );
}
