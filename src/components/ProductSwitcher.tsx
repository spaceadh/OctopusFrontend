import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import { ChevronsUpDown } from "lucide-react"
import { useAuth } from "@/context/authStore"
import { useNavigate, useLocation } from "react-router-dom"
import toast from "react-hot-toast"

export function ProductSwitcher() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const products = user?.subscriptions?.map((sub) => ({
    name: sub.charAt(0).toUpperCase() + sub.slice(1).toLowerCase(),
    path: `/app/${sub.toLowerCase()}`,
  })) || []

  const currentModule = location.pathname.split('/')[2]
  const currentProduct = products.find(p => p.path.endsWith(currentModule))?.name || 'Select Module'


  const handleSwitch = (path: string) => {
    navigate(path)
    toast.success(`Switched to ${path.split('/').pop()} module`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-56 justify-between">
          {currentProduct}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {products.map((product) => (
          <DropdownMenuItem
            key={product.path}
            onClick={() => handleSwitch(product.path)}
          >
            {product.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
