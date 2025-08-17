"use client"

import { useState } from "react"

interface ContactDialogConfig {
  title?: string
  description?: string
}

export function useContactDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [config, setConfig] = useState<ContactDialogConfig>({})

  const openDialog = (dialogConfig?: ContactDialogConfig) => {
    if (dialogConfig) {
      setConfig(dialogConfig)
    }
    setIsOpen(true)
  }

  const closeDialog = () => {
    setIsOpen(false)
    setConfig({})
  }

  return {
    isOpen,
    config,
    openDialog,
    closeDialog,
  }
}
