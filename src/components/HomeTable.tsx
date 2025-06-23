"use client";
import { Button } from "@/components/ui/button";
import { MapPinHouse, Loader2, MoreVertical, Trash2 } from "lucide-react";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Home {
  id: string;
  name: string;
  location: string;
  dimension: string;
}

export function HomeTable({
  homes,
  userEmail,
  onHomeDeleted,
}: {
  homes: Home[];
  userEmail: string;
  onHomeDeleted: (homeId: string) => void;
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
  const [loadingDelete, setLoadingDelete] = useState(false);
  const handleDeleteHome = async (homeId: string) => {
    setLoadingDelete(true);
    try {
      const response = await fetch("/api/del-home", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          homeId: homeId,
        }),
      });
      const data = await response.json();
      if (data.success) {
        toast("Deleted Home sucessfuly");
        onHomeDeleted(homeId);
      } else {
        toast.error("Failded to delete home", {
          description: data.error || data.server_response,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to teleport to home", {
        description: "An unexpected error occurred",
      });
    } finally {
      setLoadingDelete(false);
    }
  };
  return (
    <Table className="mt-4">
      <TableCaption>Your home list.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Home Name</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {homes.map((home) => (
          <TableRow key={home.id}>
            <TableCell className="font-medium">{home.name}</TableCell>
            <TableCell className="text-right">
              <Button
                variant={"default"}
                size={"icon"}
                className="size-8"
                onClick={() => handleTeleportHome(home.id)}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <MapPinHouse />
                )}
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant={"outline"}
                    size={"icon"}
                    className="size-8 ml-2"
                  >
                    <MoreVertical />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Info & More Options</DialogTitle>
                    <DialogDescription>
                      This is the dialog that shows your home information, so be
                      carefull when streaming!
                    </DialogDescription>
                  </DialogHeader>
                  <Label>Home Location</Label>
                  <p className="pl-2 blur-sm hover:blur-none transition">
                    {home.location}
                  </p>
                  <Label>Home Dimension</Label>
                  <p className="pl-2 blur-sm hover:blur-none transition">
                    {home.dimension}
                  </p>
                  <div className="flex flex-row gap-3 mt-2">
                    <DialogClose asChild>
                      <Button variant="outline">Close</Button>
                    </DialogClose>
                    <Dialog>
                      <DialogTrigger>
                        <Button variant={"destructive"}>Delete</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you absolutely sure?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-row gap-3 mt-2">
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button 
                            variant="destructive"
                            onClick={() => handleDeleteHome(home.id)}
                            disabled={loadingDelete}
                          >
                            {loadingDelete ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 />
                            )}
                            Delete
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
