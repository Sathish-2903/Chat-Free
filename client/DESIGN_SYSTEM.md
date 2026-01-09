# Design System & Color Guide

## 🎨 Color Palette

### Light Mode
```
Background:   White (#FFFFFF)
Text:         Black (#000000)
Border:       Light Gray (#E5E7EB - gray-200)
Accent:       Dark Gray (#F3F4F6 - gray-50)
Hover:        Light Gray (#F9FAFB)
```

### Dark Mode
```
Background:   Black (#000000)
Text:         White (#FFFFFF)
Border:       Dark Gray (#1F2937 - gray-800)
Accent:       Very Dark Gray (#111827 - gray-900)
Hover:        Dark Gray (#1F2937)
Secondary:    Gray (#4B5563)
```

## 🎯 Component Colors

### Buttons

#### Primary (Black/White)
```
Light Mode:
  Background: Black (#000000)
  Text: White
  Hover: Dark Gray (#1F2937)

Dark Mode:
  Background: White (#FFFFFF)
  Text: Black
  Hover: Light Gray (#E5E7EB)
```

#### Secondary (Border)
```
Border: 2px solid (color mode dependent)
Background: Transparent
Text: Mode-dependent
Hover: Light/Dark Gray background
```

### Input Fields
```
Background: Gray (#F3F4F6 in light, #111827 in dark)
Border: 1px gray-200/gray-800
Focus: 2px ring (black in light, white in dark)
Text: Mode-dependent
Placeholder: Gray (#9CA3AF)
```

### Messages

#### User Messages
```
Background: Black (light mode) / White (dark mode)
Text: White (light mode) / Black (dark mode)
Border: Rounded with right angle (rounded-br-none)
Alignment: Right side
```

#### Bot Messages
```
Background: Light Gray (#F3F4F6) / Dark Gray (#111827)
Text: Black (light mode) / White (dark mode)
Border: Rounded with left angle (rounded-bl-none)
Alignment: Left side
Timestamp: Gray text
```

## 🔤 Typography

### Font Family
```
Font: "Outfit" (Google Fonts)
Fallback: Sans-serif
Weights: 100-900
```

### Font Sizes
```
h1:   2.25rem (36px) - font-bold
h2:   1.875rem (30px) - font-bold
h3:   1.125rem (18px) - font-bold
body: 1rem (16px)
sm:   0.875rem (14px)
xs:   0.75rem (12px)
```

### Font Weights
```
Regular:    font-normal (400)
Medium:     font-medium (500)
Semibold:   font-semibold (600)
Bold:       font-bold (700)
```

## 📐 Spacing System

### Padding
```
xs: 0.75rem (12px)
sm: 1rem (16px)
md: 1.5rem (24px)
lg: 2rem (32px)
```

### Gaps
```
2:  0.5rem (8px)
3:  0.75rem (12px)
4:  1rem (16px)
6:  1.5rem (24px)
```

## 🪟 Border Styles

### Border Widths
```
Default: 1px
Thick:   2px
```

### Border Radius
```
Default: 0.5rem (8px)
Large:   1rem (16px)
Full:    9999px (rounded pill)
```

## 🎬 Animations

### Transitions
```
Duration: 150ms-500ms
Easing: ease, ease-in-out
Properties: colors, shadows, transforms
```

### Loading Animation
```
Keyframe: Bounce (opacity 0.5 to 1)
Duration: 1.4s
Iteration: infinite
Stagger: 0.2s between dots
```

### Scroll Bar Styling
```
Width: 8px
Track: Transparent
Thumb (Light): Gray (#D1D5DB)
Thumb (Dark): Gray (#4B5563)
Hover: Darker Gray
```

## 💫 Hover Effects

### Buttons
```
- Background color change
- Slight scale or shadow effect
- Disabled: opacity 50%, cursor not-allowed
```

### Cards
```
- Subtle shadow in light mode
- Shadow in dark mode
- Transition: 300ms
```

### Links
```
- Underline on hover
- Color change
- No decoration by default
```

## 📱 Responsive Design

### Breakpoints
```
sm:  640px   (Mobile)
md:  768px   (Tablet)
lg:  1024px  (Large Tablet/Desktop)
xl:  1280px  (Desktop)
2xl: 1536px  (Large Desktop)
```

### Layout Patterns
```
Mobile:  Single column, stacked
Tablet:  2 columns, responsive
Desktop: Multi-column, full width
```

## ♿ Accessibility

### Contrast Ratios
```
Text on Background:    4.5:1 (WCAG AA)
Large Text:            3:1 (WCAG AA)
Visual Elements:       3:1 (WCAG AA)
```

### Focus States
```
Ring: 2px solid (mode-dependent color)
Offset: None
Visible: Always
```

### Keyboard Navigation
```
Tab order: Logical flow
Focus visible: Clear ring
Skip links: Available
```

## 🎨 Visual Examples

### Sidebar
```
┌─────────────────┐
│ AI Assistant    │
├─────────────────┤
│ [New Chat Btn]  │
├─────────────────┤
│ [Search Input]  │
├─────────────────┤
│ Chat History    │
│ - Chat 1        │
│ - Chat 2        │
│ - Chat 3        │
├─────────────────┤
│ [Theme Toggle]  │
│ [Community]     │
│ [Credits]       │
└─────────────────┘
```

### Chat Message
```
Light Mode (User Message):
┌─────────────────────────┐
│                         │
│     Black background    │
│     White text          │
│     10:30 AM            │
│                         │
└─────────────────────────┘

Light Mode (Bot Message):
┌─────────────────────────┐
│                         │
│ Light gray background   │
│ Black text              │
│ 10:31 AM                │
│                         │
└─────────────────────────┘
```

### Input Area
```
┌─────────────────────────────────────────────┐
│ Type your message here...                   │[Send] │
└─────────────────────────────────────────────┘
```

## 🔄 Mode Switching

### Dark Mode CSS Class
```
html.dark {
  /* Dark mode styles applied */
}
```

### Transition
```
Duration: 300ms
Properties: background-color, color
Easing: ease
```

## 🧪 Testing Colors

### Light Mode RGB Values
```
White:      rgb(255, 255, 255)
Black:      rgb(0, 0, 0)
Gray-50:    rgb(249, 250, 251)
Gray-100:   rgb(243, 244, 246)
Gray-200:   rgb(229, 231, 235)
```

### Dark Mode RGB Values
```
Black:      rgb(0, 0, 0)
White:      rgb(255, 255, 255)
Gray-800:   rgb(31, 41, 55)
Gray-900:   rgb(17, 19, 27)
```

## 🎯 Best Practices

1. **Always provide proper contrast**
   - Text should be easily readable
   - Follow WCAG AA guidelines

2. **Consistent spacing**
   - Use multiples of 4px/8px
   - Maintain visual hierarchy

3. **Clear focus states**
   - Always visible for keyboard users
   - Use consistent styling

4. **Responsive images**
   - Use appropriate breakpoints
   - Scale gracefully

5. **Dark mode consideration**
   - Test in both modes
   - Ensure all elements visible

## 📋 Color Checklist

- [x] Black and white primary colors
- [x] Gray accent colors defined
- [x] Hover states defined
- [x] Border colors defined
- [x] Text colors defined
- [x] Input styling complete
- [x] Button variants defined
- [x] Message styling complete
- [x] Focus states defined
- [x] Dark mode implemented

---

**Color System Version**: 1.0.0
**Last Updated**: January 2024
**Framework**: Tailwind CSS 4.1.12
