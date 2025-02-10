import { getProductById } from "@/lib/data/product";
import React from "react";

async function EditProductPage({ params: { id } }: { params: { id: string } }) {
  const product = await getProductById(id);
  return <div>EditProductPage</div>;
}

export default EditProductPage;
