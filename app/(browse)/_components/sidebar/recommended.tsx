"use client";
import React from "react";

import { useSideBar } from "@/store/useSideBar";
import { User } from "@prisma/client";
import { UserItem } from "./useritem";

interface RecommendedProps {
  data: User[];
}

export const Recommended = ({ data }: RecommendedProps) => {
  const { collapsed } = useSideBar((state) => state);

  const showLabel = !collapsed && data.length > 0;

  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      )}
      <ul>
        {data.map((user) => (
          <UserItem key={user.id} username={user.username} imageUrl={user.imageUrl} />
        ))}
      </ul>
    </div>
  );
};
