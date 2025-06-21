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
}: {
  initialHomes: Home[];
  userEmail: string;
  user: string;
}) {
  const [homes, setHomes] = useState<Home[]>(initialHomes);

  const handleHomeCreated = (newHome: Home) => {
    setHomes([newHome, ...homes]);
  };

  const handleHomeDeleted = (homeId: string) => {
    setHomes(homes.filter((home) => home.id !== homeId));
  };

  return (
    <>
      <div className="flex flex-row gap-4 mt-6">
        <CreateHome userEmail={userEmail} onHomeCreated={handleHomeCreated} />
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