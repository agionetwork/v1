import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LoanOffers() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Loan Offers</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Create Loan Offer</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Create a new loan offer with your terms and conditions.
          </p>
          <Link href="/borrow-lend">
            <Button className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600">
              Create Offer
            </Button>
          </Link>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Browse Marketplace</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Find and compare loan offers from other users.
          </p>
          <Link href="/loan-offers/marketplace">
            <Button className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600">
              View Marketplace
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Your Dashboard</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Manage your active loans and offers.
        </p>
        <Link href="/dashboard">
          <Button className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600">
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
} 