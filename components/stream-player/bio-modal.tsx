"use client";

import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
  DialogContent,
} from "@/components/ui/dialog";

import { useState, useTransition, useRef, ElementRef } from "react";

import { Textarea } from "../ui/textarea";
import { Hint } from "../hint";

import { Button } from "../ui/button";
import { UpdateUser } from "@/actions/user.";
import { toast } from "sonner";

interface BioModalProps {
  intialValue: string | null;
}

export const BioModal = ({ intialValue }: BioModalProps) => {
  const closeRef = useRef<ElementRef<"button">>(null)
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(intialValue || "");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      UpdateUser({ bio: value })
        .then(() => {
          toast.success("User bio updated");
          closeRef.current?.click();
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit user bio</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <Textarea
            placeholder="Enter your bio"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            disabled={isPending}
            className="resize-none"
          />
          <div className="flex justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isPending} type="submit" variant="primary"></Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
