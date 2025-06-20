"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SetHomeButtonProps {
  userEmail: string;
}

export function SetHomeButton({ userEmail }: SetHomeButtonProps) {
  const handleSetHome = async () => {
    try {
      const response = await fetch(`/api/set-home`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: userEmail,
        }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Home location set', {
          description: data.server_response,
        });
      } else {
        toast.error('Failed to set home location', {
          description: data.error || data.server_response,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to set home location', {
        description: 'An unexpected error occurred',
      });
    }
  };

  return (
    <Button variant={"secondary"} onClick={handleSetHome}>
      Set Home at current location
    </Button>
  );
} 