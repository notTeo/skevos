// Skevos — marble atelier site
const { useState, useEffect, useRef } = React;

/* ───────── Palettes for product photo pairs (A/B variants) ───────── */
const PRODUCTS = [
  {
    id: "selene",
    name: "Selene",
    type: "Console Table",
    dims: "180 × 38 × 86 cm",
    price: "€ 6 400",
    material: "Statuario",
    shape: "console",
    a: { veinColor: "#7a6e58", baseColor: "#f3ead7", highlight: "#fbf5e8", bg: "#3d4438", bgAccent: "#23281f", rotate: 0, seed: 3 },
    b: { veinColor: "#5b4a35", baseColor: "#e9dcc1", highlight: "#f6ecd2", bg: "#4a4538", bgAccent: "#2a261c", rotate: 0, seed: 11 },
  },
  {
    id: "delos",
    name: "Delos",
    type: "Coffee Table",
    dims: "Ø 110 × 34 cm",
    price: "€ 4 200",
    material: "Travertino Rosso",
    shape: "coffee",
    a: { veinColor: "#8d4a2c", baseColor: "#e9c9a8", highlight: "#f8e0c2", bg: "#2e2a26", bgAccent: "#15130f", rotate: 0, seed: 7 },
    b: { veinColor: "#6a2f18", baseColor: "#dbac84", highlight: "#efc89e", bg: "#3a3128", bgAccent: "#1d1813", rotate: 0, seed: 17 },
  },
  {
    id: "atlas",
    name: "Atlas",
    type: "Plinth",
    dims: "60 × 60 × 110 cm",
    price: "€ 3 100",
    material: "Nero Marquina",
    shape: "plinth",
    a: { veinColor: "#dcd3c2", baseColor: "#2b2722", highlight: "#a89a82", bg: "#e8dec8", bgAccent: "#c4b08f", rotate: 0, seed: 5 },
    b: { veinColor: "#f4ead4", baseColor: "#1e1b18", highlight: "#b8a98f", bg: "#dccfb2", bgAccent: "#b09872", rotate: 0, seed: 23 },
  },
  {
    id: "echo",
    name: "Echo",
    type: "Side Table",
    dims: "Ø 48 × 52 cm",
    price: "€ 2 250",
    material: "Verde Alpi",
    shape: "side",
    a: { veinColor: "#0f1f17", baseColor: "#7fae93", highlight: "#c0ddc7", bg: "#e8dec8", bgAccent: "#c4b08f", rotate: 0, seed: 9 },
    b: { veinColor: "#08160f", baseColor: "#5e8770", highlight: "#a3c4af", bg: "#dccfb2", bgAccent: "#a89674", rotate: 0, seed: 29 },
  },
  {
    id: "iris",
    name: "Iris",
    type: "Pedestal",
    dims: "Ø 28 × 92 cm",
    price: "€ 1 950",
    material: "Rosa Portogallo",
    shape: "pillar",
    a: { veinColor: "#9b6b6b", baseColor: "#f2dada", highlight: "#fbe9e9", bg: "#3d3231", bgAccent: "#1f1817", rotate: 0, seed: 13 },
    b: { veinColor: "#6f3f3f", baseColor: "#e1bdbd", highlight: "#f4d2d2", bg: "#4a3a39", bgAccent: "#241b1b", rotate: 0, seed: 31 },
  },
  {
    id: "helios",
    name: "Helios",
    type: "Dining Table",
    dims: "240 × 110 × 74 cm",
    price: "€ 11 800",
    material: "Calacatta Oro",
    shape: "dining",
    a: { veinColor: "#a8804a", baseColor: "#f5ecd6", highlight: "#fcf5e2", bg: "#3a3c33", bgAccent: "#1c1d18", rotate: 0, seed: 19 },
    b: { veinColor: "#6e5226", baseColor: "#ece0c3", highlight: "#f8edcf", bg: "#46453a", bgAccent: "#22221b", rotate: 0, seed: 41 },
  },
  {
    id: "kore",
    name: "Kore",
    type: "Bench",
    dims: "160 × 38 × 44 cm",
    price: "€ 5 600",
    material: "Bianco Sivec",
    shape: "bench",
    a: { veinColor: "#9a8e7a", baseColor: "#f6f1e6", highlight: "#fdfaf2", bg: "#2d2a26", bgAccent: "#15130f", rotate: 0, seed: 21 },
    b: { veinColor: "#6e6452", baseColor: "#ebe1c9", highlight: "#f6ecd5", bg: "#3a3528", bgAccent: "#1d1a13", rotate: 0, seed: 43 },
  },
  {
    id: "luna",
    name: "Luna",
    type: "Sculptural Stool",
    dims: "Ø 36 × 46 cm",
    price: "€ 2 700",
    material: "Onice Miele",
    shape: "orb",
    a: { veinColor: "#a06a2e", baseColor: "#f0d6a8", highlight: "#fae4be", bg: "#3a3328", bgAccent: "#1c1810", rotate: 0, seed: 27 },
    b: { veinColor: "#6e4519", baseColor: "#dcbc88", highlight: "#eecb9a", bg: "#46392a", bgAccent: "#221c13", rotate: 0, seed: 47 },
  },
];

/* ───────── Top Nav ───────── */
function Nav() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setOpen(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0,
      padding: open ? "14px 36px" : "26px 36px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      zIndex: 50,
      transition: "all 400ms cubic-bezier(.2,.7,.2,1)",
      backdropFilter: open ? "blur(12px) saturate(1.2)" : "none",
      background: open ? "rgba(242,235,224,0.78)" : "transparent",
      borderBottom: open ? "1px solid rgba(27,24,21,0.08)" : "1px solid transparent",
    }}>
      <a href="#top" className="serif" style={{
        fontSize: 26, letterSpacing: "0.08em", fontWeight: 500,
      }}>
        SKEVOS
        <span style={{
          display: "inline-block", width: 6, height: 6, borderRadius: 6,
          background: "var(--terra)", marginLeft: 8, transform: "translateY(-3px)",
        }} />
      </a>
      <div style={{ display: "flex", gap: 32, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase" }}>
        <a href="#collection">Collection</a>
        <a href="#about">Atelier</a>
        <a href="#contact">Commission</a>
      </div>
      <a href="#contact" style={{
        fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase",
        padding: "10px 18px", borderRadius: 999,
        border: "1px solid var(--ink)",
        transition: "all 200ms",
      }}
        onMouseEnter={e => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.color = "var(--bone)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--ink)"; }}
      >
        Enquire
      </a>
    </nav>
  );
}

/* ───────── Hero ───────── */
function Hero() {
  return (
    <section id="top" style={{
      minHeight: "100vh",
      padding: "140px 36px 60px",
      display: "grid",
      gridTemplateColumns: "1.1fr 0.9fr",
      gap: 60,
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Big eyebrow + headline */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 14,
          fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase",
          color: "var(--stone)", marginBottom: 28,
        }}>
          <span style={{ width: 36, height: 1, background: "var(--stone)" }} />
          Est. Tinos, 1974
          <span style={{ color: "var(--terra)" }}>·</span>
          Σκεῦος
        </div>

        <h1 className="serif" style={{
          fontSize: "clamp(64px, 9vw, 148px)",
          lineHeight: 0.92,
          margin: 0,
          letterSpacing: "-0.025em",
          fontWeight: 400,
        }}>
          Stone,<br />
          <span className="italic" style={{ color: "var(--terra)" }}>patiently</span><br />
          shaped.
        </h1>

        <p style={{
          maxWidth: 480,
          marginTop: 36,
          fontSize: 17,
          color: "var(--ink-2)",
          lineHeight: 1.65,
        }}>
          A small atelier in the Cyclades carving heirloom furniture from a
          single block. Each piece is veined by geology, finished by hand,
          and signed by the maker.
        </p>

        <div style={{ display: "flex", gap: 14, marginTop: 44, alignItems: "center" }}>
          <a href="#collection" style={{
            padding: "18px 30px", borderRadius: 999,
            background: "var(--ink)", color: "var(--bone)",
            fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase",
            display: "inline-flex", alignItems: "center", gap: 12,
            transition: "all 250ms",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--terra)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            See the Collection
            <span style={{ display: "inline-block", transform: "translateY(1px)" }}>↘</span>
          </a>
          <a href="#about" style={{
            padding: "18px 18px", fontSize: 13, letterSpacing: "0.2em",
            textTransform: "uppercase", color: "var(--ink-2)",
            borderBottom: "1px solid var(--ink)",
          }}>
            The atelier
          </a>
        </div>
      </div>

      {/* Hero piece — a sculptural marble pillar */}
      <div style={{
        position: "relative",
        height: "78vh",
        minHeight: 540,
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: "var(--r-lg)",
          overflow: "hidden",
          boxShadow: "var(--shadow-lg)",
          transform: "translateY(0)",
        }}>
          <MarblePiece
            shape="pillar"
            seed={2}
            veinColor="#8a7458"
            baseColor="#f3ead7"
            highlight="#fcf6e8"
            bg="#3a3a30"
            bgAccent="#1c1c16"
          />
        </div>

        {/* Floating caption card */}
        <div style={{
          position: "absolute",
          bottom: 28, left: -28,
          background: "var(--bone)",
          border: "1px solid rgba(27,24,21,0.1)",
          borderRadius: "var(--r-md)",
          padding: "20px 24px",
          boxShadow: "var(--shadow-md)",
          maxWidth: 240,
        }}>
          <div style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--stone)" }}>
            Featured · 014
          </div>
          <div className="serif italic" style={{ fontSize: 28, marginTop: 4, lineHeight: 1.1 }}>
            Helena <span style={{ color: "var(--terra)" }}>·</span> Pedestal
          </div>
          <div style={{ fontSize: 12, color: "var(--stone)", marginTop: 6 }}>
            Calacatta Oro · single block
          </div>
        </div>

        {/* tiny annotations */}
        <div style={{
          position: "absolute", top: 140, right: -14,
          fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase",
          color: "var(--stone)",
          transform: "rotate(90deg)", transformOrigin: "right top",
        }}>
          N° 014 / Edition of 8
        </div>
      </div>

      {/* Decorative running text bottom */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        padding: "0 36px 24px",
        display: "flex", justifyContent: "space-between",
        fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase",
        color: "var(--stone)",
        gridColumn: "1 / -1",
      }}>
        <span>Scroll ↓</span>
        <span>Edition 26 · Spring</span>
        <span>Made in Greece</span>
      </div>
    </section>
  );
}

/* ───────── Product Card ───────── */
function ProductCard({ p, index }) {
  const [hover, setHover] = useState(false);
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 18,
        cursor: "pointer",
      }}
    >
      <div style={{
        position: "relative",
        aspectRatio: "4 / 5",
        borderRadius: "var(--r-lg)",
        overflow: "hidden",
        background: "var(--cream)",
        boxShadow: hover ? "var(--shadow-lg)" : "var(--shadow-md)",
        transform: hover ? "translateY(-6px) scale(1.012)" : "translateY(0) scale(1)",
        transition: "transform 700ms cubic-bezier(.2,.7,.2,1), box-shadow 600ms ease",
      }}>
        {/* Image A */}
        <div style={{
          position: "absolute", inset: 0,
          opacity: hover ? 0 : 1,
          transform: hover ? "scale(1.04)" : "scale(1)",
          transition: "opacity 700ms ease, transform 1200ms cubic-bezier(.2,.7,.2,1)",
        }}>
          <MarblePiece {...p.a} shape={p.shape} />
        </div>
        {/* Image B */}
        <div style={{
          position: "absolute", inset: 0,
          opacity: hover ? 1 : 0,
          transform: hover ? "scale(1)" : "scale(1.06)",
          transition: "opacity 700ms ease, transform 1200ms cubic-bezier(.2,.7,.2,1)",
        }}>
          <MarblePiece {...p.b} shape={p.shape} />
        </div>

        {/* Index / type chip */}
        <div style={{
          position: "absolute", top: 18, left: 18,
          fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase",
          padding: "8px 12px", borderRadius: 999,
          background: "rgba(242,235,224,0.85)", backdropFilter: "blur(8px)",
          color: "var(--ink-2)",
        }}>
          № {String(index + 1).padStart(2, "0")} · {p.type}
        </div>

        {/* Material tag */}
        <div style={{
          position: "absolute", bottom: 18, right: 18,
          fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase",
          padding: "10px 14px", borderRadius: 999,
          background: "rgba(27,24,21,0.78)", color: "var(--bone)",
          backdropFilter: "blur(8px)",
          opacity: hover ? 1 : 0,
          transform: hover ? "translateY(0)" : "translateY(8px)",
          transition: "all 500ms cubic-bezier(.2,.7,.2,1)",
        }}>
          {p.material}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16 }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <h3 className="serif" style={{
            margin: 0, fontSize: 30, lineHeight: 1, letterSpacing: "-0.01em",
            fontWeight: 400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>
            {p.name}
          </h3>
          <div style={{ marginTop: 8, fontSize: 12, color: "var(--stone)", letterSpacing: "0.02em" }}>
            {p.dims}
          </div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div className="serif" style={{ fontSize: 22, fontWeight: 500, whiteSpace: "nowrap" }}>{p.price}</div>
          <div style={{ fontSize: 10, color: "var(--stone)", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 2 }}>
            from
          </div>
        </div>
      </div>
    </article>
  );
}

/* ───────── Collection grid ───────── */
function Collection() {
  return (
    <section id="collection" style={{ padding: "120px 36px 100px" }}>
      <header style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        alignItems: "end",
        marginBottom: 64,
        gap: 24,
      }}>
        <div>
          <div style={{
            fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase",
            color: "var(--stone)", marginBottom: 18,
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <span style={{ width: 24, height: 1, background: "var(--stone)" }} />
            The Collection · Spring 26
          </div>
          <h2 className="serif" style={{
            fontSize: "clamp(48px, 6vw, 92px)",
            margin: 0, lineHeight: 0.95, letterSpacing: "-0.02em",
            fontWeight: 400,
          }}>
            Eight pieces, each <span className="italic" style={{ color: "var(--terra)" }}>cut once</span>.
          </h2>
        </div>
        <div style={{ maxWidth: 320, fontSize: 14, color: "var(--ink-2)", lineHeight: 1.6 }}>
          Hover any piece to see it from a second light. All works are made
          to order with a 12–16 week lead time.
        </div>
      </header>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
        gap: "64px 36px",
      }}>
        {PRODUCTS.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
      </div>
    </section>
  );
}

/* ───────── About ───────── */
function About() {
  return (
    <section id="about" style={{
      padding: "120px 36px",
      background: "var(--ink)",
      color: "var(--bone)",
      borderRadius: "var(--r-lg)",
      margin: "0 28px",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1.1fr",
        gap: 80,
        alignItems: "center",
      }}>
        <div style={{
          position: "relative",
          aspectRatio: "4 / 5",
          borderRadius: "var(--r-md)",
          overflow: "hidden",
          boxShadow: "var(--shadow-lg)",
        }}>
          <MarblePiece
            shape="orb"
            seed={88}
            veinColor="#c8b48a"
            baseColor="#2a2520"
            highlight="#8c7858"
            bg="#d9c8a8"
            bgAccent="#a88e60"
          />
          <div style={{
            position: "absolute", bottom: 24, left: 24,
            fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase",
            color: "rgba(242,235,224,0.7)",
          }}>
            Workshop · Pyrgos, Tinos
          </div>
        </div>

        <div>
          <div style={{
            fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase",
            color: "var(--mist)", marginBottom: 20,
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <span style={{ width: 24, height: 1, background: "var(--mist)" }} />
            The Atelier
          </div>
          <h2 className="serif" style={{
            fontSize: "clamp(40px, 5vw, 72px)",
            margin: 0, lineHeight: 1.0, letterSpacing: "-0.02em",
            fontWeight: 400,
          }}>
            Three generations,<br />
            <span className="italic" style={{ color: "var(--terra-2)" }}>one chisel rhythm</span>.
          </h2>
          <p style={{ marginTop: 32, fontSize: 17, lineHeight: 1.7, color: "rgba(242,235,224,0.85)", maxWidth: 540 }}>
            Skevos began in a Pyrgos courtyard in 1974, when Yiannis Mavromatis
            laid down his quarry tools and started shaping leftover offcuts
            into household objects. Fifty-two years later we still source
            within a forty-kilometre radius and still finish every surface
            by hand with the same four grades of abrasive.
          </p>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
            gap: 32, marginTop: 56,
            paddingTop: 36, borderTop: "1px solid rgba(242,235,224,0.18)",
          }}>
            {[
              ["52", "Years", "carving"],
              ["8", "Quarries", "within reach"],
              ["3", "Hands", "per piece"],
            ].map(([n, l1, l2]) => (
              <div key={n}>
                <div className="serif" style={{ fontSize: 64, lineHeight: 1, fontWeight: 400 }}>{n}</div>
                <div style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mist)", marginTop: 12 }}>
                  {l1}<br />{l2}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── Contact (email form) ───────── */
function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [touched, setTouched] = useState(false);

  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const submit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setEmail("");
      setMessage("");
    }, 900);
  };

  return (
    <section id="contact" style={{
      padding: "140px 36px 120px",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 80,
      alignItems: "start",
    }}>
      <div>
        <div style={{
          fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase",
          color: "var(--stone)", marginBottom: 20,
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <span style={{ width: 24, height: 1, background: "var(--stone)" }} />
          Begin a commission
        </div>
        <h2 className="serif" style={{
          fontSize: "clamp(48px, 6vw, 96px)",
          margin: 0, lineHeight: 0.95, letterSpacing: "-0.02em",
          fontWeight: 400,
        }}>
          Leave us your<br />
          <span className="italic" style={{ color: "var(--terra)" }}>address</span>.
        </h2>
        <p style={{ marginTop: 28, fontSize: 17, color: "var(--ink-2)", lineHeight: 1.6, maxWidth: 460 }}>
          Tell us the piece you have in mind, the room it will live in, or
          simply that you'd like to be on the list when the next edition opens.
        </p>

        <div style={{ marginTop: 56, display: "flex", flexDirection: "column", gap: 14, fontSize: 14, color: "var(--ink-2)" }}>
          <div style={{ display: "flex", gap: 16 }}>
            <span style={{ width: 100, color: "var(--stone)", letterSpacing: "0.15em", textTransform: "uppercase", fontSize: 11 }}>Atelier</span>
            <span>Odos Mavromati 4, Pyrgos, Tinos 84200</span>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <span style={{ width: 100, color: "var(--stone)", letterSpacing: "0.15em", textTransform: "uppercase", fontSize: 11 }}>Hours</span>
            <span>Tue–Sat · 10:00–18:00 EET</span>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <span style={{ width: 100, color: "var(--stone)", letterSpacing: "0.15em", textTransform: "uppercase", fontSize: 11 }}>Direct</span>
            <span>hello@skevos.gr</span>
          </div>
        </div>
      </div>

      <form onSubmit={submit} style={{
        background: "var(--paper)",
        borderRadius: "var(--r-lg)",
        padding: 44,
        boxShadow: "var(--shadow-md)",
        border: "1px solid rgba(27,24,21,0.08)",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* watermark */}
        <div className="serif italic" aria-hidden style={{
          position: "absolute", top: -30, right: -10,
          fontSize: 200, color: "rgba(27,24,21,0.04)",
          pointerEvents: "none", lineHeight: 1,
        }}>
          ✕
        </div>

        <div style={{ fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--stone)" }}>
          Enquiry form
        </div>

        <Field
          label="Your email"
          required
          value={email}
          onChange={setEmail}
          onBlur={() => setTouched(true)}
          type="email"
          placeholder="you@somewhere"
          error={touched && !valid ? "Please enter a valid email" : null}
        />

        <Field
          label="A few lines (optional)"
          value={message}
          onChange={setMessage}
          textarea
          placeholder="Tell us about the room, the piece, the dream…"
        />

        <button
          type="submit"
          disabled={status === "sending" || status === "sent"}
          style={{
            marginTop: 32,
            width: "100%",
            padding: "20px 24px",
            borderRadius: 999,
            border: "none",
            background: status === "sent" ? "var(--terra)" : "var(--ink)",
            color: "var(--bone)",
            fontSize: 13, letterSpacing: "0.25em", textTransform: "uppercase",
            cursor: status === "sending" ? "wait" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 14,
            transition: "background 300ms ease, transform 200ms ease",
          }}
          onMouseEnter={e => { if (status === "idle") e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
        >
          {status === "idle" && <>Send enquiry <span>↘</span></>}
          {status === "sending" && <>Sending<Dots /></>}
          {status === "sent" && <>Thank you — we'll be in touch ✓</>}
        </button>

        <div style={{ marginTop: 18, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--stone)", textAlign: "center" }}>
          We reply within two working days
        </div>
      </form>
    </section>
  );
}

function Field({ label, value, onChange, onBlur, type = "text", textarea, placeholder, required, error }) {
  const [focus, setFocus] = useState(false);
  return (
    <label style={{ display: "block", marginTop: 28 }}>
      <div style={{
        fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase",
        color: focus || value ? "var(--terra)" : "var(--stone)",
        transition: "color 200ms",
        marginBottom: 10,
      }}>
        {label}{required && <span style={{ color: "var(--terra)" }}>*</span>}
      </div>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={(e) => { setFocus(false); onBlur && onBlur(e); }}
          placeholder={placeholder}
          rows={4}
          style={fieldStyle(focus, !!error)}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={(e) => { setFocus(false); onBlur && onBlur(e); }}
          placeholder={placeholder}
          style={fieldStyle(focus, !!error)}
        />
      )}
      {error && (
        <div style={{ marginTop: 8, fontSize: 12, color: "var(--terra)" }}>
          {error}
        </div>
      )}
    </label>
  );
}

const fieldStyle = (focus, error) => ({
  width: "100%",
  background: "transparent",
  border: "none",
  borderBottom: `1px solid ${error ? "var(--terra)" : focus ? "var(--ink)" : "rgba(27,24,21,0.25)"}`,
  padding: "10px 0",
  fontFamily: "Cormorant Garamond, serif",
  fontSize: 24,
  color: "var(--ink)",
  outline: "none",
  resize: "none",
  transition: "border-color 200ms",
});

function Dots() {
  const [d, setD] = useState("");
  useEffect(() => {
    const t = setInterval(() => setD(x => x.length >= 3 ? "" : x + "."), 250);
    return () => clearInterval(t);
  }, []);
  return <span style={{ display: "inline-block", width: 24, textAlign: "left" }}>{d}</span>;
}

/* ───────── Footer ───────── */
function Footer() {
  return (
    <footer style={{
      padding: "60px 36px 40px",
      borderTop: "1px solid rgba(27,24,21,0.12)",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase",
      color: "var(--stone)",
    }}>
      <div className="serif" style={{ fontSize: 22, letterSpacing: "0.08em", color: "var(--ink)" }}>
        SKEVOS<span style={{ color: "var(--terra)" }}>.</span>
      </div>
      <div>© 2026 Mavromatis Atelier · Pyrgos · Tinos</div>
      <div>Σκεῦος — vessel, object, thing of care</div>
    </footer>
  );
}

/* ───────── App ───────── */
function App() {
  return (
    <div>
      <Nav />
      <Hero />
      <Collection />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
