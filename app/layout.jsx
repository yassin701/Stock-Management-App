import './globals.css';
import Sidebar from './components/Sidebar'



export default function RoutLayout({ children }) {

  return (
    <html lang="en">
      <body className='flex'>
        <Sidebar />
        <main className="ml-64 w-full min-h-screen p-6">
            {children}
        
        </main>
      </body>
    </html>
  );

}
