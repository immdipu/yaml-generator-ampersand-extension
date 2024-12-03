import React, { type FC } from "react";
import { Input } from "./input";
import { Info } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";

interface InputWithLabelProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hoverContent: string;
}

const InputWithLabel: FC<InputWithLabelProps> = ({
  hoverContent,
  label,
  onChange,
  placeholder,
  value,
}) => {
  return (
    <div className="flex flex-col w-full">
      <div className="label pl-1 flex items-center gap-3 !text-[13px]">
        <p className="  input_label">{label}</p>

        {hoverContent && (
          <HoverCard openDelay={0}>
            <HoverCardTrigger className="w-fit">
              <Info className="text-xs size-4  stroke-[#282d5a] hover:stroke-neutral-400" />
            </HoverCardTrigger>
            <HoverCardContent className="bg-[#21244f] text-[13px] py-2 px-2  font-extralight text-neutral-100 leading-normal  font-DMSans border border-[#202447]">
              {hoverContent}
            </HoverCardContent>
          </HoverCard>
        )}
      </div>
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border-[#282d5a] placeholder:text-neutral-400 text-[13px] focus-within:border-neutral-500 outline-none py-2 h-fit focus-within:none"
      />
    </div>
  );
};
export default InputWithLabel;
