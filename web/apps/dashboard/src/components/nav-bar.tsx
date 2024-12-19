'use client';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Github, Menu } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { ThemeToggle } from './theme-toggle';

interface RouteProps {
  href: string;
  label: string;
}

interface FeatureProps {
  title: string;
  description: string;
}

const routeList: RouteProps[] = [
  {
    href: '#home',
    label: 'Home',
  },
  {
    href: '/control',
    label: 'Control',
  },

  {
    href: '/orientation',
    label: 'Orientation',
  },
];

const featureList: FeatureProps[] = [
  {
    title: 'Showcase Your Value ',
    description: 'Highlight how your product solves user problems.',
  },
  {
    title: 'Build Trust',
    description:
      'Leverages social proof elements to establish trust and credibility.',
  },
  {
    title: 'Capture Leads',
    description:
      'Make your lead capture form visually appealing and strategically.',
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <header className="shadow-inner bg-opacity-15 w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border border-secondary z-40 rounded-2xl flex justify-between items-center p-2 bg-card backdrop-blur">
      <Link className="font-bold text-lg flex items-center ml-2" href="/">
        ARM STABILIZER
      </Link>
      {/* <!-- Mobile --> */}
      <div className="flex items-center lg:hidden">
        <Sheet onOpenChange={setIsOpen} open={isOpen}>
          <SheetTrigger asChild>
            <Menu
              className="cursor-pointer lg:hidden"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            />
          </SheetTrigger>

          <SheetContent
            className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card border-secondary backdrop-blur"
            side="left"
          >
            <div>
              <SheetHeader className="mb-4 ml-4">
                <SheetTitle className="flex items-center">
                  <Link className="flex items-center" href="/">
                    Arm stabilizer
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2">
                {routeList.map(({ href, label }) => (
                  <Button
                    asChild
                    className="justify-start text-base"
                    key={href}
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    variant="ghost"
                  >
                    <Link href={href}>{label}</Link>
                  </Button>
                ))}
              </div>
            </div>

            <SheetFooter className="flex-col sm:flex-col justify-start items-start">
              <Separator className="mb-2" />

              <ThemeToggle />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* <!-- Desktop --> */}
      <NavigationMenu className="hidden lg:block mx-auto bg-transparent">
        <NavigationMenuList>
          <NavigationMenuItem>
            {routeList.map(({ href, label }) => (
              <NavigationMenuLink asChild key={href}>
                <Link className="text-base px-2" href={href}>
                  {label}
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="hidden lg:flex">
        <ThemeToggle />

        <Button aria-label="View on GitHub" asChild size="sm" variant="ghost">
          <Link
            aria-label="View on GitHub"
            href="https://github.com/amineNouabi/arm-stabilizer"
            target="_blank"
          >
            <Github className="size-5" />
          </Link>
        </Button>
      </div>
    </header>
  );
}
