"use client";
import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import { Button } from "~/components/ui/button";
import { UserCircle2, Settings } from "lucide-react";
import EditProfileForm from "~/components/editProfile";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
          <header className="flex h-16 items-center justify-end gap-4 p-4">
            <SignedOut>
              <SignInButton>
                <Button variant="outline" className="flex items-center gap-2">
                  <UserCircle2 className="h-4 w-4" />
                  Sign in
                </Button>
              </SignInButton>
              <SignUpButton forceRedirectUrl={"sign-up"}>
                <Button className="flex items-center gap-2">
                  <UserCircle2 className="h-4 w-4" />
                  Sign up
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton>
                <UserButton.UserProfilePage
                  label="Additional Settings"
                  url="additional-settings"
                  labelIcon={<Settings className="h-4 w-4" />}
                >
                  <EditProfileForm />
                </UserButton.UserProfilePage>
              </UserButton>
            </SignedIn>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
