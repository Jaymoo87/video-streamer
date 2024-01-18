"use client";

import { ArrowLeftFromLine, ArrowRightFromLine, MessageSquare, Users } from "lucide-react";
import { Hint } from "../hint";
import { Button } from "../ui/button";
import { ChatVariant, useChatSideBar } from "@/store/use-chat-sidebar";

import React from "react";

export const VariantToggle = () => {
  const { variant, onChangeVariant } = useChatSideBar((state) => state);

  const isChat = variant === ChatVariant.CHAT;

  const Icon = isChat ? Users : MessageSquare;

  const onToggle = () => {
    const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT;
    onChangeVariant(newVariant);
  };

  const label = isChat ? "Community" : "Back To Chat";

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
