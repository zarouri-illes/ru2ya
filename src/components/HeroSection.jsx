import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

function HeroSection() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const orb1Ref = useRef(null)
  const orb2Ref = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom 40%',
          scrub: 1.2,
        },
      })

      tl.to(sectionRef.current, {
        scale: 0.92,
        opacity: 0.5,
        borderRadius: '28px',
        duration: 1,
        ease: 'none',
      })

      tl.to(contentRef.current, {
        y: -60,
        duration: 1,
        ease: 'none',
      }, 0)

      tl.to(orb1Ref.current, {
        x: 80, y: -60, scale: 1.2,
        duration: 1,
        ease: 'none',
      }, 0)

      tl.to(orb2Ref.current, {
        x: -60, y: 40, scale: 0.8,
        duration: 1,
        ease: 'none',
      }, 0)
    })

    const enterTl = gsap.timeline({ delay: 0.15 })

    enterTl
      .fromTo(
        gridRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: 'power2.out' }
      )
      .fromTo(
        orb1Ref.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' },
        '-=0.8'
      )
      .fromTo(
        orb2Ref.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' },
        '-=0.2'
      )

    return () => ctx.revert()
  }, [])

  const scrollToSection = (selector) => {
    const target = document.querySelector(selector)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section ref={sectionRef} id="top" className="hero-section" data-cursor="default">
      <div ref={gridRef} className="hero-grid" />
      <div ref={orb1Ref} className="hero-orb hero-orb-1" />
      <div ref={orb2Ref} className="hero-orb hero-orb-2" />
      <div className="hero-grain" />

      <div ref={contentRef} className="hero-content">
        <div className="hero-center">
          <h1 ref={titleRef} className="hero-title">
            Nous Créons du <span className="title-highlight">Numérique</span><br />
            Qui Compte
          </h1>

          <p ref={subtitleRef} className="hero-subtitle">
            Expériences web, identités visuelles, films et vêtements —
            conçus pour des marques qui refusent de se fondre dans la masse.
          </p>

          <div ref={ctaRef} className="hero-actions">
            <button className="hero-cta primary" onClick={() => scrollToSection('#terminal')}>
              Lancer un Projet
              <span className="cta-arrow">→</span>
            </button>
            <button className="hero-cta secondary" onClick={() => scrollToSection('#websites')}>
              Voir Nos Réalisations
            </button>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <span className="scroll-line" />
      </div>

      <style>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: var(--gradient-primary);
          position: relative;
          overflow: hidden;
          padding: 120px 32px 40px;
          will-change: transform, opacity;
        }

        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(124, 58, 237, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124, 58, 237, 0.03) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        .hero-grain {
          position: absolute;
          inset: 0;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 256px 256px;
          pointer-events: none;
        }

        .hero-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          will-change: transform;
        }

        .hero-orb-1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, rgba(168, 85, 247, 0.04) 40%, transparent 70%);
          top: 10%;
          right: -100px;
        }

        .hero-orb-2 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(192, 132, 252, 0.08) 0%, rgba(168, 85, 247, 0.03) 40%, transparent 70%);
          bottom: 5%;
          left: -60px;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 800px;
          margin: 0 auto;
          width: 100%;
          will-change: transform;
        }

        .hero-center {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-title {
          font-size: clamp(40px, 5.5vw, 72px);
          font-weight: 700;
          color: var(--white);
          margin-bottom: 16px;
          line-height: 1.08;
          letter-spacing: -1.5px;
        }

        .title-highlight {
          background: var(--gradient-accent);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: clamp(15px, 1.6vw, 18px);
          color: var(--gray);
          max-width: 480px;
          line-height: 1.7;
          margin-bottom: 32px;
        }

        .hero-actions {
          display: flex;
          gap: 12px;
        }

        .hero-cta {
          padding: 14px 32px;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s;
          font-family: var(--font-sans);
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .hero-cta.primary {
          background: var(--gradient-accent);
          color: var(--navy);
        }

        .hero-cta.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(124, 58, 237, 0.3);
        }

        .cta-arrow {
          transition: transform 0.2s;
        }

        .hero-cta.primary:hover .cta-arrow {
          transform: translateX(4px);
        }

        .hero-cta.secondary {
          background: transparent;
          color: var(--white);
          border: 1px solid rgba(124, 58, 237, 0.25);
        }

        .hero-cta.secondary:hover {
          border-color: var(--teal);
          background: rgba(124, 58, 237, 0.06);
        }

        .hero-scroll-indicator {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1;
        }

        .scroll-line {
          width: 1px;
          height: 32px;
          background: linear-gradient(180deg, rgba(124, 58, 237, 0.4), transparent);
          animation: scroll-bounce 2s ease-in-out infinite;
          display: block;
        }

        @keyframes scroll-bounce {
          0%, 100% { transform: scaleY(0.4); opacity: 0.2; }
          50% { transform: scaleY(1); opacity: 1; }
        }

        @media (max-width: 900px) {
          .hero-orb-1 {
            width: 300px;
            height: 300px;
            right: -80px;
          }

          .hero-orb-2 {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 100px 20px 32px;
            min-height: 90vh;
          }

          .hero-logo {
            height: 80px;
          }

          .hero-title {
            font-size: 32px;
          }

          .hero-actions {
            flex-direction: column;
            width: 100%;
            max-width: 320px;
          }

          .hero-cta {
            width: 100%;
            justify-content: center;
          }

        }
      `}</style>
    </section>
  )
}

export default HeroSection
