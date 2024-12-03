import { type FC } from "react";
import { useStore } from "../store/store";
import { Input } from "../ui/input";
import { FieldRemove, FieldToggle } from "./FieldsButtons";

interface ObjectMapInputFieldsProps {
  field: Field;
  data: CustomObject;
  actionType: TactionType;
}

const ObjectMapInputFields: FC<ObjectMapInputFieldsProps> = ({
  actionType,
  data,
  field,
}) => {
  const { UpdateField, selectedIntegrationId } = useStore((state) => state);
  return (
    <div className="flex  shadow-[0px_0px_1px_1px_#393b4f]  border-[#1f2453] px-2 py-4 rounded-[7px] -ml-1 items-center space-x-2">
      <section className="w-full">
        <div className="">
          <div className="flex-grow  relative">
            <Input
              value={field.prompt}
              onChange={(e) =>
                UpdateField(
                  selectedIntegrationId!,
                  {
                    prompt: e.target.value,
                    id: field.id,
                  },
                  data.id,
                  actionType
                )
              }
              placeholder="Enter prompt"
              className="pr-24 border-[#282d5a]"
            />
            <div
              className={`absolute right-2 top-1/2 font-DMSans -translate-y-1/2 text-xs px-2 py-1 rounded ${
                field.required
                  ? "bg-[#351970] text-[#e1d3ff]"
                  : "bg-neutral-500/20 text-neutral-400"
              }`}
            >
              {field.required ? "Required" : "Optional"}
            </div>
          </div>
          <section className="grid grid-cols-2 gap-4 mt-2">
            <div className="flex-grow  relative">
              <Input
                value={field.mapToName}
                onChange={(e) =>
                  UpdateField(
                    selectedIntegrationId!,
                    {
                      mapToName: e.target.value,
                      id: field.id,
                    },
                    data.id,
                    actionType
                  )
                }
                placeholder="Enter MapToName"
                className="pr-14 border-[#282d5a]"
              />
            </div>
            <div className="flex-grow  relative">
              <Input
                value={field.mapToDisplayName}
                onChange={(e) =>
                  UpdateField(
                    selectedIntegrationId!,
                    {
                      mapToDisplayName: e.target.value,
                      id: field.id,
                    },
                    data.id,
                    actionType
                  )
                }
                placeholder="Enter MapToDisplayName"
                className="pr-14 border-[#282d5a]"
              />
            </div>
          </section>
        </div>
      </section>
      <FieldToggle
        actionId={data.id}
        actionType={actionType}
        fieldId={field.id}
        required={field.required}
      />

      <FieldRemove
        actionId={data.id}
        actionType={actionType}
        fieldId={field.id}
      />
    </div>
  );
};

export default ObjectMapInputFields;
