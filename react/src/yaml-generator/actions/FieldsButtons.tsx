import { memo } from "react";
import { nanoid } from "nanoid";
import { Button } from "../ui/button";
import { Plus, Check, X } from "lucide-react";
import { useStore } from "../store/store";

interface AddFieldsButtonsProps {
  actionType: TactionType;
  data: CustomObject;
}

interface FieldToggleProps {
  required: boolean;
  actionId: string;
  fieldId: string;
  actionType: TactionType;
}

interface FieldRemoveProps {
  fieldId: string;
  actionId: string;
  actionType: TactionType;
}

const AddFieldsButtons = ({ actionType, data }: AddFieldsButtonsProps) => {
  const { AddField, selectedIntegrationId } = useStore((state) => state);

  const addField = () => {
    const newdata: Field = {
      id: nanoid(),
      name: "",
      required: true,
      map: false,
    };
    AddField(selectedIntegrationId!, newdata, data.id, actionType);
  };

  const addMapField = () => {
    const newdata: Field = {
      id: nanoid(),
      name: "",
      required: true,
      map: true,
      mapToDisplayName: "",
      mapToName: "",
      prompt: "",
    };
    AddField(selectedIntegrationId!, newdata, data.id, actionType);
  };

  return (
    <div className="gap-2 mt-1 flex">
      <Button
        variant="outline"
        size="sm"
        onClick={addField}
        className="mt-2 bg-[#6122e7] font-DMSans hover:bg-[#4f1eb8] border-[#4f1eb8] text-white  "
      >
        <Plus className="h-4 w-4 mr-2" /> Add Field
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={addMapField}
        className="mt-2 bg-[#6122e7] font-DMSans  hover:bg-[#4f1eb8] border-[#4f1eb8] text-white  "
      >
        <Plus className="h-4 w-4 mr-2" /> Add Map Field
      </Button>
    </div>
  );
};

const FieldToggle = memo(
  ({ actionId, actionType, fieldId, required }: FieldToggleProps) => {
    const { UpdateField, selectedIntegrationId } = useStore((state) => state);
    return (
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          UpdateField(
            selectedIntegrationId!,
            {
              required: !required,
              id: fieldId,
            },
            actionId,
            actionType
          );
        }}
        className={`h-8   w-8 ${
          required
            ? "border-[#6122e7] hover:border-[#6122e993]"
            : "border-indigo-900 opacity-90 hover:border-indigo-700"
        }`}
      >
        {required && <Check className="h-4 w-4 text-[#6122e7]" />}
      </Button>
    );
  }
);

const FieldRemove = memo(
  ({ actionId, actionType, fieldId }: FieldRemoveProps) => {
    const { RemoveField, selectedIntegrationId } = useStore((state) => state);
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          RemoveField(selectedIntegrationId!, fieldId, actionId, actionType);
        }}
        className="h-8 w-8 text-neutral-400 hover:bg-transparent hover:text-red-500"
      >
        <X className="h-4 w-4" />
      </Button>
    );
  }
);

export { AddFieldsButtons, FieldToggle, FieldRemove };
