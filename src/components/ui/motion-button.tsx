'use client'

import { FC } from 'react'
import { ArrowRight } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
function cn(...inputs: any[]) { return twMerge(clsx(inputs)) }

interface Props {
  label: string
  classes?: string
  onClick?: () => void
}

const MotionButton: FC<Props> = ({ label, classes, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative flex h-14 items-center justify-start overflow-hidden rounded-full bg-background p-1 pr-6 transition-all duration-500 hover:pr-8',
        classes
      )}
    >
      <div className="absolute left-1 h-12 w-12 rounded-full bg-foreground transition-all duration-500 ease-in-out group-hover:w-[calc(100%-8px)]" />
      
      <div className="relative z-10 flex items-center gap-4 pl-3">
        <div className="flex h-12 w-6 items-center justify-center">
          <ArrowRight className="h-5 w-5 text-background transition-transform duration-500 group-hover:translate-x-1" />
        </div>
        <span className="whitespace-nowrap text-lg font-medium tracking-tight text-foreground transition-colors duration-500 group-hover:text-background">
          {label}
        </span>
      </div>
    </button>
  )
}

export default MotionButton
