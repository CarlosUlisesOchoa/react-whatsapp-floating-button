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
        phoneNumber='5215540000000' // Required
        accountName='Carlos Ochoa' // Optional
        initialMessageByServer='Hi there!, how can I assist you?' // Optional
        statusMessage='Available' // Optional
        placeholder='Write here...' // Optional
        allowEsc={true} // Optional
        // You can find the complete list of props in the README.md file
      />
    </>
  )
}

export default App
