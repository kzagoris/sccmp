import { AppIdType } from "../vite-env"
import {
  AcademicCapIcon,
  BookOpenIcon,
  RectangleStackIcon,
  GlobeAltIcon,
  HomeIcon,
  ArrowTopRightOnSquareIcon,
  BookmarkSquareIcon,
} from "@heroicons/vue/24/outline"
import type { FunctionalComponent, HTMLAttributes, VNodeProps } from "vue"

type NavigationMenuId =
  | "home"
  | "modules"
  | "courses-material"
  | "sustainable-brands"
  | "handbook"
  | "success-stories"
  | "additional-resources"
  | "training-modules"
  | "debug-website"

const globalNavigationMenu = new Map<AppIdType, NavigationMenuId[]>([
  [
    "debug",
    [
      "home",
      "training-modules",
      "additional-resources",
      "success-stories",
      "sustainable-brands",
      "modules",
      "courses-material",
      "handbook",
      "debug-website",
    ],
  ],
])

const navigation = new Map<NavigationMenuId, NavigationMenuItem>([
  ["home", { name: "menu.Home", to: "/", icon: HomeIcon, current: true }],
  [
    "modules",
    {
      name: "menu.Modules",
      description: "menuDescriptions.modules",
      to: "/modules",
      icon: AcademicCapIcon,
      image: "modules.jpg",
      current: false,
    },
  ],
  [
    "training-modules",
    {
      name: "trainingModules.trainingModules",
      description: "menu.Description",
      to: "/training-modules",
      icon: AcademicCapIcon,
      current: false,
    },
  ],
  [
    "courses-material",
    {
      name: "menu.Courses Materials",
      description: "menu.Description",
      to: "/courses-material",
      image: "courses-material.jpg",
      icon: BookmarkSquareIcon,
      current: false,
    },
  ],
  [
    "handbook",
    {
      name: "menu.Handbook",
      description: "menu.Description",
      to: "/handbook",
      image: "handbook.jpg",
      icon: BookOpenIcon,
      current: false,
    },
  ],
  [
    "additional-resources",
    {
      name: "additionalResources.additionalResources",
      description: "menu.Description",
      to: "/courses-material",
      icon: BookOpenIcon,
      current: false,
    },
  ],
  [
    "sustainable-brands",
    {
      name: "menu.Sustainable Brands",
      description: "menu.Description",
      to: "/sustainable-brands",
      icon: RectangleStackIcon,
      current: false,
    },
  ],
  [
    "success-stories",
    {
      name: "menu.Success Stories",
      description: "menu.Description",
      to: "/success-stories",
      icon: GlobeAltIcon,
      current: false,
    },
  ],
  [
    "debug-website",
    {
      name: "menu.Website",
      description: "menu.Description",
      to: "https://wittyprogramming.dev/",
      icon: ArrowTopRightOnSquareIcon,
      current: false,
      isExternal: true,
    },
  ],
])

export interface NavigationMenuItem {
  name: string
  to: string
  // eslint-disable-next-line @typescript-eslint/ban-types
  icon: FunctionalComponent<HTMLAttributes & VNodeProps, {}>
  description?: string
  image?: string
  current: boolean
  isExternal?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const navigationMenu =
  globalNavigationMenu
    .get(import.meta.env.VITE_APP_ID as AppIdType)
    ?.map((id) => navigation.get(id)!) ?? []
