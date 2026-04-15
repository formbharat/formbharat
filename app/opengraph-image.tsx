import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'FormBharat - Form Builder for Indian Businesses'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <div
          style={{
            width: 160,
            height: 160,
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            borderRadius: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 100,
            fontWeight: 'bold',
            marginBottom: 40,
          }}
        >
          F
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            marginBottom: 20,
          }}
        >
          FormBharat
        </div>
        <div
          style={{
            fontSize: 32,
            opacity: 0.9,
            textAlign: 'center',
            maxWidth: 800,
          }}
        >
          Beautiful Forms for Indian Businesses
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
