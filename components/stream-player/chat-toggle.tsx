"use client";

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { Hint } from "../hint";
import { Button } from "../ui/button";
import { useChatSideBar } from "@/store/use-chat-sidebar";

import React from "react";

export const ChatToggle = () => {
  const { collapsed, onCollapse, onExpand } = useChatSideBar((state) => state);

  const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;

  const onToggle = () => {
    if (collapsed) {
      onExpand();
    } else {
      onCollapse();
    }
  };

  const label = collapsed ? "Expand" : "Collapse";

  return (
    <Hint label={label} asChild side="left">
      <Button
        onClick={onToggle}
        variant={"ghost"}
        className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
      >
        <Icon className="w-4 h-4" />
      </Button>
    </Hint>
  );
};
