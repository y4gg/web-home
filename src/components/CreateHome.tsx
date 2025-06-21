"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

export function CreateHome({ userEmail }: { userEmail: string }) {
  const [homeName, setHomeName] = useState("");
  const [loading, setLoading] = useState(false);
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
          homeName,
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
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Home</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Home</DialogTitle>
          <DialogDescription>
            Create a new home for your minecraft account.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="homeName">Home Name</Label>
            <Input type="text" placeholder="OP Base" onChange={(e) => setHomeName(e.target.value)} />
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSetHome} disabled={loading}>
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
