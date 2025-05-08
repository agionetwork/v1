"use client"

export default function SocialFiLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto p-6">
      {children}
    </div>
  )
} 