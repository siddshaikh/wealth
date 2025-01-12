"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const serializeTransaction = (obj) => {
  const serialized = { ...obj };
  if (obj.balance) {
    serialized.balance = obj.balance.toNumber();
  }
  if (obj.amount) {
    serialized.amount = obj.amount.toNumber();
  }
  return serialized;
};

export async function createAccount(data) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("User is not authenticated");
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });
    if (!user) throw new Error("User not found");
    const balanceFloat = parseFloat(data.balance);
    if (isNaN(balanceFloat)) {
      throw new Error("Invalid balance amount");
    }
    const existingAccount = await db.account.findMany({
      where: {
        userId: user.id,
      },
    });
    const shouldBeDefault =
      existingAccount.length === 0 ? true : data.isDefault;
    if (shouldBeDefault) {
      await db.account.updateMany({
        where: { userId: user.id, isDefault: true },
        data: { isDefault: false },
      });
    }
    const account = await db.account.create({
      data: {
        ...data,
        balance: balanceFloat,
        userId: user.id,
        isDefault: shouldBeDefault,
      },
    });
    const serializedAccount = serializeTransaction(account);
    revalidatePath("/my-dashboard");
    return { success: true, data: serializedAccount };
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getAccount() {
  try {
    const { userId } = await auth();

    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const transactions = await db.account.findMany({
      where: { userId: user.userId },
      orderBy: { createdAt: "desc" },
    });

    return transactions.map(serializeTransaction);
  } catch (error) {
    throw error;
  }
}
