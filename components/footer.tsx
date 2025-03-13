import Link from "next/link"
import { Twitter, Linkedin } from "lucide-react"
import { FaDiscord } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col md:flex-row items-center justify-between space-y-4 py-10 md:h-24 md:py-0 md:space-y-0">
        {/* Copyright */}
        <div className="text-sm text-muted-foreground md:w-1/3">
          © 2025 Agio Network. All rights reserved.
        </div>

        {/* Social Media Icons */}
        <div className="flex items-center justify-center space-x-6 md:w-1/3">
          <Link href="https://discord.gg/agionetwork" target="_blank" rel="noreferrer">
            <FaDiscord className="h-6 w-6 text-muted-foreground hover:text-blue-600 transition-colors" />
            <span className="sr-only">Discord</span>
          </Link>
          <Link href="https://twitter.com/agionetwork" target="_blank" rel="noreferrer">
            <Twitter className="h-6 w-6 text-muted-foreground hover:text-blue-600 transition-colors" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="https://linkedin.com/company/agionetwork" target="_blank" rel="noreferrer">
            <Linkedin className="h-6 w-6 text-muted-foreground hover:text-blue-600 transition-colors" />
            <span className="sr-only">LinkedIn</span>
          </Link>
        </div>

        {/* Legal Links */}
        <div className="flex items-center justify-end space-x-4 text-sm text-muted-foreground md:w-1/3">
          <Link href="/terms" className="hover:text-blue-600 transition-colors">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-blue-600 transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
} 