/* eslint-disable @typescript-eslint/no-unused-vars */
import { type FC, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import Form from "./Form";
import { useStore } from "../store/store";
import { nanoid } from "nanoid";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { cn } from "../../libs/utils";

interface ActionFormProps {
  actionType: "Read" | "Write" | "Subscribe";
  isdisabled?: boolean;
  integrationId: string;
}

const ActionForm: FC<ActionFormProps> = ({
  actionType,
  isdisabled,
  integrationId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { integrations, AddReadObject, AddWriteObject, AddSubscribeObject } =
    useStore();
  const [parent] = useAutoAnimate(/* optional config */);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const integration = useMemo(
    () => integrations.find((i) => i.id === integrationId),
    [integrations, integrationId]
  );

  const ActionObject = useMemo(() => {
    if (!integration) return [];
    if (actionType === "Read") {
      return integration.ReadObjects;
    }
    if (actionType === "Write") {
      return integration.WriteObjects;
    }
    if (actionType === "Subscribe") {
      return integration.SubscribeObjects;
    }
    return [];
  }, [integration, actionType]);

  const addNewObject = () => {
    const newObject: CustomObject = {
      id: nanoid(),
      name: "",
      destination: "",
      schedule: "",
      fields: [],
      optionalFieldsAuto: false,
      backfill: null,
    };

    if (actionType === "Read") {
      AddReadObject(integrationId, newObject);
    }
    if (actionType === "Write") {
      AddWriteObject(integrationId, newObject);
    }
    if (actionType === "Subscribe") {
      AddSubscribeObject(integrationId, newObject);
    }
  };

  if (!integration) {
    return null; // or some error message
  }

  return (
    <motion.div
      className={cn(
        "bg-[#17193a] overflow-hidden h-full px-4 py-3 rounded-lg",
        isdisabled
          ? "opacity-40 pointer-events-none "
          : "opacity-100 pointer-events-auto",
        isOpen ? "mb-4" : ""
      )}
      initial={{ height: "54px" }}
      animate={{ height: isOpen ? "auto" : "54px" }}
      transition={{ type: "just", duration: 0.3 }}
    >
      <div
        className="flex items-center justify-between  cursor-pointer"
        onClick={toggleAccordion}
      >
        <label className="text-lg font-medium tracking-wide text-[#fdfcfd]">
          {actionType}
        </label>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <ChevronDown />
        </motion.div>
      </div>

      <div className="mt-6 space-y-3" ref={parent}>
        {ActionObject.map((dataObj) => (
          <Form
            key={dataObj.id}
            data={dataObj}
            actionType={actionType}
            integrationId={integrationId}
          />
        ))}
      </div>

      <div className="py-5">
        <button
          onClick={addNewObject}
          className="w-full font-medium duration-200 ease-linear transition-transform active:scale-95 bg-[#6122e7] py-2 rounded-md text-sm"
        >
          Add object
        </button>
      </div>
    </motion.div>
  );
};

export default ActionForm;
