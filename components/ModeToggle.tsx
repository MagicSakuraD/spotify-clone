"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { colorModeAtom } from "@/lib/Atom";
import { useSetAtom } from "jotai";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function ModeToggle() {
  const { setTheme } = useTheme();
  const setColorMode = useSetAtom(colorModeAtom);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem
          onClick={() => {
            setTheme("light");
            setColorMode("light");
          }}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme("dark");
            setColorMode("dark");
          }}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme("system");
            setColorMode("system");
          }}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ThemeToggle() {
  const { setTheme } = useTheme();
  const setColorMode = useSetAtom(colorModeAtom);
  return (
    <div>
      <p className="mt-2">Theme</p>
      <ToggleGroup type="single" defaultValue="s" variant="outline">
        <ToggleGroupItem
          value="light"
          onClick={() => {
            setTheme("light");
            setColorMode("light");
          }}
          className="hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 text-sm"
        >
          light
        </ToggleGroupItem>
        <ToggleGroupItem
          className="hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 text-sm"
          value="dark"
          onClick={() => {
            setTheme("dark");
            setColorMode("dark");
          }}
        >
          dark
        </ToggleGroupItem>
        <ToggleGroupItem
          className="hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 text-sm"
          value="system"
          onClick={() => {
            setTheme("system");
            setColorMode("system");
          }}
        >
          system
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
