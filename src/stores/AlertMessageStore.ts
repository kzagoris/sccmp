import { defineStore } from "pinia"
import { type Ref, ref } from "vue"

export type AlertMessageType = "success" | "error" | "info" | "warning"
export const useAlertMessageStore = defineStore("alertMessage", () => {
  const alertMessage = ref("")
  const alertMessageType: Ref<AlertMessageType> = ref("success")
  const showAlertMessage = ref(false)

  function setAlertMessage(
    message: string,
    type: AlertMessageType,
    timeout = 5000,
  ) {
    alertMessage.value = message
    alertMessageType.value = type
    showAlertMessage.value = true
    if (timeout === 0) return
    setTimeout(() => {
      showAlertMessage.value = false
    }, timeout)
  }

  return { showAlertMessage, alertMessage, alertMessageType, setAlertMessage }
})
