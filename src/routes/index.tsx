import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Star, X } from "lucide-react";
import logo from "@/assets/lumber-lab-logo.png";
import lockup from "@/assets/lumber-lab-lockup.png";
import { ContactForm } from "@/components/contact-form";
import { buttonClass, buttonTextClass } from "@/lib/button-class";
import { serviceArea, services, slides } from "@/lib/content";
import { EMAIL, PHONE, SITE_NAME, SITE_URL } from "@/lib/site";

// The title search results and the browser tab show. Link previews keep the plain business name
const title = "Fences, Decks & Patios in Portland, OR | Lumber Lab";

const description =
  "Fences, patios, decks, awnings, pergolas and patio covers, handcrafted in Portland, OR. Licensed, bonded and insured. Fence and deck repair too.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: SITE_NAME },
      { property: "og:description", content: description },
      { property: "og:image", content: new URL(lockup, SITE_URL).href },
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          // Three unlinked objects so the validator lists each one at the top level;
          // pointing the business at the others (even by @id) nests them under it again
          "@graph": [
            {
              "@type": "GeneralContractor",
              name: SITE_NAME,
              url: SITE_URL,
              telephone: PHONE,
              email: EMAIL,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Portland",
                addressRegion: "OR",
                postalCode: "97204",
                addressCountry: "US",
              },
            },
            {
              "@type": "AdministrativeArea",
              name: "Portland Metropolitan Area",
              containsPlace: serviceArea.map((city) => ({ "@type": "City", name: `${city}, OR` })),
            },
            {
              "@type": "OfferCatalog",
              name: "Outdoor Living Spaces",
              // One sub-catalog per category in the Services drawer
              itemListElement: services.map(([category, items]) => ({
                "@type": "OfferCatalog",
                name: category,
                itemListElement: items.map((item) => ({
                  "@type": "Offer",
                  itemOffered: { "@type": "Service", name: item },
                })),
              })),
            },
          ],
        },
      },
    ],
  }),
  component: Index,
});

type Panel = "about" | "services" | "contact";

function Index() {
  const [i, setI] = useState(0);
  const [open, setOpen] = useState<Panel | null>(null);
  // What the drawer shows: the last panel opened, kept while the drawer slides shut so its
  // content doesn't vanish before it's off screen
  const [panel, setPanel] = useState<Panel | null>(null);
  // Counts openings, so each one starts fresh (see the drawer body's key)
  const [visit, setVisit] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  const openPanel = (p: Panel) => {
    if (!open) setVisit((v) => v + 1);
    setPanel(p);
    setOpen(p);
  };

  const closeButton = (className: string) => (
    <button
      onClick={() => setOpen(null)}
      aria-label="Close"
      className={`${className} text-foreground transition-colors hover:text-primary`}
    >
      <X className="h-5 w-5" />
    </button>
  );

  return (
    <main className="relative flex min-h-dvh w-full flex-col overflow-x-hidden bg-background font-sans text-foreground md:h-dvh md:flex-row md:overflow-hidden">
      {/* Brand, hero, and navigation */}
      <section
        inert={Boolean(open)}
        className="relative z-10 flex w-full flex-col px-8 py-7 md:h-full md:w-1/2 md:px-10 lg:px-16"
      >
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
              <p className="font-display text-2xl font-medium tracking-[0.16em] text-olive">
                Lumber Lab
              </p>
              <p className="mt-2 font-display text-[0.62rem] tracking-[0.28em] text-primary uppercase">
                Outdoor Construction
              </p>
            </div>
          </div>

          <div className="mt-2.5 font-display text-[0.62rem] leading-tight tracking-[0.16em] text-foreground uppercase">
            <p>OR CCB# 000000</p>
            <p>WA L&amp;I# LUMLAB000000</p>
          </div>
        </div>

        {/* The bottom padding lifts the centered heading a little above the middle */}
        <div className="mt-8 mb-10 md:mt-auto md:mb-auto md:pb-[6vh]">
          <h1 className="font-display text-3xl leading-[1.1] font-light tracking-tight md:text-4xl lg:text-[2.6rem]">
            <span className="block text-olive">handcrafted</span>
            <span className="block text-primary">outdoor spaces</span>
          </h1>
          <p className="mt-3 text-xs text-foreground">
            Developed and maintained by Dom Saint P.
            <br />
            Work in progress.
          </p>
        </div>

        <nav className="flex w-full max-w-xs flex-col gap-2.5">
          {(["about", "services", "contact"] as const).map((p) => (
            <button
              key={p}
              onClick={() => openPanel(p)}
              aria-expanded={open === p}
              className={`group flex w-full items-center gap-3 px-4 py-2.5 text-left ${buttonClass}`}
            >
              <span className={buttonTextClass}>{p}</span>
              <span className="ml-auto h-px w-4 bg-background/50 transition-all duration-500 group-hover:w-8 group-hover:bg-background" />
            </button>
          ))}
        </nav>
        <p className="mt-3 text-xs text-foreground">{`© ${SITE_NAME}`}</p>
      </section>

      {/* Rotating photo carousel */}
      <section
        inert={Boolean(open)}
        className="relative h-[55vh] min-h-[360px] w-full shrink-0 bg-background md:h-auto md:min-h-0 md:flex-1"
      >
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
              width={s.width}
              height={s.height}
              className={`h-full w-full object-cover ${n === i ? "animate-kenburns" : ""}`}
            />
          </div>
        ))}
        <div className="bg-fade-left absolute inset-0 hidden md:block" />
        <div className="bg-fade-bottom absolute inset-x-0 bottom-0 h-1/3" />

        {/* Review card for the current slide */}
        {slides.map((s, n) => (
          <figure
            key={s.label}
            aria-hidden={n !== i}
            className={`absolute top-6 right-6 z-10 w-72 max-w-[calc(100%-3rem)] rounded-md border border-olive bg-background/87 p-5 transition-opacity duration-[1500ms] md:top-8 md:right-10 md:w-80 ${
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
          <p className="text-[0.65rem] text-foreground">{slides[i]?.location}</p>
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

      {/* Drawer. Inert while closed so Tab can't reach its off-screen buttons; while it's open,
          the page behind it is inert instead */}
      <aside
        inert={!open}
        className={`fixed top-0 left-0 z-30 flex h-dvh w-full max-w-md flex-col border-r border-border bg-card px-8 pt-5 pb-5 transition-transform duration-500 ease-out md:px-10 md:pt-6 md:pb-5 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {(panel === "about" || panel === "services") && closeButton("self-end")}

        {/* All three panels stay in the page so search engines can read them, and the ones not
            being shown are hidden. Before the drawer first opens, all three are */}
        {/* The wrapper adds no box of its own, so the logo and rule sit in the drawer as before */}
        <div hidden={panel !== "about"} className="contents">
          {/* Lazy, so the logo still loads only once About is opened */}
          <img
            src={lockup}
            alt={SITE_NAME}
            width={1110}
            height={1110}
            loading="lazy"
            className="mx-auto mt-1 h-36 w-auto max-h-[36vh] md:h-52 object-contain"
          />
          <span className="mx-auto mt-2 h-px w-16 bg-primary" />
        </div>

        {/* Heading on the left, close button on the right in the same row
            Both lines step down a size below 360px so the close button still fits beside them */}
        <div hidden={panel !== "contact"} className="flex items-start justify-between gap-2">
          <div>
            <h2 className="font-display text-base min-[360px]:text-lg sm:text-xl font-light tracking-[0.14em] text-olive uppercase whitespace-nowrap">
              click to call or text
            </h2>
            <p className="mt-0.5 font-display text-[0.6rem] min-[360px]:text-[0.68rem] sm:text-xs font-medium tracking-[0.18em] text-primary uppercase whitespace-nowrap">
              for a free quote/consultation
            </p>
          </div>
          {closeButton("mt-1 shrink-0")}
        </div>

        <h2
          hidden={panel !== "services"}
          className="mt-3 font-display text-2xl sm:text-3xl font-light tracking-[0.2em] text-olive uppercase"
        >
          services
        </h2>

        {/* Keyed by panel and by opening, so each one starts fresh: scrolled to the top, with an
            empty contact form */}
        <div
          key={`${panel}-${visit}`}
          className="mt-2.5 flex-1 overflow-y-auto text-xs sm:text-sm leading-relaxed text-foreground"
        >
          {/* Fixed at 12px with tighter line spacing, like Services, to keep scrolling to a minimum */}
          <div
            hidden={panel !== "about"}
            className="space-y-2.5 text-xs leading-normal sm:space-y-3.5"
          >
            <p>
              When the mornings chill and the clouds gray and the leaves fall and the rains pour, we
              want you to have an outdoor space that’s as accessible and enjoyable in December as it
              is in July. With the Northwest’s autumns &amp; winters in mind, we focus on designing
              covered outdoor spaces that are comfortable for you and your family any time of year.
            </p>
            <p>
              With 25+ years in Portland and 20+ years of carpentry experience, we have homegrown
              knowledge of the climate and surroundings, and we build with that in mind. We often
              get calls for covered patios &amp; decks, awnings, pergolas, gazebos, and even
              treehouses. We can do it all.
            </p>
            <p>
              We also build backyard sheds, greenhouses, carports, detached garages, and more.
              Design consultations, project estimates, and troubleshooting are always free, so reach
              out with any questions. We’d love to help.
            </p>
            <p>Made with love by Dom.</p>
            <p className="font-display text-olive">Licensed · Bonded · Insured</p>
          </div>

          {/* Fixed at 12px on every screen size to keep scrolling to a minimum */}
          <ul hidden={panel !== "services"} className="space-y-3 text-xs leading-normal">
            {services.map(([t, items]) => (
              <li key={t}>
                <h3 className="font-display text-sm font-medium tracking-wide text-primary">{t}</h3>
                <ul className="mt-0.5 list-disc pl-4 marker:text-olive">
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <div hidden={panel !== "contact"} className="pt-5.5">
            <ContactForm onClose={() => setOpen(null)} />
          </div>
        </div>

        {(panel === "about" || panel === "services") && (
          <button
            onClick={() => openPanel("contact")}
            className={`mt-5 h-12.5 w-full px-4 ${buttonTextClass} ${buttonClass}`}
          >
            click to get in touch
          </button>
        )}
      </aside>
    </main>
  );
}
