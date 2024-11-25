"use client";

import { useTheme } from "./provider";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { ThemeType } from "./constants";

const label = {
  dark: <Moon />,
  light: <Sun />,
};

const ThemeSwitch = () => {
  const { toggle, theme = ThemeType.LIGHT } = useTheme();

  return (
    <Button onClick={toggle} className="size-10 rounded-full" variant="outline">
      {label[theme]}
    </Button>
  );
};

export default ThemeSwitch;
