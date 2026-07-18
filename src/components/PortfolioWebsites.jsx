import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sites = [
  {
    title: 'Noor E-Commerce',
    tag: 'React / Node.js',
    desc: 'Boutique en ligne complète avec inventaire en temps réel, intégration de paiement et analyses tableau de bord.',
    gradient: 'linear-gradient(135deg, #0a1628, #1a3a4a)',
    accent: '#2dd4bf',
  },
  {
    title: 'Atlas Dashboard',
    tag: 'Vue / D3.js',
    desc: 'Plateforme de visualisation de données pour le suivi logistique avec cartes en direct, graphiques et outils d\'exportation.',
    gradient: 'linear-gradient(135deg, #0f1f3d, #2a1a3a)',
    accent: '#c084fc',
  },
  {
    title: 'Safir Travel',
    tag: 'Next.js / Tailwind',
    desc: 'Site d\'agence de voyage avec explorateur de destinations interactif, système de réservation et support multilingue.',
    gradient: 'linear-gradient(135deg, #0a1628, #1a3a2a)',
    accent: '#22d3ee',
  },
  {
    title: 'Mira Health',
    tag: 'React / Firebase',
    desc: 'Plateforme de télémédecine avec prise de rendez-vous, consultations vidéo et dossiers patients.',
    gradient: 'linear-gradient(135deg, #1a0a28, #0f1f3d)',
    accent: '#f472b6',
  },
  {
    title: 'Zaha Agency',
    tag: 'Astro / GSAP',
    desc: 'Portfolio d\'agence créative avec animations immersives au scroll, études de cas et CMS de contact.',
    gradient: 'linear-gradient(135deg, #0f1f3d, #1a2a1a)',
    accent: '#fbbf24',
  },
  {
    title: 'Qalam Blog',
    tag: 'Gatsby / MDX',
    desc: 'Plateforme de publication moderne avec édition de texte enrichi, analytics lecteurs et intégration newsletter.',
    gradient: 'linear-gradient(135deg, #0a1628, #3a1a1a)',
    accent: '#ef4444',
  },
]

function PortfolioWebsites() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      )

      const cards = gridRef.current?.querySelectorAll('.site-card')
      if (cards) {
        tl.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.5, stagger: 0.08, ease: 'power3.out',
          },
          '-=0.3'
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="websites" className="portfolio-websites" data-cursor="default">
      <div className="container">
        <div ref={headerRef} className="portfolio-header">
          <h2 className="portfolio-title">Nos Sites Réalisés</h2>
          <p className="portfolio-desc">
            De l'e-commerce aux tableaux de bord — chaque projet est conçu pour la performance, l'ergonomie et l'impact.
          </p>
        </div>

        <div ref={gridRef} className="sites-grid">
          {sites.map((site, i) => (
            <div key={i} className="site-card">
              <div className="site-preview" style={{ background: site.gradient }}>
                <div className="site-mockup">
                  <div className="mockup-bar">
                    <span className="mockup-dot" />
                    <span className="mockup-dot" />
                    <span className="mockup-dot" />
                  </div>
                  <div className="mockup-content">
                    <div className="mockup-line w60" />
                    <div className="mockup-line w40" />
                    <div className="mockup-line w80" />
                    <div className="mockup-block" />
                    <div className="mockup-row">
                      <div className="mockup-line w30" />
                      <div className="mockup-line w30" />
                    </div>
                  </div>
                </div>
                <div className="site-accent-bar" style={{ background: site.accent }} />
              </div>
              <div className="site-info">
                <div className="site-meta">
                  <span className="site-tag" style={{ color: site.accent }}>{site.tag}</span>
                </div>
                <h3 className="site-title">{site.title}</h3>
                <p className="site-desc">{site.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .portfolio-websites {
          min-height: 100vh;
          background: var(--gradient-primary);
          padding: 100px 0;
          display: flex;
          align-items: center;
        }

        .portfolio-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .portfolio-title {
          font-size: 42px;
          font-weight: 700;
          background: var(--gradient-accent);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 12px;
          font-family: var(--font-sans);
        }

        .portfolio-desc {
          color: var(--gray);
          font-size: 16px;
          max-width: 520px;
          margin: 0 auto;
        }

        .sites-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .site-card {
          background: rgba(15, 25, 40, 0.5);
          border: 1px solid rgba(45, 212, 191, 0.08);
          border-radius: 12px;
          overflow: hidden;
          transition: border-color 0.3s, transform 0.3s;
          cursor: pointer;
        }

        .site-card:hover {
          border-color: rgba(45, 212, 191, 0.25);
          transform: translateY(-4px);
        }

        .site-preview {
          height: 140px;
          position: relative;
          overflow: hidden;
        }

        .site-mockup {
          padding: 12px;
        }

        .mockup-bar {
          display: flex;
          gap: 4px;
          margin-bottom: 10px;
        }

        .mockup-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
        }

        .mockup-content {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .mockup-line {
          height: 4px;
          border-radius: 2px;
          background: rgba(255, 255, 255, 0.08);
        }

        .mockup-line.w60 { width: 60%; }
        .mockup-line.w40 { width: 40%; }
        .mockup-line.w80 { width: 80%; }
        .mockup-line.w30 { width: 30%; }

        .mockup-block {
          height: 24px;
          border-radius: 3px;
          background: rgba(255, 255, 255, 0.04);
          margin: 2px 0;
        }

        .mockup-row {
          display: flex;
          gap: 12px;
        }

        .site-accent-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
        }

        .site-info {
          padding: 16px;
        }

        .site-meta {
          margin-bottom: 6px;
        }

        .site-tag {
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .site-title {
          font-size: 17px;
          font-weight: 600;
          color: var(--white);
          margin-bottom: 6px;
          font-family: var(--font-sans);
        }

        .site-desc {
          font-size: 13px;
          color: var(--gray);
          line-height: 1.5;
        }

        @media (max-width: 1024px) {
          .sites-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .portfolio-title {
            font-size: 32px;
          }
        }

        @media (max-width: 768px) {
          .portfolio-websites {
            padding: 60px 0;
            min-height: auto;
          }
          .sites-grid {
            grid-template-columns: 1fr;
            max-width: 400px;
            margin: 0 auto;
          }
          .portfolio-title {
            font-size: 26px;
          }
          .site-preview {
            height: 110px;
          }
        }
      `}</style>
    </section>
  )
}

export default PortfolioWebsites
