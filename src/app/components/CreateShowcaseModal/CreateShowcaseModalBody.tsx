"use client";

import { Input, Spinner } from "@nextui-org/react";
import { Products } from "./Products";
import { Product } from "@/lib/mongodb";

interface CreateShowcaseModalBodyProps {
  products: Product[];
  selectedProducts: string[];
  isLoadingProducts: boolean;
  errorProducts: Error | null;
  showcaseName: string;
  setSelectedProducts: React.Dispatch<React.SetStateAction<string[]>>;
  setShowcaseName: React.Dispatch<React.SetStateAction<string>>;
}

export const CreateShowcaseModalBody: React.FC<
  CreateShowcaseModalBodyProps
> = ({
  products,
  selectedProducts,
  isLoadingProducts,
  errorProducts,
  showcaseName,
  setSelectedProducts,
  setShowcaseName,
}) => {
  if (isLoadingProducts) return <Spinner color="primary" size="lg" />;
  if (errorProducts) return "An error has occurred: " + errorProducts.message;
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold w-fit">Name your Showcase</h2>
        <Input
          type="text"
          placeholder="Give your Showcase a nice name"
          className="rounded-sm w-[33%]"
          classNames={{
            inputWrapper: [
              "bg-zinc-800",
              "hover:bg-zinc-700",
              "dark:hover:bg-zinc-700",
              "group-data-[focus=true]:bg-zinc-700",
            ],
          }}
          value={showcaseName}
          onChange={(e) => setShowcaseName(e.target.value)}
        />
      </div>
      <div className="flex flex-col items-start gap-1">
        <h2 className="text-xl font-bold w-fit">
          Your imported Shopify products
        </h2>
        <h4 className="text-default-500">
          Select a maximum of 6 products to create a showcase
        </h4>
      </div>
      <div className="grid grid-cols-4 gap-6">
        <Products
          products={products}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
        />
      </div>
    </div>
  );
};
