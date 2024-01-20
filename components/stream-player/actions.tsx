"use client";

import React, { useTransition } from "react";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { Heart } from "lucide-react";

import { onFollow, onUnFollow } from "@/actions/follow";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";

interface ActionsProps {
  hostIdentity: string;
  isFollowing: boolean;
  isHost: boolean;
}

export const Actions = ({ isFollowing, hostIdentity, isHost }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const { userId } = useAuth();
  const router = useRouter();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(hostIdentity)
        .then((data) => toast.success(`You are now following ${data.following.username}`))
        .catch(() => toast.error("something went wrong"));
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnFollow(hostIdentity)
        .then((data) => toast.success(`You are no longer following ${data.following.username}`))
        .catch(() => toast.error("something went wrong"));
    });
  };

  const toggleFollow = () => {
    if (!userId) {
      return router.push("/sign-in");
    }

    if (isHost) return;

    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  return (
    <Button
      onClick={toggleFollow}
      disabled={isPending || isHost}
      variant={"primary"}
      size={"sm"}
      className="w-full lg:w-auto"
    >
      <Heart className={cn("h-4 w-4 mr-2", isFollowing ? "fill-white" : "fill-none")} />
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export const ActionsSkeleton = () => {
  return <Skeleton className="h-10 w-full lg:w-24" />;
};
