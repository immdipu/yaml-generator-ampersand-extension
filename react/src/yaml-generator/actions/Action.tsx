import React from "react";
import ActionForm from "./ActionForm";
import { Checkbox } from "../ui/checkbox";
import { useStore } from "../store/store";

interface ActionProps {
  integrationId: string;
}

const Action: React.FC<ActionProps> = ({ integrationId }) => {
  const { integrations, updateIntegration } = useStore();

  const integration = integrations.find((i) => i.id === integrationId);

  if (!integration) {
    return null; // or some error message
  }

  const { isReadChecked, isWriteChecked, isSubscribeChecked, proxy } =
    integration;

  const handleCheckboxChange = (
    field: keyof typeof integration,
    value: boolean
  ) => {
    updateIntegration(integrationId, { [field]: value });
  };

  return (
    <div className="pt-6">
      <h2 className="label">Select the Action you want to add</h2>
      <div className="">
        <div className="flex justify-between pt-[6px] py-4  rounded-lg ">
          <label className="input_label flex items-center gap-2  ">
            <Checkbox
              id="terms"
              checked={isReadChecked}
              onCheckedChange={() =>
                handleCheckboxChange("isReadChecked", !isReadChecked)
              }
              className="size-6"
            />
            <span className="text-base">Read</span>
          </label>
          <label className="input_label flex items-center gap-2  ">
            <Checkbox
              id="terms"
              checked={isWriteChecked}
              onCheckedChange={() =>
                handleCheckboxChange("isWriteChecked", !isWriteChecked)
              }
              className="size-6"
            />
            <span className="text-base">Write</span>
          </label>
          <label className="input_label opacity-60 pointer-events-none flex items-center gap-2  ">
            <Checkbox
              id="terms"
              checked={isSubscribeChecked}
              onCheckedChange={() =>
                handleCheckboxChange("isSubscribeChecked", !isSubscribeChecked)
              }
              className="size-6"
            />
            <span className="text-base ">
              Subscribe
              <span className="text-sm text-neutral-400 px-1">
                (Coming Soon)
              </span>
            </span>
          </label>
          <label className="input_label   flex items-center gap-2  ">
            <Checkbox
              id="proxy"
              checked={proxy}
              onCheckedChange={() => handleCheckboxChange("proxy", !proxy)}
              className="size-6"
            />
            <span className="text-base ">Proxy</span>
          </label>
        </div>
      </div>
      <div className="mt-4 space-y-4">
        <ActionForm
          actionType="Read"
          isdisabled={!isReadChecked}
          integrationId={integrationId}
        />
        <ActionForm
          actionType="Write"
          isdisabled={!isWriteChecked}
          integrationId={integrationId}
        />
        <ActionForm
          actionType="Subscribe"
          isdisabled={!isSubscribeChecked}
          integrationId={integrationId}
        />
      </div>
    </div>
  );
};

export default Action;
