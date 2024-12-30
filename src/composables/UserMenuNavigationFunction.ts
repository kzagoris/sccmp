import { UserIcon } from "@heroicons/vue/24/outline"
import { ref, computed } from "vue"
import { useRoute } from "vue-router"

export const useUserMenuNavigation = () => {
  const route = useRoute()

  const subNavigation = ref(
    [
      {
        name: "Profile",
        to: "/settings/profile",
        icon: UserIcon,
        current: true,
      },
      // {
      //   name: "Products",
      //   to: "/settings/products",
      //   icon: RectangleStackIcon,
      //   current: false,
      // },
      // {
      //     name: 'Certificates',
      //     to: '/settings/certificates',
      //     icon: BuildingLibraryIcon,
      //     current: false,
      // }
    ].filter((item) => item.name !== "Products"),
  )

  const activeSubNavigation = computed(() =>
    subNavigation.value.map((item) => ({
      ...item,
      current: item.to === route.path,
    })),
  )

  return { activeSubNavigation }
}
