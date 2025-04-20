"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: "How It Works", href: "#workflow", color: "#60a5fa" }, // blue
    { label: "Services", href: "#services", color: "#2dd4bf" }, // teal
    { label: "Demo", href: "#demo", color: "#a78bfa" }, // violet
    { label: "Ethics", href: "#ethics", color: "#f472b6" }, // pink
    { label: "Journey", href: "#journey", color: "#fbbf24" }, // amber
    { label: "Contact", href: "#contact", color: "#818cf8" }, // indigo
  ]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!navRef.current) return

      const rect = navRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const xPercent = Math.floor((x / rect.width) * 100)
      const yPercent = Math.floor((y / rect.height) * 100)

      navRef.current.style.setProperty("--x", `${xPercent}%`)
      navRef.current.style.setProperty("--y", `${yPercent}%`)
    }

    if (navRef.current) {
      navRef.current.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (navRef.current) {
        navRef.current.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Inspirt Labs</h1>
        </div>

        {/* Desktop Navigation */}
        <div ref={navRef} className="hidden md:flex items-center justify-center premium-card p-2 px-4 rounded-full">
          <div className="flex items-center justify-center space-x-8">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors relative group py-2 block text-center"
                onMouseEnter={() => setActiveItem(item.label)}
                onMouseLeave={() => setActiveItem(null)}
              >
                <span>{item.label}</span>
                <span
                  className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                  style={{ background: activeItem === item.label ? item.color : "white" }}
                ></span>
              </a>
            ))}
          </div>
          <a href="#contact" className="primary-button ml-8">
            Get Started
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-md py-4">
          <nav className="flex flex-col space-y-4 px-4">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors py-2 relative group text-left w-full block"
                onClick={() => setIsMenuOpen(false)}
                onMouseEnter={() => setActiveItem(item.label)}
                onMouseLeave={() => setActiveItem(null)}
              >
                <span
                  className="absolute left-0 top-1/2 w-2 h-2 rounded-full transform -translate-y-1/2 transition-all duration-300"
                  style={{
                    background: activeItem === item.label ? item.color : "transparent",
                    opacity: activeItem === item.label ? 1 : 0,
                  }}
                ></span>
                <span className="ml-4">{item.label}</span>
              </a>
            ))}
            <a href="#contact" className="primary-button w-full mt-4 block text-center">
              Get Started
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
