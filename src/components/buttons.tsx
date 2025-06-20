"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "sonner";

export function Buttons() {
  const { data: session } = useSession();
  const [username, setUsername] = useState("");
  const Action = (user: string) => {
    signIn("http-email", { email: `${user}@y4.gg`, redirect: false });
    toast.success("The link was sent into the in game chat", {
      description: "You have to be online to receive the link",
    });
  };
  if (!session) {
    return (
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button>Sign In</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Sign In</DialogTitle>
              <DialogDescription>
                Sign into the remote home teleportation tool.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="username-">Minecraft Username</Label>
                <Input
                  type="username"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-row gap-3">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={() => Action(username)}>Sign In</Button>
            </div>
          </DialogContent>
        </form>
      </Dialog>
    );
  } else {
    return (
      <>
        <Button asChild>
          <Link href="/dashboard">Go to dashboard</Link>
        </Button>
      </>
    );
  }
}

export function DashboardDialog() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(true);
  if (!session) {
    return null;
  } else {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <form>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Go to dashboard</DialogTitle>
              <DialogDescription>
                It seems like you wanted to visit the dashboard page, which you
                can do by clicking the button below.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-row gap-3">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button asChild>
                <Link href={"/dashboard"}>Go to dashboard</Link>
              </Button>
              <Logout />
            </div>
          </DialogContent>
        </form>
      </Dialog>
    );
  }
}

export function Logout() {
  const { data: session } = useSession();
  if (!session) {
    return null;
  } else {
    return (
      <Button variant={"link"} onClick={() => signOut()}>
        Logout
      </Button>
    );
  }
}
