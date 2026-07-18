import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const designs = [
  {
    id: 1,
    name: 'Tee Vision',
    img: '/assets/tshirt1.png',
    colors: ['#0a1628', '#2dd4bf', '#ffffff'],
    tag: 'Géométrique',
    desc: 'Composition géométrique audacieuse avec accents teal superposés sur une base sombre.',
  },
  {
    id: 2,
    name: 'Noir Signature',
    img: '/assets/tshirt2.jpg',
    colors: ['#0a1628', '#f0fdfa', '#06b6d4'],
    tag: 'Minimal',
    desc: 'Design typographique épuré — le mot-symbole ru2ya centré sur fond noir.',
  },
  {
    id: 3,
    name: 'Ton Désert',
    img: '/assets/design.jpg',
    colors: ['#0a1628', '#fbbf24', '#ef4444'],
    tag: 'Abstrait',
    desc: 'Imprimé abstrait aux tons chauds inspiré des paysages désertiques et des palettes délavées par le soleil.',
  },
]

function TShirtSection() {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)
  const cardsRef = useRef([])

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
        sectionRef.current.querySelector('.tshirt-header'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      )

      const cards = gridRef.current?.querySelectorAll('.shirt-card')
      if (cards) {
        tl.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.5, stagger: 0.08, ease: 'back.out(1.7)',
          },
          '-=0.3'
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleCardMouseMove = (e, card) => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -12
    const rotateY = ((x - centerX) / centerX) * 12

    gsap.to(card.querySelector('.shirt-img'), {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      duration: 0.4,
      ease: 'power2.out',
    })

    gsap.to(card.querySelector('.shirt-shadow'), {
      x: (x - centerX) * 0.2,
      y: (y - centerY) * 0.2,
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  const handleCardMouseLeave = (card) => {
    gsap.to(card.querySelector('.shirt-img'), {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power3.out',
    })

    gsap.to(card.querySelector('.shirt-shadow'), {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'power3.out',
    })
  }

  return (
    <section ref={sectionRef} id="tshirt" className="tshirt-section" data-cursor="default">
      <div className="container">
        <div className="tshirt-header">
          <h2 className="tshirt-title">Designs T-Shirt</h2>
          <p className="tshirt-desc">
            Des graphismes originaux conçus pour le tissu — chaque pièce commence comme un concept et finit comme un imprimé portable.
          </p>
        </div>

        <div ref={gridRef} className="shirt-grid">
          {designs.map((d, i) => (
            <div
              key={d.id}
              ref={(el) => (cardsRef.current[i] = el)}
              className="shirt-card"
              onMouseMove={(e) => handleCardMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleCardMouseLeave(e.currentTarget)}
            >
              <div className="shirt-shadow" />
              <div className="shirt-tag">{d.tag}</div>
              <div className="shirt-img-wrapper">
                <img
                  src={d.img}
                  alt={d.name}
                  className="shirt-img"
                  onError={(e) => { e.target.style.display = 'none' }}
                />
              </div>
              <div className="shirt-info">
                <span className="shirt-name">{d.name}</span>
                <p className="shirt-desc">{d.desc}</p>
                <div className="shirt-colors">
                  {d.colors.map((c, ci) => (
                    <span key={ci} className="shirt-color" style={{ background: c }} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .tshirt-section {
          min-height: 100vh;
          background: var(--gradient-primary);
          padding: 100px 0;
          display: flex;
          align-items: center;
        }

        .tshirt-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .tshirt-title {
          font-size: 48px;
          font-weight: 700;
          background: var(--gradient-accent);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 12px;
          font-family: var(--font-sans);
        }

        .tshirt-desc {
          color: var(--gray);
          font-size: 16px;
          max-width: 480px;
          margin: 0 auto;
        }

        .shirt-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 900px;
          margin: 0 auto;
        }

        .shirt-card {
          background: rgba(15, 25, 40, 0.6);
          border: 1px solid rgba(45, 212, 191, 0.1);
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          position: relative;
          transform-style: preserve-3d;
          transition: border-color 0.3s;
          outline: none;
        }

        .shirt-card:hover {
          border-color: rgba(45, 212, 191, 0.3);
        }

        .shirt-card:focus-visible {
          border-color: var(--teal);
          box-shadow: 0 0 20px rgba(45, 212, 191, 0.2);
        }

        .shirt-shadow {
          position: absolute;
          width: 70%;
          height: 16px;
          bottom: -6px;
          left: 15%;
          background: rgba(0, 0, 0, 0.25);
          filter: blur(10px);
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }

        .shirt-tag {
          position: absolute;
          top: 12px;
          left: 12px;
          z-index: 2;
          font-family: var(--font-mono);
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--white);
          background: rgba(45, 212, 191, 0.15);
          border: 1px solid rgba(45, 212, 191, 0.2);
          padding: 3px 10px;
          border-radius: 999px;
        }

        .shirt-img-wrapper {
          width: 100%;
          aspect-ratio: 1;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(10, 22, 40, 0.4);
        }

        .shirt-img {
          width: 80%;
          height: 80%;
          object-fit: contain;
          will-change: transform;
          filter: drop-shadow(0 4px 16px rgba(0, 0, 0, 0.3));
        }

        .shirt-info {
          padding: 16px;
        }

        .shirt-name {
          font-size: 17px;
          font-weight: 600;
          color: var(--white);
          display: block;
          margin-bottom: 4px;
          font-family: var(--font-sans);
        }

        .shirt-desc {
          font-size: 13px;
          color: var(--gray);
          line-height: 1.5;
          margin-bottom: 10px;
        }

        .shirt-colors {
          display: flex;
          gap: 6px;
        }

        .shirt-color {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 1.5px solid rgba(255, 255, 255, 0.15);
        }

        @media (max-width: 1024px) {
          .shirt-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .tshirt-title {
            font-size: 36px;
          }
        }

        @media (max-width: 768px) {
          .tshirt-section {
            padding: 60px 0;
            min-height: auto;
          }
          .shirt-grid {
            grid-template-columns: 1fr;
            max-width: 400px;
          }
          .tshirt-title {
            font-size: 28px;
          }
        }
      `}</style>
    </section>
  )
}

export default TShirtSection
