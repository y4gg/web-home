"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Buttons, DashboardDialog } from "@/components/buttons";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-white">Web Home</h1>
      <p className="text-lg text-gray-300 max-w-80 md:max-w-none">
        Teleport back to your minecraft home over this website
      </p>
      <div className="flex flex-row gap-4 mt-6">
        <SessionProvider>
          <DashboardDialog />
          <Buttons />
        </SessionProvider>
      </div>
      <Accordion
        type="single"
        className="w-80 mt-6"
        defaultValue="item-1"
        collapsible
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-white">
            How do I register?
          </AccordionTrigger>
          <AccordionContent className="text-white">
            After you decide to register, a link will be sent to your chat, and yes you have to be online.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-white">
            How does this work?
          </AccordionTrigger>
          <AccordionContent className="text-white">
            This works by using rcon, so it even works with vanilla servers!
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-white">
            Who is the author?
          </AccordionTrigger>
          <AccordionContent className="text-white">
            The author is y4, and his website is at https://y4.gg.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
