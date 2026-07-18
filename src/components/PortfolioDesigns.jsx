import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const designs = [
  {
    img: '/assets/graphic/1.png',
    desc: 'Identite de marque complete avec systeme typographique et palette sur mesure.',
    palette: ['#0a1628', '#2dd4bf', '#06b6d4', '#f0fdfa', '#c084fc'],
  },
  {
    img: '/assets/graphic/post1.png',
    desc: 'Campagne social media aux visuels percutants pour un lancement de produit.',
    palette: ['#0a1628', '#fbbf24', '#f472b6', '#2dd4bf', '#ffffff'],
  },
  {
    img: '/assets/graphic/2.png',
    desc: 'Brochure luxueuse avec mise en page editoriale soignee et photos sur mesure.',
    palette: ['#1a1a2e', '#e2e8f0', '#cbd5e1', '#0f172a', '#94a3b8'],
  },
  {
    img: '/assets/graphic/plaque%20bureau.png',
    desc: 'Pitch deck investisseur avec visualisations de donnees et narrative coherence.',
    palette: ['#0a1628', '#2dd4bf', '#c084fc', '#fbbf24', '#1e293b'],
  },
  {
    img: '/assets/graphic/1.png',
    desc: 'Direction artistique editoriale pour magazine culturel trimestriel.',
    palette: ['#0a1628', '#2dd4bf', '#06b6d4', '#f0fdfa', '#c084fc'],
  },
  {
    img: '/assets/graphic/post1.png',
    desc: "Design d'interface mobile pour plateforme sante - ecrans et prototype.",
    palette: ['#0a1628', '#fbbf24', '#f472b6', '#2dd4bf', '#ffffff'],
  },
]

function PortfolioDesigns() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const listRef = useRef(null)

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

      const items = listRef.current?.querySelectorAll('.design-item')
      if (items) {
        tl.fromTo(
          items,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.5, stagger: 0.1, ease: 'power3.out',
          },
          '-=0.3'
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="designs" className="portfolio-designs" data-cursor="default">
      <div className="container">
        <div ref={headerRef} className="portfolio-header">
          <h2 className="portfolio-title">Travaux Visuels</h2>
          <p className="portfolio-desc">
            Identites de marque, mises en page imprimees, campagnes sociales et designs UI qui communiquent en un coup d'oeil.
          </p>
        </div>

        <div ref={listRef} className="designs-list">
          {designs.map((item, i) => (
            <div key={i} className="design-item">
              <div className="design-img-wrap">
                <img src={item.img} alt="Design" className="design-img" />
              </div>
              <div className="design-info">
                <p className="design-desc">{item.desc}</p>
                <div className="design-palette">
                  {item.palette.map((c, ci) => (
                    <span
                      key={ci}
                      className="palette-swatch"
                      style={{ background: c }}
                      title={c}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .portfolio-designs {
          min-height: 100vh;
          background: #0b0e1a;
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
          background: linear-gradient(135deg, #06b6d4, #c084fc);
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

        .designs-list {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .design-item {
          border-radius: 16px;
          overflow: hidden;
          background: rgba(15, 25, 40, 0.4);
          border: 1px solid rgba(6, 182, 212, 0.08);
          transition: all 0.4s;
          cursor: pointer;
          display: flex;
          flex-direction: column;
        }

        .design-item:hover {
          transform: translateY(-6px);
          border-color: rgba(6, 182, 212, 0.2);
          box-shadow: 0 12px 40px rgba(6, 182, 212, 0.06);
        }

        .design-img-wrap {
          line-height: 0;
        }

        .design-img {
          width: 100%;
          height: auto;
          display: block;
        }

        .design-info {
          padding: 16px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .design-desc {
          font-size: 12px;
          color: var(--gray);
          line-height: 1.6;
          margin: 0;
        }

        .design-palette {
          display: flex;
          gap: 4px;
        }

        .palette-swatch {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 1.5px solid rgba(255, 255, 255, 0.1);
          transition: transform 0.2s;
          cursor: pointer;
        }

        .palette-swatch:hover {
          transform: scale(1.4);
        }

        @media (max-width: 1024px) {
          .designs-list {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .portfolio-designs {
            padding: 60px 0;
            min-height: auto;
          }
          .portfolio-title {
            font-size: 28px;
          }
          .designs-list {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }
          .design-item {
            max-width: 400px;
            width: 100%;
          }
        }
      `}</style>
    </section>
  )
}

export default PortfolioDesigns
