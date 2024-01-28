"use client";

interface UnblockButtonProps {
  userId: string;
}

import { unBlock } from "@/actions/block";
import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { toast } from "sonner";

export const UnblockButton = ({ userId }: UnblockButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      unBlock(userId)
        .then((result) => toast.success(`User ${result.blocked.username} Is No Longer Blocked`))
        .catch(() => toast.error("something went wrong"));
    });
  };

  return (
    <Button disabled={isPending} className="text-blue-500 w-full" onClick={onClick} variant={"link"} size={"sm"}>
      Unblock
    </Button>
  );
};
