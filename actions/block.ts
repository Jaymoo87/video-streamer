"use server";
import React from "react";

import { revalidatePath } from "next/cache";

import { blockUser, unblockUser } from "@/lib/block-service";

export const onBlock = async (id: string) => {
  // TODO: disconnect from livestream
  // TODO: kick guest

  const blockedUser = await blockUser(id);

  revalidatePath("/");

  if (blockedUser) {
    revalidatePath(`/${blockedUser.blocked.username}`);
  }

  return blockedUser;
};

export const unBlock = async (id: string) => {
  const unblockedUser = await unblockUser(id);

  revalidatePath("/");

  if (unblockedUser) {
    revalidatePath(`/${unblockedUser.blocked.username}`);
  }

  return unblockedUser;
};
