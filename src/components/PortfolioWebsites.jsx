import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sites = [
  {
    title: 'BacPrep Hub',
    tag: 'React / Node.js / PostgreSQL',
    desc: 'Plateforme éducative full-stack avec moteur de quiz interactif, chatbot IA propulsé par Gemini API, et suivi de performance dynamique pour les bacheliers Algériens.',
    img: '/web_projects/bacprep.png',
    link: 'https://bacprephub.vercel.app/',
    gradient: 'linear-gradient(135deg, #0a0015, #1a3a4a)',
    accent: '#7c3aed',
  },
  {
    title: 'Promotion Immobilière DAOUD KAMEL',
    tag: 'React / Tailwind CSS',
    desc: 'Landing page vitrine pour une agence immobilière basée à Bouira, présentant ses services et ses biens.',
    img: '/web_projects/dk.jpg',
    link: 'https://promotiondaoudkamel.com/',
    gradient: 'linear-gradient(135deg, #120020, #2a1a3a)',
    accent: '#c084fc',
  },
  {
    title: 'Ose It',
    tag: 'React / Tailwind CSS',
    desc: 'Version initiale de la landing page d\'Ose It, un centre proposant des formations aux nouvelles technologies pour les enfants.',
    img: '/web_projects/oseit.JPG',
    link: 'https://ose-it-v1.vercel.app/',
    gradient: 'linear-gradient(135deg, #0a0015, #1a3a2a)',
    accent: '#c084fc',
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
            Des plateformes éducatives aux landing pages — chaque projet est conçu avec React, Node.js et Tailwind CSS.
          </p>
        </div>

        <div ref={gridRef} className="sites-grid">
          {sites.map((site, i) => (
            <div key={i} className="site-card">
              <div className="site-preview">
                <img src={site.img} alt={`Capture d'écran du site ${site.title} — projet ${site.tag} réalisé par ru2ya`} loading="lazy" className="site-preview-img" />
                <div className="site-accent-bar" style={{ background: site.accent }} />
              </div>
              <div className="site-info">
                <div className="site-meta">
                  <span className="site-tag" style={{ color: site.accent }}>{site.tag}</span>
                </div>
                <h3 className="site-title">{site.title}</h3>
                <p className="site-desc">{site.desc}</p>
                <a href={site.link} target="_blank" rel="noopener noreferrer" className="site-btn" style={{ '--btn-accent': site.accent }}>
                  Voir le site →
                </a>
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
          border: 1px solid rgba(124, 58, 237, 0.08);
          border-radius: 12px;
          overflow: hidden;
          transition: border-color 0.3s, transform 0.3s;
          cursor: pointer;
        }

        .site-card:hover {
          border-color: rgba(124, 58, 237, 0.25);
          transform: translateY(-4px);
        }

        .site-preview {
          height: 180px;
          position: relative;
          overflow: hidden;
          background: #0a0015;
        }

        .site-preview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .site-card:hover .site-preview-img {
          transform: scale(1.05);
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
          display: flex;
          flex-direction: column;
          flex: 1;
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
          margin-bottom: 12px;
        }

        .site-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          font-family: var(--font-sans);
          color: var(--white);
          background: rgba(124, 58, 237, 0.1);
          border: 1px solid rgba(124, 58, 237, 0.2);
          text-decoration: none;
          transition: all 0.25s;
          margin-top: auto;
          align-self: flex-start;
        }

        .site-btn:hover {
          background: var(--teal);
          color: var(--navy);
          border-color: var(--teal);
          transform: translateY(-1px);
        }

        @media (max-width: 1024px) {
          .sites-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .portfolio-title {
            font-size: 32px;
          }
          .site-preview {
            height: 140px;
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
            gap: 16px;
          }
          .portfolio-title {
            font-size: 26px;
          }
          .site-preview {
            height: 180px;
          }
        }

        @media (max-width: 480px) {
          .sites-grid {
            gap: 12px;
          }
          .site-preview {
            height: 160px;
          }
          .site-info {
            padding: 12px;
          }
        }
      `}</style>
    </section>
  )
}

export default PortfolioWebsites
