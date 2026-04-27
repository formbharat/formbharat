import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const size = {
  width: 32,
  height: 32,
}
 
export const contentType = 'image/png'
 
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#f97316',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '7px',
          flexDirection: 'column',
          gap: 0,
        }}
      >
        {/* Geometric F — vertical bar */}
        <div style={{ position: 'absolute', left: 6, top: 6, width: 5, height: 20, background: 'white', borderRadius: 2 }} />
        {/* Top bar */}
        <div style={{ position: 'absolute', left: 6, top: 6, width: 20, height: 5, background: 'white', borderRadius: 2 }} />
        {/* Middle bar */}
        <div style={{ position: 'absolute', left: 6, top: 15, width: 14, height: 4, background: 'white', borderRadius: 2 }} />
      </div>
    ),
    {
      ...size,
    }
  )
}
