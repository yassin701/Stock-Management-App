"use client"; // IMPORTANT: must be at the top

import './globals.css';
import Sidebar from './components/Sidebar';
import { Provider } from 'react-redux';
import { store } from './Store/store'; // make sure this path is correct

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='flex'>
        <Provider store={store}>
          <Sidebar />
          <main className="ml-64 w-full min-h-screen p-6">
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
