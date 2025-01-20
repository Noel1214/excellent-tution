import "./globals.css";
import { Toaster } from "react-hot-toast";
import GlobalStateSetter from "@/components/GlobalStateSetter";
import StoreProvider from "./StoreProvide";

export const metadata = {
  title: "tution app",
  description: "developed by noel",
};

export default function MainLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <GlobalStateSetter>
            <main className="min-h-screen bg-cyan-100 bg-gradient-to-br from-cyan-500 to-blue-200">
              {/* <Navbar /> */}
              {children}
              <Toaster
                position="top-center"
                toastOptions={{
                  className: "bg-yellow-500",
                  duration: 3000,
                  style: {
                    background: "#FFFFFF",
                    color: "#000000",
                    fontWeight: "600",
                  },
                  success: {
                    duration: 3000,
                    theme: {
                      primary: "green",
                      secondary: "black",
                    },
                  },
                }}
              />
            </main>
          </GlobalStateSetter>
        </StoreProvider>
      </body>
    </html>
  );
}
