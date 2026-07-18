import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import TerminalSection from './components/TerminalSection'
import PortfolioWebsites from './components/PortfolioWebsites'
import PhotoshopSection from './components/PhotoshopSection'
import PortfolioDesigns from './components/PortfolioDesigns'
import FilmSection from './components/FilmSection'
import TShirtSection from './components/TShirtSection'
import ContactSection from './components/ContactSection'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const wrapperRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    ScrollTrigger.scrollerProxy(contentRef.current, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true })
        }
        return lenis.scroll
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
      pinType: contentRef.current.style.transform ? 'transform' : 'fixed',
    })

    return () => {
      lenis.destroy()
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <>
      <CustomCursor />
      <Navbar />
      <div ref={wrapperRef} id="smooth-wrapper">
        <div ref={contentRef} id="smooth-content">
          <HeroSection />
          <TerminalSection />
          <PortfolioWebsites />
          <PhotoshopSection />
          <PortfolioDesigns />
          <FilmSection />
          <TShirtSection />
          <ContactSection />
        </div>
      </div>
    </>
  )
}

export default App
