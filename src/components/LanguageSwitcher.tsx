import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  // TODO: Implement i18n logic
  // const { i18n } = useTranslation()
  // const setLanguage = (lang: string) => i18n.changeLanguage(lang)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => console.log('set lang to en')}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log('set lang to sw')}>
          Swahili
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log('set lang to fr')}>
          French
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
