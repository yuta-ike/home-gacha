import { cn } from "../lib/utils"
import { Button } from "./ui/button"

interface FormSelectItemProps {
  value: string
  label:string
  selectedValue: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

export const FormSelectItem: React.FC<FormSelectItemProps> = ({value,label, selectedValue, setValue}) => {
  return (
    <Button variant="outline" onClick={() => setValue(value === selectedValue ? "" : value)} className={cn("px-4 py-2 rounded-md font-bold w-full",
    value === selectedValue && "bg-[#7AC973] focus:bg-[#7AC973] text-white focus:text-white")}>
     {label}
    </Button>
  )
}
