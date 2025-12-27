import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";

export const metadata = {
  title: "AI Coding Practice",
  description: "Solve coding problems with voice-based AI coaching.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="transition-colors duration-500 min-h-screen bg-white dark:bg-black text-black dark:text-white">
        <ThemeProvider>
          <div >{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
