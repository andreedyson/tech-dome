"use client";

import { useFilterCatalog } from "@/hooks/useFilterCatalog";
import React, { ChangeEvent } from "react";
import { Input } from "../ui/input";
import { ProductStatus } from "@prisma/client";

type FilterCheckboxItemProps = {
  id: string;
  value: string;
  type?: "status" | "brand" | "category" | "location";
};

function FilterCheckboxItem({ id, value, type }: FilterCheckboxItemProps) {
  const { filter, setFilter } = useFilterCatalog();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (type) {
      case "status":
        {
          if (e.target.checked) {
            setFilter({
              status: [
                ...(filter?.status ?? []),
                e.target.value as ProductStatus,
              ],
            });
          } else {
            setFilter({
              status: filter?.status?.filter(
                (value) => value !== e.target.value,
              ),
            });
          }
        }

        break;
      case "brand":
        {
          if (e.target.checked) {
            setFilter({
              brands: [
                ...(filter?.brands ?? []),
                Number.parseInt(e.target.value),
              ],
            });
          } else {
            setFilter({
              brands: filter?.brands?.filter(
                (value) => value !== Number.parseInt(e.target.value),
              ),
            });
          }
        }

        break;
      case "category":
        {
          if (e.target.checked) {
            setFilter({
              categories: [
                ...(filter?.categories ?? []),
                Number.parseInt(e.target.value),
              ],
            });
          } else {
            setFilter({
              categories: filter?.categories?.filter(
                (value) => value !== Number.parseInt(e.target.value),
              ),
            });
          }
        }
        break;
      case "location": {
        if (e.target.checked) {
          setFilter({
            locations: [
              ...(filter?.locations ?? []),
              Number.parseInt(e.target.value),
            ],
          });
        } else {
          setFilter({
            locations: filter?.locations?.filter(
              (value) => value !== Number.parseInt(e.target.value),
            ),
          });
        }
      }

      default:
        break;
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        id={id + value}
        value={id}
        onChange={handleOnChange}
        type="checkbox"
        className="size-4"
      />
      <p className="font-medium">{value}</p>
    </div>
  );
}

export default FilterCheckboxItem;
