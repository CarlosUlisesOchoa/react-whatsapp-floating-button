import reactLogo from '@/assets/react.svg'
import viteLogo from '@/assets/vite.svg'
import { FloatingWhatsApp } from '@/lib'
import './App.css'

function App() {
  return (
    <>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React + TypeScript</h1>
      <div className='card'>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
      <FloatingWhatsApp
        phoneNumber='5214521027803'
        accountName='Gestoría vehicular'
        // avatar='http://192.168.0.4:3000/assets/images/kenzo-whatsapp-avatar.webp'
        chatMessage='Hola, ¿cómo puedo ayudarle?'
        // darkMode={isDark}
        statusMessage='En línea'
        placeholder='Escriba su mensaje'
        // allowClickAway={true}
        allowEsc={true}
      />
    </>
  )
}

export default App
