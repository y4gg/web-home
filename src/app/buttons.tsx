"use client"
import { useSession } from "next-auth/react";

export default function Buttons() {
  const { data: session } = useSession();
  return (
    <div>
      <p>Signed in as {session?.user?.email}</p>
    </div>
  );
}