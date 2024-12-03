import React, { type FC } from "react";
import { Checkbox } from "../ui/checkbox";
import { useStore } from "../store/store";
import { Input } from "../ui/input";
import { cn } from "../../libs/utils";

interface BackFillProps {
  data: CustomObject;
  actionType: TactionType;
}

const BackFill: FC<BackFillProps> = ({ data, actionType }) => {
  const {
    UpdateReadObject,
    UpdateSubscribeObject,
    UpdateWriteObject,
    selectedIntegrationId,
  } = useStore((state) => state);

  const updateObject = (data: Partial<CustomObject>) => {
    if (actionType === "Read") {
      UpdateReadObject(selectedIntegrationId!, data);
    }
    if (actionType === "Write") {
      UpdateWriteObject(selectedIntegrationId!, data);
    }
    if (actionType === "Subscribe") {
      UpdateSubscribeObject(selectedIntegrationId!, data);
    }
  };

  const handleBackfillDaysChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value, 10);

    updateObject({
      id: data.id,
      backfill: value,
    });
  };

  return (
    <div className="mt-4 flex flex-col items-start gap-2">
      <div className="flex items-center gap-2">
        <Checkbox
          id="backfillFull"
          checked={data.backfill === "fullHistory"}
          onCheckedChange={() => {
            if (data.backfill === "fullHistory") {
              updateObject({ id: data.id, backfill: null });
            } else {
              updateObject({ id: data.id, backfill: "fullHistory" });
            }
          }}
        />
        <label htmlFor="backfillFull" className="input_label mt-1">
          Backfill full history
        </label>
      </div>
      <div className="flex items-center mt-1 gap-2">
        <Checkbox
          id="backfillCustom"
          checked={data.backfill !== "fullHistory" && data.backfill !== null}
          onCheckedChange={() => {
            if (data.backfill === "fullHistory") {
              updateObject({ id: data.id, backfill: 1 });
            } else if (data.backfill !== null) {
              updateObject({ id: data.id, backfill: null });
            } else {
              updateObject({ id: data.id, backfill: 1 });
            }
          }}
        />
        <label htmlFor="backfillCustom" className="input_label mt-1">
          Backfill custom number of days
        </label>

        <div
          className={cn(
            "flex  items-center gap-2",
            data.backfill !== "fullHistory" && data.backfill !== null
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none "
          )}
        >
          <Input
            type="number"
            className="input_text w-20 h-8"
            value={data.backfill || 0}
            onChange={handleBackfillDaysChange}
            min={0}
          />
          <span className="input_label mt-1">days</span>
        </div>
      </div>
    </div>
  );
};

export default BackFill;
