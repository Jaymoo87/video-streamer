"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

interface ChatFormProps {
  onSubmit: () => void;
  value: string;
  onChange: (value: string) => void;
  isHidden: boolean;
  isFollowing: boolean;
  isDelayed: boolean;
  isFollowersOnly: boolean;
}

import React from "react";
import { ChatInfo } from "./chat-info";

export const ChatForm = ({
  onChange,
  onSubmit,
  value,
  isDelayed,
  isFollowersOnly,
  isFollowing,
  isHidden,
}: ChatFormProps) => {
  const [isDelayBlocked, setIsDelayedBlocked] = useState(false);

  const isFollowerOnlyAndNotFollowing = isFollowersOnly && !isFollowing;
  const isDisabled = isHidden || isDelayBlocked || isFollowerOnlyAndNotFollowing;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!value || isDisabled) return;

    if (isDelayed && !isDelayBlocked) {
      setIsDelayedBlocked(true);
      setTimeout(() => {
        setIsDelayedBlocked(false);
        onSubmit();
      }, 3000);
    } else {
      onSubmit();
    }
  };

  if (isHidden) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-y-4 p-3">
      <div className="w-full">
        <ChatInfo isDelayed={isDelayed} isFollowersOnly={isFollowersOnly} />
        <Input
          onChange={(e) => onChange(e.target.value)}
          disabled={isDisabled}
          placeholder="Send a Message"
          className={cn("border-white/10", (isFollowersOnly || isDelayed) && "rounded-t-none border-t-0")}
          id="chatbar"
        />
      </div>
      <div className="ml-auto">
        <Button type="submit" variant={"primary"} size={"sm"} disabled={isDisabled}>
          Send
        </Button>
      </div>
    </form>
  );
};

export const ChatFormSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-y-4 p-3">
      <Skeleton className="w-full h-10" />
      <div className="flex items-center gap-x-2 ml-auto">
        <Skeleton className="h-7 w-7" />
        <Skeleton className="h-7 w-12" />
      </div>
    </div>
  );
};
