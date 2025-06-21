"use client";
import { useState } from "react";
import { CreateHome } from "@/components/CreateHome";
import { HomeTable } from "@/components/HomeTable";
import { More } from "@/components/More";

interface Home {
  id: string;
  name: string;
  location: string;
  dimension: string;
}

export function DashboardClient({
  initialHomes,
  userEmail,
  user,
  maxHomes,
}: {
  initialHomes: Home[];
  userEmail: string;
  user: string;
  maxHomes: number;
}) {
  const [homes, setHomes] = useState<Home[]>(initialHomes);

  const handleHomeCreated = (newHome: Home) => {
    setHomes([newHome, ...homes]);
  };

  const handleHomeDeleted = (homeId: string) => {
    setHomes(homes.filter((home) => home.id !== homeId));
  };

  const disabled = homes.length >= maxHomes;

  return (
    <>
      <div className="flex flex-row gap-4 mt-6">
        <CreateHome userEmail={userEmail} onHomeCreated={handleHomeCreated} disabled={disabled} />
        <More user={user} />
      </div>
      <HomeTable
        homes={homes}
        userEmail={userEmail}
        onHomeDeleted={handleHomeDeleted}
      />
    </>
  );
} 