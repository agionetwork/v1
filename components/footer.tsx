"use client"

import Link from "next/link"
import Image from "next/image"
import { JSX } from "react"
import { Linkedin, Send } from "lucide-react"
import { FaXTwitter } from "react-icons/fa6"
import { FaDiscord } from "react-icons/fa"
import { useTheme } from "next-themes"

interface FooterLink {
  name: string
  href: string
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

const footerLinks: FooterSection[] = [
  {
    title: "Product",
    links: [
      { name: "Dashboard", href: "/dashboard" },
      { name: "Borrow / Lend", href: "/borrow-lend" },
      { name: "Loan Offers", href: "/loan-offers" },
    ]
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
    ]
  },
  {
    title: "Connect",
    links: [
      { name: "Whitepaper", href: "https://agio-network.gitbook.io/agio-network" },
      { name: "Github", href: "#" },
      { name: "Links", href: "#" },
    ]
  }
]

export default function Footer(): JSX.Element {
  const { theme } = useTheme()
  
  const textColor = theme === 'dark' ? 'text-white' : 'text-black'
  const hoverColor = theme === 'dark' ? 'hover:text-gray-300' : 'hover:text-gray-600'

  return (
    <footer className="w-full py-12 md:py-16 bg-gradient-to-b from-blue-950 via-blue-950 to-blue-700 dark:bg-transparent">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/images/blue-hat.png"
                alt="Blue Hat"
                width={32}
                height={32}
                className="object-contain"
              />
              <span className="text-2xl font-bold text-white">AGIO NETWORK</span>
            </div>
            <p className="text-sm text-gray-300 max-w-xs">
              A decentralized Social Finance for Borrowers and Lenders. Make money by lending to Friends, Family, and well-known Businesses.
            </p>
          </div>
          {footerLinks.map((section) => (
            <div key={section.title} className="flex flex-col pl-16 md:pl-32">
              <h3 className="text-lg font-semibold mb-4 text-white">{section.title}</h3>
              <ul className="space-y-2 w-full">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors"
                      target={link.name === "Whitepaper" ? "_blank" : undefined}
                      rel={link.name === "Whitepaper" ? "noopener noreferrer" : undefined}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200/10">
          <div className="flex flex-col items-center justify-center space-y-8">
            <div className="flex items-center space-x-4">
              <a
                href="https://x.com/agio_network"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/80 transition-colors"
              >
                <FaXTwitter className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/company/agio-network"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/80 transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="https://t.me/agio_network"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/80 transition-colors"
              >
                <Send className="h-6 w-6" />
              </a>
              <a
                href="https://discord.com/invite/EmwdzjC2DM"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/80 transition-colors"
              >
                <FaDiscord className="h-6 w-6" />
              </a>
            </div>
            <p className="text-center text-white text-sm">
              © 2025 Agio Network. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
} 