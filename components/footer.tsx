"use client"

import Link from "next/link"
import Image from "next/image"
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  const footerLinks = [
    {
      title: "Platform",
      links: [
        { name: "Dashboard", href: "/dashboard?tab=overview" },
        { name: "Create Loan", href: "/borrow-lend" },
        { name: "Loan Offers", href: "/loan-offers/marketplace" },
        { name: "Social Finance", href: "/socialfi" },
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Help", href: "/help" },
        { name: "Documentation", href: "/docs" },
        { name: "Guides & Tutorials", href: "/guides" },
      ]
    },
    {
      title: "About",
      links: [
        { name: "About Us", href: "/about" },
        { name: "News", href: "/news" },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "Blog", href: "/blog" },
        { name: "Newsletter", href: "/newsletter" },
        { name: "Events", href: "/events" },
      ]
    }
  ]
  
  return (
    <footer className="relative mt-20 bg-gradient-to-b from-white via-blue-100 to-blue-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 pb-10">
      <div className="container px-4 md:px-6 mx-auto py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          <div className="col-span-2">
            <Link href="/" className="flex items-center space-x-3">
              <Image 
                src="/images/blue-hat.png" 
                alt="Logo" 
                width={40} 
                height={40} 
                className="object-contain" 
              />
              <span className="text-2xl font-bold text-blue-600 dark:text-white">Agio Network</span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xs mt-4">
              A decentralized Social Finance for Borrowers and Lenders. Make money by lending to Friends, Family, and well-known Businesses.
            </p>
          </div>
          
          {footerLinks.map((section, i) => (
            <div key={i}>
              <h3 className="text-sm font-medium uppercase tracking-wider text-blue-600 dark:text-white mb-4">{section.title}</h3>
              <ul className="space-y-2.5">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <Link 
                      href={link.href} 
                      className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white flex items-center group"
                    >
                      {link.name}
                      <ArrowUpRight className="h-3.5 w-3.5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t border-blue-200 dark:border-white/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <p>&copy; {currentYear} Agio Network. All rights reserved.</p>
          </div>
          
          <div className="flex space-x-4">
            <Link
              href="https://x.com/agio_network"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </Link>
            <Link
              href="https://t.me/agio_network"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M21.5 4.5L2.5 10.5L9.5 13.5L14.5 8.5L9.5 13.5L12.5 20.5L21.5 4.5Z" />
              </svg>
            </Link>
            <Link
              href="https://www.linkedin.com/company/agio-network/"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </Link>
            <Link
              href="https://discord.com/invite/EmwdzjC2DM"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M18 6a5 5 0 0 0-5-5H8a5 5 0 0 0-5 5v12a5 5 0 0 0 5 5h5a5 5 0 0 0 5-5V6Z" />
                <path d="M12 8v8" />
                <path d="M8 12h8" />
              </svg>
            </Link>
            <Link
              href="mailto:contact@agionetwork.com"
              className="text-muted-foreground hover:text-foreground"
            >
              <Mail className="h-5 w-5" />
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <Link href="/privacy" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 