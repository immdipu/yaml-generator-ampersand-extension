import { useStore } from "../store/store";
import { Input } from "../ui/input";
import { FieldRemove, FieldToggle } from "./FieldsButtons";

interface InputFieldProps {
  field: Field;
  data: CustomObject;
  actionType: TactionType;
}

const ObjectInputField = ({ actionType, data, field }: InputFieldProps) => {
  const { UpdateField, selectedIntegrationId } = useStore((state) => state);
  return (
    <div className="flex items-center space-x-2">
      <div className="flex-grow relative">
        <Input
          value={field.name}
          onChange={(e) =>
            UpdateField(
              selectedIntegrationId!,
              {
                name: e.target.value,
                id: field.id,
              },
              data.id,
              actionType
            )
          }
          placeholder="Enter field name"
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

export default ObjectInputField;
