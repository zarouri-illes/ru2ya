import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const navLinks = [
  { label: 'Web & Logiciel', href: '#terminal' },
  { label: 'Sites Web', href: '#websites' },
  { label: 'Design Graphique', href: '#photoshop' },
  { label: 'Créations', href: '#designs' },
  { label: 'Réalisation Film', href: '#film' },
  { label: 'Design T-Shirt', href: '#tshirt' },
  { label: 'Contact', href: '#contact' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 }
      )

      ScrollTrigger.create({
        start: 'top -80',
        onUpdate: (self) => {
          setScrolled(self.scroll > 80)
        },
      })
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      ctx.revert()
    }
  }, [])

  useEffect(() => {
    if (menuOpen && menuRef.current) {
      gsap.fromTo(
        menuRef.current.querySelectorAll('.mobile-link'),
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.06, ease: 'power2.out' }
      )
    }
  }, [menuOpen])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav ref={navRef} className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className="nav-logo" onClick={(e) => handleNavClick(e, '#top')}>
          <img src="/logo_final.png" alt="ru2ya — studio de création numérique" className="nav-logo-img" />
        </a>

        <div className="nav-links">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} ref={menuRef}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="mobile-link"
            onClick={(e) => handleNavClick(e, link.href)}
          >
            {link.label}
          </a>
        ))}
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 5px 32px;
          transition: background 0.3s, box-shadow 0.3s, padding 0.3s;
          background: transparent;
        }

        .navbar.scrolled {
          background: rgba(10, 0, 21, 0.92);
          box-shadow: 0 1px 0 rgba(124, 58, 237, 0.1), 0 4px 24px rgba(0, 0, 0, 0.3);
          padding: 10px 32px;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
        }

        .nav-logo-img {
          height: 80px;
          width: 80px;
          transition: transform 0.6s ease;
        }

        .nav-logo-img:hover {
          transform: rotate(360deg);
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-link {
          text-decoration: none;
          color: var(--gray);
          font-size: 13px;
          padding: 6px 14px;
          border-radius: 999px;
          transition: all 0.2s;
          font-family: var(--font-sans);
          letter-spacing: 0.2px;
        }

        .nav-link:hover {
          color: var(--teal);
          background: rgba(124, 58, 237, 0.08);
        }

        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }

        .hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: var(--white);
          border-radius: 2px;
          transition: all 0.3s;
        }

        .hamburger.open span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.open span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }

        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 999;
          background: rgba(10, 0, 21, 0.97);
          backdrop-filter: blur(20px);
          display: none;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 24px;
        }

        .mobile-menu.open {
          display: flex;
        }

        .mobile-link {
          color: var(--white);
          text-decoration: none;
          font-size: 20px;
          font-weight: 500;
          padding: 12px 24px;
          transition: color 0.2s;
        }

        .mobile-link:hover {
          color: var(--teal);
        }

        @media (max-width: 768px) {
          .navbar {
            padding: 12px 16px;
          }

          .navbar.scrolled {
            padding: 8px 16px;
          }

          .nav-links {
            display: none;
          }

          .hamburger {
            display: flex;
          }

          .nav-logo-img {
            height: 40px;
            width: 40px;
          }
        }
      `}</style>
    </>
  )
}

export default Navbar
