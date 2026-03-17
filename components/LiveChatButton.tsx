'use client'

import { MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface LiveChatButtonProps {
  variant?: 'default' | 'outline' | 'ghost'
  className?: string
  children?: React.ReactNode
}

export default function LiveChatButton({ 
  variant = 'outline', 
  className = '',
  children 
}: LiveChatButtonProps) {
  const handleChatClick = () => {
    // Check if Tawk.to is loaded
    if (typeof window !== 'undefined' && (window as any).Tawk_API) {
      // Maximize (open) the chat widget
      (window as any).Tawk_API.maximize()
    } else {
      // Fallback: redirect to contact page if chat not loaded
      window.location.href = '/contact'
    }
  }

  return (
    <Button 
      variant={variant} 
      className={className}
      onClick={handleChatClick}
    >
      {children || (
        <>
          <MessageSquare className="mr-2 h-4 w-4" />
          Start Chat
        </>
      )}
    </Button>
  )
}
