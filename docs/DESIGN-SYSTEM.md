# FormBharat Design System

## Border Radius Standards

We use a consistent, modern border radius system across all components:

### Component Hierarchy

| Component | Border Radius | Tailwind Class | Use Case |
|-----------|---------------|----------------|----------|
| **Cards** | 16px | `rounded-2xl` | Main content containers, feature cards, template cards |
| **Dialogs/Modals** | 16px | `rounded-2xl` | Modal windows, popups |
| **Buttons (Default & Large)** | 12px | `rounded-xl` | Primary actions, CTAs |
| **Buttons (Small)** | 8px | `rounded-lg` | Secondary actions, compact buttons |
| **Form Inputs** | 8px | `rounded-lg` | Text inputs, email fields, phone inputs |
| **Textareas** | 8px | `rounded-lg` | Multi-line text input |
| **Select Dropdowns** | 8px | `rounded-lg` | Dropdown triggers and content |

### Visual Hierarchy

```
Cards & Dialogs (Largest)
    ↓ rounded-2xl (16px)
    
Buttons (Medium-Large)
    ↓ rounded-xl (12px)
    
Form Elements (Medium)
    ↓ rounded-lg (8px)
```

## Spacing & Layout

- **Card Padding**: `p-6` (24px)
- **Card Gaps**: `gap-4` to `gap-8` depending on density
- **Container Max Width**: `max-w-6xl` for content sections

## Interactive States

### Cards
- Base: `shadow-sm`
- Hover: `hover:shadow-md`
- Transition: `transition-all`

### Buttons
- Smooth transitions with `transition-colors`
- Focus ring with `focus-visible:ring-2`

### Form Elements
- Focus state: `focus-visible:ring-2 focus-visible:ring-ring`
- Consistent height: `h-10` (40px)

## Icons

- Feature icons: `w-12 h-12` with `rounded-lg` background
- Use case icons: `w-16 h-16` with `rounded-2xl` background
- Lucide React icons for consistency

## Color System

### Backgrounds
- Cards: `bg-card` (white/light)
- Feature icons: Contextual colors (`bg-orange-100`, `bg-blue-100`, etc.)

### Borders
- Cards: `border` (subtle gray)
- Hover states: `border-orange-200` for accent

## Typography

- **Headings**: Bold, gradient text for main titles
- **Descriptions**: `text-muted-foreground` for secondary text
- **Card Titles**: `text-2xl font-semibold`
- **Card Descriptions**: `text-sm text-muted-foreground`

---

**Last Updated**: April 15, 2026  
**Maintained by**: FormBharat Team
