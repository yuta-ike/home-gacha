import { Separator } from "./ui/separator";

export type User = {
  name: string; // 名前
  profession: string; // 職種
  yearsOfService: number; // 在籍年数
  interestedField: string; // 興味のある分野
  objective: string; // 目標
};

interface GachaCardProps {
	user: User;
}

export const GachaCard: React.FC<GachaCardProps> = ({ user }) => {
	return (
		<div className="border rounded-lg border-gray-300 px-4 py-4">
		  <div className="flex flex-col gap-y-2">
  			<div className="text-2xl font-bold">
          {user.name}
        </div>
  			<Separator />
        <div className="text-gray-700 text-sm">
            <div>職種：{user.profession}</div>
            <div>在籍年数：{user.yearsOfService}</div>
            <div>興味のある分野：{user.interestedField}</div>
            <div>目標：{user.objective}</div>
        </div>
      </div>
		</div>
	);
};
