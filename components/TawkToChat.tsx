'use client'

import { useEffect } from 'react'

export default function TawkToChat() {
  useEffect(() => {
    // Tawk.to Live Chat Integration
    // Free live chat widget - perfect for MVP
    // Sign up at https://www.tawk.to to get your property ID
    
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://embed.tawk.to/YOUR_PROPERTY_ID/YOUR_WIDGET_ID'
    script.charset = 'UTF-8'
    script.setAttribute('crossorigin', '*')
    
    // Add script to document
    document.body.appendChild(script)

    // Cleanup function
    return () => {
      // Remove script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
      
      // Clean up Tawk.to widget
      if ((window as any).Tawk_API) {
        delete (window as any).Tawk_API
      }
    }
  }, [])

  return null
}

// Instructions to set up:
// 1. Go to https://www.tawk.to
// 2. Sign up for free account
// 3. Create a new property for "FormBharat"
// 4. Get your Property ID and Widget ID from Admin panel
// 5. Replace YOUR_PROPERTY_ID and YOUR_WIDGET_ID above
// 6. Chat widget will appear on bottom-right of all pages
// 7. Configure chat widget appearance in Tawk.to dashboard
// 8. Add team members to respond to chats
