import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sandbox",
  description: "Sandbox Page",
};

export default function SandboxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="m-2 border-2 border-red-400">{children}</section>;
}
