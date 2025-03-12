import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Settings2 } from "lucide-react"
import { GB, BR } from 'country-flag-icons/react/3x2'

export function SettingsDialog() {
  const [customRPC, setCustomRPC] = useState("")
  const [selectedRPC, setSelectedRPC] = useState("triton1")

  const handleSaveCustomRPC = () => {
    if (customRPC) {
      // Salvar o RPC customizado
      console.log("Custom RPC saved:", customRPC)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white">
          <Settings2 className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-blue-600 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Language</Label>
            <Select defaultValue="en">
              <SelectTrigger className="bg-blue-700 border-blue-500 text-white">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent className="bg-blue-700 border-blue-500">
                <SelectItem value="en" className="text-white">
                  <div className="flex items-center gap-2">
                    <GB className="h-4 w-6" />
                    English
                  </div>
                </SelectItem>
                <SelectItem value="pt" className="text-white">
                  <div className="flex items-center gap-2">
                    <BR className="h-4 w-6" />
                    Português
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Preferred Explorer</Label>
            <Select defaultValue="solscan">
              <SelectTrigger className="bg-blue-700 border-blue-500 text-white">
                <SelectValue placeholder="Select explorer" />
              </SelectTrigger>
              <SelectContent className="bg-blue-700 border-blue-500">
                <SelectItem value="solscan" className="text-white">Solscan</SelectItem>
                <SelectItem value="solanabeach" className="text-white">Solana Beach</SelectItem>
                <SelectItem value="explorer" className="text-white">Solana Explorer</SelectItem>
                <SelectItem value="solanafm" className="text-white">SolanaFM</SelectItem>
                <SelectItem value="xray" className="text-white">XRAY</SelectItem>
                <SelectItem value="oklink" className="text-white">OKLINK</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator className="bg-white/20" />

          <div className="space-y-4">
            <Label>RPC Endpoint</Label>
            <RadioGroup
              value={selectedRPC}
              onValueChange={setSelectedRPC}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="triton1" id="triton1" className="border-white text-white" />
                <Label htmlFor="triton1">Triton RPC Pool 1</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="helius1" id="helius1" className="border-white text-white" />
                <Label htmlFor="helius1">Helius RPC 1</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="triton2" id="triton2" className="border-white text-white" />
                <Label htmlFor="triton2">Triton RPC Pool 2</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="custom" className="border-white text-white" />
                <Label htmlFor="custom">Custom</Label>
              </div>
            </RadioGroup>

            {selectedRPC === "custom" && (
              <div className="space-y-2">
                <Input
                  placeholder="Custom RPC URL"
                  value={customRPC}
                  onChange={(e) => setCustomRPC(e.target.value)}
                  className="bg-blue-700 border-blue-500 text-white placeholder:text-white/70"
                />
                <Button
                  onClick={handleSaveCustomRPC}
                  className="w-full bg-white text-blue-600 hover:bg-white/90"
                >
                  Save
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 