// app/layout.jsx
import "./globals.css";
import Sidebar from "./components/Sidebar";
import Providers from "./components/Providers";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex ">
        <Providers>
          <Sidebar />
          <main
            className="
              w-full min-h-screen p-6
              pt-20 md:pt-6
              md:ml-64
              transition-all duration-300
            "
          >
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
