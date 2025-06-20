"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Loader } from "lucide-react";
import React from "react";

interface TeleportHomeButtonProps {
  userEmail: string;
  home: { location: string | null } | null;
}

export function TeleportHomeButton({
  userEmail,
  home,
}: TeleportHomeButtonProps) {
  const [loading, setLoading] = React.useState(false);
  const handleTeleportHome = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/tp-home", {
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
        toast.success("Teleported to home", {
          description: data.server_response,
        });
      } else {
        toast.error("Failed to teleport to home", {
          description: data.error || data.server_response,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to teleport to home", {
        description: "An unexpected error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  const hasHome = home && home.location;

  return (
    <HoverCard>
      <HoverCardTrigger>
        <Button
          onClick={handleTeleportHome}
          disabled={!hasHome || loading}
          title={
            !hasHome
              ? "No home location set. Use 'Set Home' first."
              : "Teleport to your home location"
          }
        >
          {loading ? (
            <Loader className="animate-spin w-4 h-4" />
          ) : null}
          Teleport to home
        </Button>
      </HoverCardTrigger>
      <HoverCardContent>
        {hasHome && (
            "Teleport with the click of a button."
        )} {
          "Set a home location first to teleport to it."
        }
      </HoverCardContent>
    </HoverCard>
  );
}
