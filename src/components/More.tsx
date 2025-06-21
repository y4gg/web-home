import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function More({ user }: { user: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={"outline"}>More</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Name: {user}</DropdownMenuItem>
        <DropdownMenuItem>
          <form
            className="p-0"
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button variant={"link"} className="text-red-500 p-0 m-0 h-0">
              Sign out
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
