"use client";

import { onBlock, unBlock } from "@/actions/block";
import { onFollow, onUnFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";

import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
  isFollowing: boolean;

  userId: string;
}

export const Actions = ({ isFollowing, userId }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) => toast.success(`You are now following ${data?.following.username}`))
        .catch(() => toast.error("Something went wrong"));
    });
  };
  const handleUnfollow = () => {
    startTransition(() => {
      onUnFollow(userId)
        .then((data) => toast.success(`You are no longer following ${data?.following.username}`))
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId)
        .then((data) => toast.success(`You have blocked ${data?.blocked.username}`))
        .catch(() => toast.error("Something went wrong"));
    });
  };
  const handleUnblock = () => {
    startTransition(() => {
      unBlock(userId)
        .then((data) => toast.success(`You have unblocked ${data?.blocked.username}`))
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const onClick = () => {
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  return (
    <>
      <Button disabled={isPending} onClick={onClick} variant={"primary"}>
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button onClick={handleUnblock} disabled={isPending}>
        Block
      </Button>
    </>
  );
};
