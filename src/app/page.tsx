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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { sendCode } from "@/lib/verify";
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");

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
              <Button>Register</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Register</DialogTitle>
                <DialogDescription>
                  Sign up for the remote home teleportation tool.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="username-">Username</Label>
                  <div className="flex w-full max-w-sm items-center gap-2">
                    <Input type="username" id="username" value={username} onChange={e => setUsername(e.target.value)} />
                    <Button type="submit" variant="outline" onClick={() => sendCode(username)}>
                      Send verification code
                    </Button>
                  </div>
                </div>
                <InputOTP maxLength={6}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Register</Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button>Login</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Login</DialogTitle>
                <DialogDescription>
                  Login into your web home account.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="username">Username</Label>
                  <div className="flex w-full max-w-sm items-center gap-2">
                    <Input type="username" id="username" value={username} onChange={e => setUsername(e.target.value)} />
                    <Button type="button" variant="outline" onClick={() => sendCode(username)}>
                      Send verification code
                    </Button>
                  </div>
                </div>
                <InputOTP maxLength={6}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Login</Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </div>
      <Accordion
        type="single"
        className="w-80 mt-6"
        defaultValue="item-1"
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
