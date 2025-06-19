"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { signIn } from "next-auth/react";

export default function Home() {
  const [username, setUsername] = useState("");
  const Action = (user: string) => {
    signIn("http-email", { email: `${user}@y4.gg` });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-white">Web Home</h1>
      <p className="text-lg text-gray-300">
        Teleport back to your minecraft home over this website
      </p>
      <div className="flex flex-row gap-4 mt-6">
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
      </div>
      <Accordion
        type="single"
        className="w-80 mt-6"
        // defaultValue="item-1"
        collapsible
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-white">
            How does this work?
          </AccordionTrigger>
          <AccordionContent className="text-white">
            After you register, you can simply click the button to teleport to
            your home - after setting it up first of course.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-white">
            Are there any cooldowns?
          </AccordionTrigger>
          <AccordionContent className="text-white">
            Yes, there are cooldowns. You can only teleport every 5 minutes, and
            you can only change your home once per day.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-white">
            How do I register?
          </AccordionTrigger>
          <AccordionContent className="text-white">
            After you register, a link will be sent to your chat, and yes you
            have to be online.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
