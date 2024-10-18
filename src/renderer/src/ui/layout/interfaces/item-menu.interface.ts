import { ModeAppType } from "@renderer/ui/hooks/useApp"

export interface ItemMenu {
  icon: string
  title: string
  link: string
  modesApp: ModeAppType[]
}
