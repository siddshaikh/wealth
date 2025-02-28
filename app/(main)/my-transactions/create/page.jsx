import { getAccount } from "@/actions/dashboard";
import React from "react";
import AddTransactionForm from "../_components/AddTransactionForm";
import { defaultCategories } from "@/data/categories";
import { getTransaction } from "@/actions/transaction";

export default async function CreateTransactions({ searchParams }) {
  const accounts = await getAccount();
  const editId = searchParams?.edit;
  let initialData = null;
  if (editId) {
    const transaction = await getTransaction(editId);
    initialData = transaction;
  }
  return (
    <div className="mx-w-3xl mx-auto px-5">
      <h1 className="text-5xl gradient-title mb-8">
        {editId ? "Update" : "Add"} Transaction
      </h1>
      <AddTransactionForm
        accounts={accounts}
        category={defaultCategories}
        editMode={!!editId}
        initialData={initialData}
      />
    </div>
  );
}
