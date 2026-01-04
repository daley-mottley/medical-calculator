import * as React from "react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const TEXT_LIKE_INPUTS = [
  "text",
  "search",
  "email",
  "password",
  "url",
  "tel",
  "number",
]

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, value, onChange, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    React.useImperativeHandle(ref, () => inputRef.current!)

    const [hasValue, setHasValue] = React.useState(
      Boolean(value || props.defaultValue)
    )

    React.useEffect(() => {
      if (value !== undefined) {
        setHasValue(Boolean(value))
      }
    }, [value])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(Boolean(e.target.value))
      if (onChange) {
        onChange(e)
      }
    }

    const handleClear = () => {
      const input = inputRef.current
      if (input) {
        // This is a "magic" way to clear a controlled React input.
        // Directly setting input.value = "" and then calling onChange()
        // doesn't work reliably with libraries like react-hook-form.
        // Instead, we get the native setter for the 'value' property,
        // call it to update the input's value, and then dispatch
        // a new 'input' event to notify React of the change.
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value"
        )?.set
        nativeInputValueSetter?.call(input, "")

        const event = new Event("input", { bubbles: true })
        input.dispatchEvent(event)
        input.focus()
      }
    }

    const isTextLike = type ? TEXT_LIKE_INPUTS.includes(type) : true

    return (
      <div className="relative flex w-full items-center">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-medical-primary bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-primary focus-visible:ring-offset-2 focus:border-medical-primary transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            hasValue && isTextLike && "pr-10",
            className
          )}
          ref={inputRef}
          value={value}
          onChange={handleChange}
          {...props}
        />
        {hasValue && isTextLike && (
          <button
            type="button"
            aria-label="Clear input"
            onClick={handleClear}
            className="absolute right-0 mr-3 p-1 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
