import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Places and Landscapes",
    description: "Geog 1 - Final Requirement",
    keywords: ["geography", "places", "landscapes", "geog 1", "up diliman"],
    authors: [{ name: "Jezzu Morrisen Quimosing", url: "https://j3z.dev" }],
    creator: "Jezzu Morrisen Quimosing",
    openGraph: {
        title: "Places and Landscapes",
        description: "Geog 1 - Final Requirement",
        url: "https://geog.j3z.dev",
        siteName: "Places and Landscapes",
        locale: "en_US",
        type: "website"
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
