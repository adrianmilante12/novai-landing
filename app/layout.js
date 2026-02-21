import "./globals.css"

export const metadata = {
  title: "NovaiTemplateCreator — Premium Starter Landing Pages",
  description: "Modern, conversion-focused templates"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
