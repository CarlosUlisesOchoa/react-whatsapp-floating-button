# ⚛️⚡ WhatsApp Floating Button Component (React)

## Description

A simple and customizable component to add a WhatsApp floating button to your React app.

## Getting Started

You can install this package using npm:

```bash
npm install @carlos8a/react-whatsapp-floating-button
```

## Usage

```jsx
import { FloatingWhatsApp } from '@carlos8a/react-whatsapp-floating-button'

const App = () => {
  return (
    <div>
      <FloatingWhatsApp
        phoneNumber='5215540000000'
        accountName='Carlos Ochoa'
        chatMessage='Hola, ¿cómo puedo ayudarle?'
        statusMessage='En línea'
        placeholder='Escriba su mensaje'
        allowEsc={true}
      />
    </div>
  )
}

export default App
```

## License

[MIT](LICENSE)
