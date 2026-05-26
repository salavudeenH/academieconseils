import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Académie Conseils — Créez, modifiez, cédez votre société en toute simplicité",
  description:
    "Plateforme tout-en-un pour les formalités juridiques des entreprises : création (SARL, SAS, SASU, EURL, SCI), modifications statutaires, cession de parts et fonds de commerce, dissolution. Documents générés instantanément, conformes au droit français.",
  keywords: [
    "création société",
    "SARL", "SAS", "SASU", "EURL", "SCI",
    "modification statuts",
    "cession parts sociales",
    "cession fonds de commerce",
    "dissolution société",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
