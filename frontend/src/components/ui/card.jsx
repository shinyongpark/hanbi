import * as React from "react"

export function Card({ className = "", ...props }) {
  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white shadow-md ${className}`}
      {...props}
    />
  )
}

export const CardContent = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <div ref={ref} className={`p-6 ${className}`} {...props} />
  )
})

CardContent.displayName = "CardContent"
