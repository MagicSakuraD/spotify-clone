"use client";
import React, { useEffect, useState } from "react";
import qs from "query-string";
import { useRouter } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";
import { Input } from "./ui/input";

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    const query = { title: debouncedValue };

    const url = qs.stringifyUrl({
      url: "/search",
      query,
    });

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <Input
      placeholder="what do you want to listen to?"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default SearchInput;
