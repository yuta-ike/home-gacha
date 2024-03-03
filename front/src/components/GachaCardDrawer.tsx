import { useGachaStart } from "../hooks/useGachaStart";
import { useGachaStatus } from "../hooks/useGachaStatus";
import { User } from "./GachaCard";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Drawer,  DrawerClose,  DrawerContent, DrawerDescription, DrawerHeader, DrawerTrigger } from "./ui/drawer"
import { Separator } from "./ui/separator";

interface GachaCardDrawerProps {
  children: React.ReactNode;
  user: User;
}

export const GachaCardDrawer: React.FC<GachaCardDrawerProps> = ({children, user}) => {
   const {fetchStatus} = useGachaStatus();
	const { startGacha } = useGachaStart(fetchStatus);

  return (
    <Drawer>
      <DrawerTrigger asChild className="focus-visible:outline-none">
        {children}
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="flex flex-col gap-y-4">
            <div>
              <Avatar className="size-28">
                <AvatarImage src={user.imageUrl} />
                <AvatarFallback />
              </Avatar>
              <div className="flex flex-col gap-y-1 ml-2">
                <div className="text-xl font-bold text-start">{user.name}</div>
                <div className="text-gray-500 text-sm text-start">3/4(月) 13:00</div>
              </div>
            </div>
            <Separator />
            <DrawerDescription className="mb-4">
              <div className="text-gray-700 text-sm flex flex-col justify-start text-start gap-y-1">
                <div>職種：{user.profession}</div>
                <div>在籍年数：{user.yearsOfService}</div>
                <div>興味のある分野：{user.interestedField}</div>
                <div>目標：{user.objective}</div>
              </div>
            </DrawerDescription>
            <DrawerClose asChild><Button size="lg" className="rounded-full w-full mb-8" onClick={startGacha}>ガチャを回す</Button></DrawerClose>
          </DrawerHeader>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
