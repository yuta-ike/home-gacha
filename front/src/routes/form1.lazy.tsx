import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { FormSelectItem } from "../components/FormSelectItem";

export const Route = createLazyFileRoute('/form1')({
  component: Form1,
})

function Form1() {
  const [value, setValue] = useState("")
  const navigate = useNavigate()

  return (
  <div className="flex flex-col gap-y-2 px-2 py-4">
    <div className="size-5" />
    <div className="text-gray-800 text-xl font-bold text-[18px] mt-2">相手の職種を選んでください</div>
    <div className="text-gray-400 text-xs">興味のある職種について聞いてみましょう！</div>
    <div className="w-[85%] mt-6 flex flex-col gap-y-10 items-center justify-center mx-auto">
      <div className="flex flex-col gap-y-2 items-center w-full justify-center">
        <FormSelectItem value="frontend" label="フロントエンドエンジニア" selectedValue={value} setValue={setValue} />
        <FormSelectItem value="backend" label="バックエンドエンジニア" selectedValue={value} setValue={setValue} />
        <FormSelectItem value="infra" label="インフラエンジニア" selectedValue={value} setValue={setValue} />
        <FormSelectItem value="designer" label="デザイナー" selectedValue={value} setValue={setValue} />
        <FormSelectItem value="marketing" label="営業" selectedValue={value} setValue={setValue} />
        <FormSelectItem value="planning" label="企画" selectedValue={value} setValue={setValue} />
        <FormSelectItem value="hr" label="人事" selectedValue={value} setValue={setValue} />
      </div>
    </div>
    <div className="absolute bottom-8 w-[85%] left-1/2 right-1/2 -translate-x-1/2">
      <Button className="rounded-full w-full" onClick={() => navigate({
          to: "/form2",
        })}>次へ</Button>
    </div>
  </div>
  )
}
