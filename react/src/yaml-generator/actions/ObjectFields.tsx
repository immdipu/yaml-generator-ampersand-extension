import { type FC } from "react";
import { Info } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { AddFieldsButtons } from "./FieldsButtons";
import ObjectInputField from "./ObjectInputField";
import ObjectMapInputFields from "./ObjectMapInputFields";

interface ObjectFieldsProps {
  data: CustomObject;
  actionType: TactionType;
}

const ObjectFields: FC<ObjectFieldsProps> = ({ actionType, data }) => {
  return (
    <div className="pt-3">
      <div className="flex items-center pb-2 gap-3">
        <h2 className="input_label pl-1">Object Fields</h2>
        <HoverCard openDelay={0}>
          <HoverCardTrigger className="w-fit">
            <Info className="size-4 stroke-[#282d5a] hover:stroke-neutral-400" />
          </HoverCardTrigger>
          <HoverCardContent className="bg-[#21244f] text-[13px] py-2 px-2  font-extralight text-neutral-100 leading-normal  font-DMSans border border-[#202447]">
            Click on the checkbox to toggle field as required or optional
          </HoverCardContent>
        </HoverCard>
      </div>
      <div className="space-y-2">
        {data.fields.map((field) => {
          if (field.map) {
            return (
              <ObjectMapInputFields
                key={field.id}
                field={field}
                data={data}
                actionType={actionType}
              />
            );
          } else {
            return (
              <ObjectInputField
                key={field.id}
                field={field}
                data={data}
                actionType={actionType}
              />
            );
          }
        })}
      </div>

      <AddFieldsButtons actionType={actionType} data={data} />
    </div>
  );
};

export default ObjectFields;
