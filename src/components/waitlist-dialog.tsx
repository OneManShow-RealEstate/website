"use client";

import { useEffect, useState } from "react";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { WaitlistForm } from "@/components/waitlist-form";
import { waitlist } from "@/content/home";
import { useMediaQuery } from "@/hooks/use-media-query";

// The waitlist form in a popup: a centered dialog on desktop, a bottom drawer on mobile.
// Every link to "#waitlist" on the page opens it, so CTAs stay plain links in the content.
// A shared URL ending in #waitlist opens it too.
export function WaitlistDialog() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      // Leave Cmd/Ctrl/Shift/middle clicks to the browser (new tab or window)
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest?.('a[href="#waitlist"]');
      if (!link) return;
      event.preventDefault();
      setOpen(true);
    };
    const onHash = () => {
      if (location.hash === "#waitlist") setOpen(true);
    };
    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", onHash);
    // After the first paint, so the desktop/mobile choice has settled
    const frame = requestAnimationFrame(onHash);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHash);
      cancelAnimationFrame(frame);
    };
  }, []);

  const onOpenChange = (next: boolean) => {
    setOpen(next);
    // Drop #waitlist from the URL on close, so a refresh doesn't reopen it
    if (!next && location.hash === "#waitlist") history.replaceState(null, "", location.pathname + location.search);
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="gap-6 rounded-2xl p-6 sm:max-w-lg">
          <DialogHeader className="text-start">
            <DialogTitle className="font-heading text-2xl font-bold">{waitlist.title}</DialogTitle>
            <DialogDescription className="text-base">{waitlist.text}</DialogDescription>
          </DialogHeader>
          <WaitlistForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange} showSwipeHandle>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="font-heading text-xl font-bold">{waitlist.title}</DrawerTitle>
          <DrawerDescription className="text-base">{waitlist.text}</DrawerDescription>
        </DrawerHeader>
        <div className="overflow-y-auto p-4 pb-8">
          <WaitlistForm />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
