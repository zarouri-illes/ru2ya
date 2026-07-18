import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

function CustomCursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)

  useEffect(() => {
    const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice()) return

    const cursor = cursorRef.current
    const follower = followerRef.current

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0,
      })
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: 'power3.out',
      })
    }

    const updateCursorStyle = () => {
      const sections = document.querySelectorAll('[data-cursor]')
      let activeCursor = 'default'

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        ) {
          activeCursor = section.dataset.cursor
        }
      })

      cursor.dataset.type = activeCursor
    }

    document.addEventListener('mousemove', moveCursor)
    window.addEventListener('scroll', updateCursorStyle)
    window.addEventListener('resize', updateCursorStyle)
    updateCursorStyle()

    return () => {
      document.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('scroll', updateCursorStyle)
      window.removeEventListener('resize', updateCursorStyle)
    }
  }, [])

  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) return null

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" data-type="default" />
      <div ref={followerRef} className="custom-cursor-follower" />
      <style>{`
        .custom-cursor {
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          width: 8px;
          height: 8px;
          background: var(--teal);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          will-change: transform;
          transition: background 0.3s, width 0.3s, height 0.3s, border-radius 0.3s;
          mix-blend-mode: difference;
        }
        .custom-cursor-follower {
          position: fixed;
          pointer-events: none;
          z-index: 9998;
          width: 32px;
          height: 32px;
          border: 1.5px solid var(--cyan);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          will-change: transform;
          transition: border-color 0.3s, width 0.3s, height 0.3s, background 0.3s;
        }
        .custom-cursor[data-type="photoshop"] {
          width: 24px;
          height: 24px;
          background: transparent;
          border: 2px solid var(--cyan);
          border-radius: 2px;
          mix-blend-mode: normal;
        }
        .custom-cursor[data-type="photoshop"]::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 4px;
          height: 4px;
          background: var(--cyan);
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }
        .custom-cursor-follower[data-type="hidden"] {
          opacity: 0;
        }
        .custom-cursor[data-type="brush"] {
          width: 20px;
          height: 20px;
          background: var(--teal);
          border-radius: 50%;
          mix-blend-mode: normal;
          opacity: 0.6;
        }
        .custom-cursor[data-type="eyedropper"] {
          width: 16px;
          height: 24px;
          background: transparent;
          border: 2px solid var(--teal);
          border-radius: 2px;
          mix-blend-mode: normal;
        }
        @media (max-width: 1024px) {
          .custom-cursor,
          .custom-cursor-follower {
            display: none !important;
          }
        }
      `}</style>
    </>
  )
}

export default CustomCursor
