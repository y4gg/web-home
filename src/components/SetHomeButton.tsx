"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import React from "react";

interface SetHomeButtonProps {
  userEmail: string;
}

export function SetHomeButton({ userEmail }: SetHomeButtonProps) {
  const [loading, setLoading] = React.useState(false);
  const handleSetHome = async () => {
    setLoading(true);
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
          description: "Cordiantes: " + data.home.location,
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant={"secondary"} onClick={handleSetHome} disabled={loading}>
      {loading ? (
        <Loader className="animate-spin w-4 h-4 mr-1" />
      ) : null}
      Set Home at current location
    </Button>
  );
} 