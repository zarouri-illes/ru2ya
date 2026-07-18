import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const designs = [
  { img: '/assets/graphic/1.png', alt: 'Design graphique ru2ya - création visuelle abstraite' },
  { img: '/assets/graphic/post1.png', alt: 'Publication design réseaux sociaux - ru2ya studio' },
  { img: '/assets/graphic/2.png', alt: 'Affiche design graphique - création de marque' },
  { img: '/assets/graphic/plaque%20bureau.png', alt: 'Plaque bureau personnalisée - design industriel ru2ya' },
]

function PortfolioDesigns() {
  const [front, setFront] = useState(0)
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const deckRef = useRef(null)
  const cardRefs = useRef([])
  const dragState = useRef({ startX: 0 })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        deckRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    layoutDeck(0)

    return () => ctx.revert()
  }, [])

  const layoutDeck = (frontIndex, animate = false) => {
    const total = designs.length
    const duration = animate ? 0.5 : 0

    cardRefs.current.forEach((el, i) => {
      if (!el) return
      const offset = ((i - frontIndex + total) % total)
      const isFront = offset === 0

      gsap.to(el, {
        x: offset * 16,
        y: offset * 10,
        scale: isFront ? 1 : Math.max(0.8, 1 - offset * 0.04),
        rotation: isFront ? 0 : (offset - 1) * 2.5,
        zIndex: total - offset,
        duration,
        ease: 'power3.out',
      })
    })
  }

  const advance = () => {
    const prev = front
    const next = (front + 1) % designs.length

    const prevEl = cardRefs.current[prev]
    const nextEl = cardRefs.current[next]
    if (!prevEl || !nextEl) return

    const total = designs.length

    gsap.to(prevEl, {
      x: (total - 1) * 16,
      y: (total - 1) * 10,
      scale: Math.max(0.8, 1 - (total - 1) * 0.04),
      rotation: (total - 2) * 2.5,
      zIndex: 0,
      duration: 0.5,
      ease: 'power3.inOut',
    })

    gsap.to(nextEl, {
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      zIndex: total,
      duration: 0.5,
      ease: 'back.out(1.7)',
    })

    let idx = 0
    cardRefs.current.forEach((el, i) => {
      if (i === prev || i === next) return
      const offset = idx + 1
      gsap.to(el, {
        x: offset * 16,
        y: offset * 10,
        scale: Math.max(0.8, 1 - offset * 0.04),
        rotation: offset * 2.5,
        zIndex: total - offset,
        duration: 0.5,
        ease: 'power3.out',
      })
      idx++
    })

    setFront(next)
  }

  const goTo = (index) => {
    const total = designs.length
    const target = (index + total) % total
    if (target === front) return

    cardRefs.current.forEach((el, i) => {
      if (!el) return
      gsap.set(el, { opacity: 1 })
    })

    const prev = front
    const prevEl = cardRefs.current[prev]
    const nextEl = cardRefs.current[target]
    if (!prevEl || !nextEl) return

    gsap.to(prevEl, {
      x: (total - 1) * 16,
      y: (total - 1) * 10,
      scale: Math.max(0.8, 1 - (total - 1) * 0.04),
      rotation: (total - 2) * 2.5,
      zIndex: 0,
      duration: 0.5,
      ease: 'power3.inOut',
    })

    gsap.to(nextEl, {
      x: 0, y: 0, scale: 1, rotation: 0, zIndex: total,
      duration: 0.5,
      ease: 'back.out(1.7)',
    })

    let idx = 0
    cardRefs.current.forEach((el, i) => {
      if (i === prev || i === target) return
      const offset = idx + 1
      gsap.to(el, {
        x: offset * 16,
        y: offset * 10,
        scale: Math.max(0.8, 1 - offset * 0.04),
        rotation: offset * 2.5,
        zIndex: total - offset,
        duration: 0.5,
        ease: 'power3.out',
      })
      idx++
    })

    setFront(target)
  }

  const handlePointerDown = (e) => {
    dragState.current.startX = e.clientX ?? e.changedTouches?.[0]?.clientX
    dragState.current.isDragging = false
  }

  const handlePointerMove = (e) => {
    if (dragState.current.startX == null) return
    const x = e.clientX ?? e.changedTouches?.[0]?.clientX
    if (x == null) return
    const dx = x - dragState.current.startX
    if (Math.abs(dx) > 8) {
      dragState.current.isDragging = true
    }
    if (Math.abs(dx) > 20) {
      const frontEl = cardRefs.current[front]
      if (frontEl) {
        gsap.set(frontEl, { x: dx, rotation: dx * 0.05 })
      }
    }
  }

  const handlePointerUp = (e) => {
    const x = e.clientX ?? e.changedTouches?.[0]?.clientX
    if (x == null || dragState.current.startX == null) return
    const dx = x - dragState.current.startX

    if (Math.abs(dx) > 60) {
      advance()
    } else if (dragState.current.isDragging) {
      const frontEl = cardRefs.current[front]
      if (frontEl) {
        gsap.to(frontEl, { x: 0, rotation: 0, duration: 0.4, ease: 'power3.out' })
      }
    }

    dragState.current.startX = null
  }

  const handleClick = () => {
    if (!dragState.current.isDragging) advance()
  }

  return (
    <section ref={sectionRef} id="designs" className="portfolio-designs">
      <div ref={headerRef} className="pd-header">
        <h2 className="pd-title">Travaux Visuels</h2>
      </div>

      <div
        ref={deckRef}
        className="pd-deck"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onClick={handleClick}
      >
        <div className="pd-deck-inner">
          {designs.map((item, i) => (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              className="pd-card"
            >
              <img src={item.img} alt={item.alt} loading="lazy" className="pd-card-img" />
            </div>
          ))}
        </div>
      </div>

      <div className="pd-dots">
        {designs.map((_, i) => (
          <button
            key={i}
            className={`pd-dot ${i === front ? 'active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Image ${i + 1}`}
          />
        ))}
      </div>

      <style>{`
        .portfolio-designs {
          min-height: 100vh;
          background: #0b0e1a;
          padding: 80px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .pd-header {
          text-align: center;
          margin-bottom: 40px;
          z-index: 2;
        }

        .pd-title {
          font-size: 42px;
          font-weight: 700;
          background: linear-gradient(135deg, #a855f7, #c084fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-family: var(--font-sans);
        }

        .pd-deck {
          display: flex;
          justify-content: center;
          width: 100%;
          padding: 0 24px;
          touch-action: none;
          user-select: none;
          -webkit-user-select: none;
        }

        .pd-deck-inner {
          display: grid;
          justify-items: center;
          max-width: 100%;
        }

        .pd-card {
          grid-area: 1 / 1;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          cursor: grab;
          border: 2px solid rgba(255, 255, 255, 0.08);
          will-change: transform;
          align-self: center;
          justify-self: center;
          line-height: 0;
        }

        .pd-card:active {
          cursor: grabbing;
        }

        .pd-card-img {
          display: block;
          max-width: 80vw;
          max-height: 70vh;
          width: auto;
          height: auto;
          pointer-events: none;
          border-radius: 14px;
        }

        .pd-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 24px;
          z-index: 2;
        }

        .pd-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.2);
          cursor: pointer;
          transition: all 0.3s;
          padding: 0;
        }

        .pd-dot.active {
          background: var(--teal);
          width: 24px;
          border-radius: 4px;
        }

        @media (max-width: 768px) {
          .portfolio-designs {
            padding: 60px 0;
            min-height: auto;
          }
          .pd-title {
            font-size: 28px;
          }
          .pd-deck {
            padding: 0 16px;
          }
          .pd-card-img {
            max-width: 90vw;
            max-height: 60vh;
          }
        }

        @media (max-width: 480px) {
          .portfolio-designs {
            padding: 40px 0;
          }
          .pd-card-img {
            max-width: 92vw;
            max-height: 55vh;
          }
        }
      `}</style>
    </section>
  )
}

export default PortfolioDesigns
