import { signIn } from "@/auth";
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

export function SignIn() {
  const [username, setUsername] = useState("");

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", `${username}@y4.gg`);
    await signIn("resend", formData);
  }

  return (
    <Dialog>
      <form onSubmit={handleSignIn}>
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
              <Label htmlFor="username">Minecraft Username</Label>
              <Input
                type="text"
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
            <Button type="submit">Sign In</Button>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}
