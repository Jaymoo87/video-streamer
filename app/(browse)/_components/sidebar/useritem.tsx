"use client";
import React from "react";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSideBar } from "@/store/useSideBar";
import Link from "next/link";
import { UserAvatar } from "@/components/useravatar";
import { LiveBadge } from "@/components/livebadge";

interface UserItemProps {
  username: string;
  imageUrl: string;
  isLive?: boolean;
}

export const UserItem = ({ username, imageUrl, isLive }: UserItemProps) => {
  const pathname = usePathname();

  const { collapsed } = useSideBar((state) => state);
  const href = `/${username}`;
  const isActive = pathname === href;

  return (
    <Button
      asChild
      variant={"ghost"}
      className={cn("w-full h-12", collapsed ? "justify-center" : "justify-start", isActive && "bg-accent")}
    >
      <Link href={href}>
        <div className={cn("flex items-center w-full gap-x-4", collapsed && "justify-center")}>
          <UserAvatar showBadge imageUrl={imageUrl} username={username} isLive={true} />
          {!collapsed && <p className="truncate">{username}</p>}
          {!collapsed && isLive && <LiveBadge className="h-4 w-4" />}
        </div>
      </Link>
    </Button>
  );
};

export const UserItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
};
