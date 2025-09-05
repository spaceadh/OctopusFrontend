import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import { ChevronsUpDown } from "lucide-react"
// import { useSubscriptionStore } from "@/store/subscriptionStore"
// import { useNavigate } from "react-router-dom"

export function ProductSwitcher() {
  // const { subscriptions } = useSubscriptionStore()
  // const navigate = useNavigate()

  // TODO: Get product list and current product from a store or context
  const products = [
    { name: "Properties", path: "/properties" },
    { name: "Sacco", path: "/sacco" },
    { name: "Chama", path: "/chama" },
    { name: "Lending", path: "/lending" },
  ]
  const currentProduct = "Properties"

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
            // onClick={() => navigate(product.path)}
            // disabled={!subscriptions.includes(product.name.toUpperCase() as any)}
          >
            {product.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
