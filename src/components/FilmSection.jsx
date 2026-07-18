import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

function FilmSection() {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)
  const overlayRef = useRef(null)
  const textRef = useRef(null)
  const vignetteRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })

      tl.fromTo(
        bgRef.current,
        { scale: 1.15, filter: 'brightness(0.6)' },
        { scale: 1, filter: 'brightness(1)', duration: 1, ease: 'none' }
      )

      const vignetteTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'top 35%',
          toggleActions: 'play none none reverse',
        },
      })

      vignetteTl
        .fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: 'power3.out' }
        )
        .fromTo(
          textRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.4'
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="film" className="film-section" data-cursor="default">
      <div ref={bgRef} className="film-bg">
        <video
          ref={videoRef}
          className="film-video"
          autoPlay
          muted
          loop
          playsInline
          poster="/logo_ru_ru.png"
        >
          <source src="/UNSAVED%20%28Short%20Film%29%20_%20Shot%20on%20iPhone%2016%20Pro.mp4" type="video/mp4" />
        </video>
      </div>

      <div ref={vignetteRef} className="film-vignette" />
      <div ref={overlayRef} className="film-overlay">
        <div ref={textRef} className="film-text">
          <h2 className="film-title">À Travers Notre Objectif</h2>
          <p className="film-desc">
            Chaque plan est une fenêtre sur une histoire qui attend d'être racontée.
          </p>
          <button className="film-cta">Voir la Bande</button>
        </div>
      </div>

      <style>{`
        .film-section {
          height: 100vh;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100vw;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
        }

        .film-bg {
          position: absolute;
          inset: 0;
          will-change: transform;
        }

        .film-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .film-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse at center,
            transparent 45%,
            rgba(10, 22, 40, 0.85) 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        .film-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          padding: 40px;
        }

        .film-text {
          text-align: center;
          max-width: 600px;
        }

        .film-title {
          font-size: 64px;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 16px;
          text-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
          font-family: var(--font-sans);
          line-height: 1.1;
        }

        .film-desc {
          font-size: 18px;
          color: rgba(240, 253, 250, 0.8);
          margin-bottom: 32px;
          line-height: 1.6;
          text-shadow: 0 2px 20px rgba(0, 0, 0, 0.4);
        }

        .film-cta {
          display: inline-block;
          padding: 14px 36px;
          background: var(--gradient-accent);
          color: var(--navy);
          border: none;
          border-radius: 999px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          font-family: var(--font-sans);
        }

        .film-cta:hover {
          transform: scale(1.05);
          box-shadow: 0 0 30px rgba(45, 212, 191, 0.3);
        }

        @media (max-width: 768px) {
          .film-section {
            height: 80vh;
          }
          .film-title {
            font-size: 36px;
          }
          .film-desc {
            font-size: 15px;
          }
          .film-overlay {
            padding: 24px;
          }
          .film-cta {
            padding: 12px 28px;
            font-size: 14px;
          }
        }
      `}</style>
    </section>
  )
}

export default FilmSection
