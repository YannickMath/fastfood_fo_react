export interface HeaderNavbarProps {
  categories?: { id: number; type: string }[];
}

export interface LoaderProps {
  size?: "xs" | "s" | "m" | "l" | "xl";
  message: string;
}

export interface TooltipProps {
  text: string;
  children: React.ReactNode;
}
