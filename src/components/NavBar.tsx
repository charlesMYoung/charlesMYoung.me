"use client";
import React, { useState } from "react";
import NextLink from "next/link";
import { RiGithubLine, RiRssFill, RiMoonFill, RiSunFill } from "react-icons/ri";

import {
  Button,
  Link,
  Navbar as NavUIbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLightTheme, setIsLightTheme] = useState(true);
  const pathname = usePathname();

  console.log("pathname", pathname);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <NavUIbar isBordered shouldHideOnScroll>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <NextLink href="/">
            <p className="font-bold text-inherit">ACME</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="/post">Blog</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/post">Sample</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#">Project</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button isIconOnly variant="ghost" className="border-none">
            <RiGithubLine className="text-xl"></RiGithubLine>
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button isIconOnly variant="ghost" className="border-none">
            <RiRssFill className="text-xl"></RiRssFill>
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button isIconOnly variant="ghost" className="border-none">
            {isLightTheme ? (
              <RiMoonFill className="text-lg"></RiMoonFill>
            ) : (
              <RiSunFill className="text-lg"></RiSunFill>
            )}
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NavUIbar>
  );
}

export default Navbar;
