import { collection, doc, limit, query, where } from "firebase/firestore"
import { computed, Ref } from "vue"
import { useCollection, useDocument, useFirestore } from "vuefire"
import { Profile } from "../models/Profile"

export const useProfile = () => {
  const db = useFirestore()

  const getAllProfiles = () => {
    const profilesRef = collection(db, "profiles")
    return useCollection<Profile>(profilesRef)
  }

  const queryProfilesBy = (
    attributeName: "firstName" | "lastName",
    name: Ref<string>,
    limitProfiles: number = 10,
  ) => {
    const profilesRef = collection(db, "profiles")
    const profileQuery = computed(() =>
      query(
        profilesRef,
        where(attributeName, ">=", name.value),
        where(attributeName, "<=", name.value + "~"),
        limit(limitProfiles),
      ),
    )
    return useCollection<Profile>(profileQuery)
  }

  const queryProfilesByFirstName = (
    firstName: Ref<string>,
    limitProfiles: number = 10,
  ) => {
    return queryProfilesBy("firstName", firstName, limitProfiles)
  }
  const queryProfilesByLastName = (
    lastName: Ref<string>,
    limitProfiles: number = 10,
  ) => {
    return queryProfilesBy("lastName", lastName, limitProfiles)
  }

  const queryProfiles = (name: Ref<string>, limitProfiles: number = 5) => {
    const firstNameQuery = queryProfilesByFirstName(name, limitProfiles)
    const lastNameQuery = queryProfilesByLastName(name, limitProfiles)
    return computed(() => {
      const array = [...firstNameQuery.value]
      for (let index = 0; index < lastNameQuery.value.length; index++) {
        const person = lastNameQuery.value[index]
        if (!array.find((p) => p.id === person.id)) array.push(person)
      }
      return array
    })
  }

  const getProfile = (id: Ref<string | null>) => {
    const profileRef = computed(() =>
      id.value ? doc(db, "profiles", id.value) : null,
    )
    return useDocument<Profile>(profileRef)
  }

  return { queryProfiles, getProfile, getAllProfiles }
}
