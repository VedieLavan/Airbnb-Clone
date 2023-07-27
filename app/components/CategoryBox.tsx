'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  // defining an empty query
  const handleClick = useCallback(() => {
    let currentQuery = {};

    // Look through current params
    if (params) {
      // Parses to become object rather than string
      currentQuery = qs.parse(params.toString());
    }

    // Spread the current query and add new category
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    // Check if category is already selected
    if (params?.get("category") === label) {
      // Remove from our updated query
      delete updatedQuery.category;
    }

    // Generate URL
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`
        flex
        flex-col
        items-center
        justify-center
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? "border-b-neutral-800" : "border-transparent"}
        ${selected ? "text-neutral-800" : "text-neutral-500"}
        `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
