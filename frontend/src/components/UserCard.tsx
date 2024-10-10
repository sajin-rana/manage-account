import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";

const userArray = [
  { name: "Olivia Martin", email: "olivia.martin@email.com" },
  { name: "Jackson Lee", email: "jackson.lee@email.com" },
  { name: "Isabella Nguyen", email: "isabella.nguyen@email.com" },
  { name: "William Kim", email: "will@email.com" },
  { name: "Sofia Davis", email: "sofia.davis@email.com" },
];

function User({
  action,
  name,
  email,
}: {
  action: string;
  name: string;
  email: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="hidden h-9 w-9 sm:flex">
        <AvatarImage src="/avatars/01.png" alt="Avatar" />
        <AvatarFallback>{name[0] + name[2]}</AvatarFallback>
      </Avatar>
      <div className="grid gap-1">
        <p className="text-sm font-medium leading-none">{name}</p>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>
      <div className="ml-auto font-medium">
        {" "}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>{action}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Permission</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Read Post</DropdownMenuItem>
            <DropdownMenuItem>Write Post</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Read Messages</DropdownMenuItem>
            <DropdownMenuItem>Write Messages</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Read Profile</DropdownMenuItem>
            <DropdownMenuItem>Write Profile</DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

const UserCard = ({ title, action }: { title: string; action: string }) => {
  return (
    <Card x-chunk="dashboard-01-chunk-5">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {userArray.map((el) => {
          return (
            <User
              action={action}
              email={el.email}
              name={el.name}
              key={el.email}
            />
          );
        })}
      </CardContent>
    </Card>
  );
};

export default UserCard;
