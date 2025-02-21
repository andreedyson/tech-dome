import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type UserAvatarProps = {
  fullname: string;
};

function UserAvatar({ fullname }: UserAvatarProps) {
  const memberIntial =
    fullname.split(" ").length > 1
      ? fullname.split(" ")[0].charAt(0) + fullname.split(" ")[1].charAt(0)
      : fullname.charAt(0);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Avatar className="flex items-center justify-center bg-main-violet-300 font-semibold">
            {memberIntial}
          </Avatar>
        </TooltipTrigger>
        <TooltipContent className="text-center">
          <p className="font-semibold">{fullname}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default UserAvatar;
