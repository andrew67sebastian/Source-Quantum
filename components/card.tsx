import React from 'react'

export default function Card({
  title = 'Card Title',
  description = "Card content goes here. This is a placeholder for the card's description.",
}: {
  title?: string
  description?: string
}) {
  return (
    <div className="bg-background/50 backdrop-blur-sm border border-border rounded-lg p-6 relative">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-pink-400 to-transparent shadow-[0_0_8px_rgba(244,114,182,0.6)]" />
      <h2 className="text-2xl md:text-3xl font-semibold mb-4 mt-2">{title}</h2>
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-400/70 to-transparent mb-4 shadow-[0_0_4px_rgba(244,114,182,0.4)]" />
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
