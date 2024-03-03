import { GachaCardDrawer } from "./GachaCardDrawer";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

export type User = {
  name: string; // 名前
  profession: string; // 職種
  yearsOfService: number; // 在籍年数
  interestedField: string; // 興味のある分野
  objective: string; // 目標
  imageUrl: string; // 画像URL
};

interface GachaCardWithTagProps {
	user: User;
}

export const GachaCardWithTag: React.FC<GachaCardWithTagProps> = ({ user }) => {
	return (
		<GachaCardDrawer user={user}>
      <div className="rounded-lg bg-white px-8 py-6
      ">
        <div className="flex flex-col gap-y-2">
          <div className="text-2xl font-bold">
            {user.name}
          </div>
          <Separator />
          <div className="text-gray-700 text-sm flex items-center text-start gap-y-1 gap-x-2">
            <Badge variant="outline" className="text-green-600 border-green-600 bg-green-50">{user.profession}</Badge>
            <Badge variant="outline" className="text-green-600 border-green-600 bg-green-50">{user.yearsOfService}年目</Badge>
          </div>
        </div>
      </div>
		</GachaCardDrawer>
	);
};
