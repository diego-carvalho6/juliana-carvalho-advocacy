"use client"

import type React from "react"
import { forwardRef, useEffect, useState } from "react"
import { Input, type InputProps } from "@/components/ui/input"

interface InputMaskProps extends Omit<InputProps, "onChange"> {
  mask: string
  onChange?: (value: string) => void
}

const InputMask = forwardRef<HTMLInputElement, InputMaskProps>(({ mask, value, onChange, ...props }, ref) => {
  const [inputValue, setInputValue] = useState(value || "")

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value as string)
    }
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const unmaskedValue = value.replace(/[^\d]/g, "")

    let maskedValue = ""
    let unmaskedIndex = 0

    for (let i = 0; i < mask.length; i++) {
      if (unmaskedIndex >= unmaskedValue.length) break

      if (mask[i] === "#") {
        maskedValue += unmaskedValue[unmaskedIndex]
        unmaskedIndex++
      } else {
        maskedValue += mask[i]
      }
    }

    setInputValue(maskedValue)
    onChange?.(maskedValue)
  }

  return <Input ref={ref} value={inputValue} onChange={handleChange} {...props} />
})

InputMask.displayName = "InputMask"

export { InputMask }
