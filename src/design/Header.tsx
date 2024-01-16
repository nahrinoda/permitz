import { Logo } from "./icons/Logo";
export function Header({ title }: { title: string }) {
  return (
    <div className="flex flex-row space-x-4 p-4 items-center">
      <Logo className="w-10 h-10" />
      <div className="text-2xl font-semibold">{title}</div>
    </div>
  );
}
