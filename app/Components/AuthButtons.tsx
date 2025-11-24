"use client";

import { SignInButton } from "@clerk/nextjs";

export default function AuthButtons() {
  return (
    <div className="flex flex-col gap-4 w-72">
      <SignInButton mode="redirect" redirectUrl="/api/sync">
        <button className="bg-white border py-2 rounded shadow flex gap-2 justify-center">
          <img src="/google.svg" className="h-5" />
          Continue with Google
        </button>
      </SignInButton>

      <SignInButton mode="redirect" redirectUrl="/api/sync">
        <button className="bg-black text-white py-2 rounded flex gap-2 justify-center">
          <img src="/github.svg" className="h-5 invert" />
          Continue with GitHub
        </button>
      </SignInButton>
    </div>
  );
}
