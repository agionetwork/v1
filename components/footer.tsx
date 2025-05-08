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
<<<<<<< HEAD
        { name: "Loan Offers", href: "/borrow-lend" },
=======
        { name: "Loan Offers", href: "/loan-offers/marketplace" },
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
        { name: "Social Finance", href: "/socialfi" },
      ]
    },
    {
      title: "Resources",
      links: [
<<<<<<< HEAD
        { name: "Help", href: "#" },
        { name: "Documentation", href: "#" },
        { name: "Guides & Tutorials", href: "#" },
=======
        { name: "Help", href: "/help" },
        { name: "Documentation", href: "/docs" },
        { name: "Guides & Tutorials", href: "/guides" },
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
      ]
    },
    {
      title: "About",
      links: [
<<<<<<< HEAD
        { name: "About Us", href: "#" },
        { name: "News", href: "#" },
=======
        { name: "About Us", href: "/about" },
        { name: "News", href: "/news" },
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
      ]
    },
    {
      title: "Company",
      links: [
<<<<<<< HEAD
        { name: "Blog", href: "#" },
        { name: "Newsletter", href: "#" },
        { name: "Events", href: "#" },
=======
        { name: "Blog", href: "/blog" },
        { name: "Newsletter", href: "/newsletter" },
        { name: "Events", href: "/events" },
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
      ]
    }
  ]
  
  return (
<<<<<<< HEAD
    <footer className="w-full text-white dark:text-gray-200 backdrop-blur-sm">
      <div className="container px-4 md:px-6 mx-auto py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          <div className="col-span-2">
            <div className="flex items-center space-x-3">
=======
    <footer className="relative mt-20 bg-gradient-to-b from-white via-blue-100 to-blue-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 pb-10">
      <div className="container px-4 md:px-6 mx-auto py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          <div className="col-span-2">
            <Link href="/" className="flex items-center space-x-3">
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
              <Image 
                src="/images/blue-hat.png" 
                alt="Logo" 
                width={40} 
                height={40} 
                className="object-contain" 
              />
              <span className="text-2xl font-bold text-blue-600 dark:text-white">Agio Network</span>
<<<<<<< HEAD
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xs mt-4">
              A decentralized Social Finance for Borrowers and Lenders. Make money by lending to Friends, Family, and well-known Businesses.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-blue-600 dark:text-white mb-4">{footerLinks[0].title}</h3>
            <ul className="space-y-2.5">
              {footerLinks[0].links.map((link, j) => (
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
          
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-blue-600 dark:text-white mb-4">{footerLinks[1].title}</h3>
            <ul className="space-y-2.5">
              {footerLinks[1].links.map((link, j) => (
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
          
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-blue-600 dark:text-white mb-4">{footerLinks[2].title}</h3>
            <ul className="space-y-2.5">
              {footerLinks[2].links.map((link, j) => (
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
          
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-blue-600 dark:text-white mb-4">{footerLinks[3].title}</h3>
            <ul className="space-y-2.5">
              {footerLinks[3].links.map((link, j) => (
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
=======
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xs mt-4">
              A P2P lending platform with a reputation system on the Solana blockchain. Get better loan terms based on your on-chain history.
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
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
        </div>
        
        <div className="mt-12 pt-8 border-t border-blue-200 dark:border-white/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <p>&copy; {currentYear} Agio Network. All rights reserved.</p>
          </div>
          
          <div className="flex space-x-4">
<<<<<<< HEAD
            {/* X (Twitter) logo */}
            <Link href="#" className="text-white hover:text-white/80 transition-colors">
=======
            <Link href="https://twitter.com/AgioNetwork" target="_blank" className="text-white hover:text-white/80 transition-colors">
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M16.99 0H20.298L13.071 8.26L21.573 19.5H14.916L9.702 12.683L3.736 19.5H0.426L8.156 10.665L0 0H6.826L11.539 6.231L16.99 0ZM15.829 17.52H17.662L5.83 1.876H3.863L15.829 17.52Z"></path>
              </svg>
              <span className="sr-only">X (Twitter)</span>
            </Link>
<<<<<<< HEAD
            {/* Telegram logo */}
            <Link href="#" className="text-white hover:text-white/80 transition-colors">
=======
            <Link href="https://t.me/AgioNetwork" target="_blank" className="text-white hover:text-white/80 transition-colors">
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M22 3L2 10L10 12L12 20L22 3Z" />
              </svg>
              <span className="sr-only">Telegram</span>
            </Link>
<<<<<<< HEAD
            {/* Discord logo */}
            <Link href="#" className="text-white hover:text-white/80 transition-colors">
=======
            <Link href="https://discord.gg/AgioNetwork" target="_blank" className="text-white hover:text-white/80 transition-colors">
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 127.14 96.36" fill="currentColor" className="h-5 w-5">
                <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
              </svg>
              <span className="sr-only">Discord</span>
            </Link>
<<<<<<< HEAD
            {/* LinkedIn logo */}
            <Link href="#" className="text-white hover:text-white/80 transition-colors">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            {/* Github logo */}
            <Link href="#" className="text-white hover:text-white/80 transition-colors">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="#" className="text-white hover:text-white/80 transition-colors">
=======
            <Link href="https://www.linkedin.com/company/AgioNetwork" target="_blank" className="text-white hover:text-white/80 transition-colors">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="https://github.com/AgioNetwork" target="_blank" className="text-white hover:text-white/80 transition-colors">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="mailto:contact@agionetwork.com" className="text-white hover:text-white/80 transition-colors">
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
<<<<<<< HEAD
            <Link href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white transition-colors">Terms of Service</Link>
=======
            <Link href="/privacy" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white transition-colors">Terms of Service</Link>
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
          </div>
        </div>
      </div>
    </footer>
  )
} 