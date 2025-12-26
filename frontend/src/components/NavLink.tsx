import Link from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkProps extends Omit<React.ComponentPropsWithoutRef<typeof Link>, "href" | "className"> {
  to: string;
  className?: string | ((props: { isActive: boolean; isPending: boolean }) => string);
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    const pathname = usePathname();
    const isActive = pathname === to;
    const isPending = false; // Next.js doesn't expose pending state in Link easily

    const computedClassName =
      typeof className === "function"
        ? className({ isActive, isPending })
        : cn(className, isActive && activeClassName);

    return (
      <Link ref={ref} href={to} className={computedClassName} {...props} />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
