"use client";
import { Button } from "@/components/ui/button";
import { MapPinHouse, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { toast } from "sonner";

interface Home {
  id: string;
  name: string;
  location: string;
  dimension: string;
}

export function HomeTable({
  homes,
  userEmail,
}: {
  homes: Home[];
  userEmail: string;
}) {
  const [loading, setLoading] = useState(false);
  const handleTeleportHome = async (homeId: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/tp-home", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: userEmail,
          homeId: homeId,
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
  return (
    <Table className="mt-4">
      <TableCaption>Your home list.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Home Name</TableHead>
          <TableHead>Dimension</TableHead>
          <TableHead>Cordinates</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {homes.map((home) => (
          <TableRow key={home.id}>
            <TableCell className="font-medium">{home.name}</TableCell>
            <TableCell>{home.dimension}</TableCell>
            <TableCell>{home.location}</TableCell>
            <TableCell className="text-right">
              <Button variant={"default"} size={"icon"} className="size-8" onClick={() => handleTeleportHome(home.id)}>
                <MapPinHouse />
              </Button>
              <Button
                variant={"destructive"}
                size={"icon"}
                className="size-8 ml-2"
              >
                <Trash2 />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
