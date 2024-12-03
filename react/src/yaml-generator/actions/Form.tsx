import { useState } from "react";
import { motion } from "framer-motion";
import InputWithLabel from "../ui/InputWithLabel";
import ObjectFields from "./ObjectFields";
import { useStore } from "../store/store";
import { ChevronDown, Trash2 } from "lucide-react";
import Scheduler from "./Scheduler";
import { Checkbox } from "../ui/checkbox";
import BackFill from "./BackFill";
import { cn } from "../../libs/utils";

interface FormProps {
  data: CustomObject;
  actionType: "Read" | "Write" | "Subscribe";
  integrationId: string;
}

const Form = ({ data, actionType, integrationId }: FormProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const {
    UpdateReadObject,
    UpdateSubscribeObject,
    UpdateWriteObject,
    RemoveReadObject,
    RemoveSubscribeObject,
    RemoveWriteObject,
  } = useStore((state) => state);

  const updateObject = (updates: Partial<CustomObject>) => {
    if (actionType === "Read") {
      UpdateReadObject(integrationId, { ...updates, id: data.id });
    }
    if (actionType === "Write") {
      UpdateWriteObject(integrationId, { ...updates, id: data.id });
    }
    if (actionType === "Subscribe") {
      UpdateSubscribeObject(integrationId, { ...updates, id: data.id });
    }
  };

  const DeleteObj = () => {
    if (actionType === "Read") {
      RemoveReadObject(integrationId, data.id);
    }
    if (actionType === "Write") {
      RemoveWriteObject(integrationId, data.id);
    }
    if (actionType === "Subscribe") {
      RemoveSubscribeObject(integrationId, data.id);
    }
  };

  return (
    <div>
      <motion.section
        initial={{ height: "100px" }}
        animate={{ height: isOpen ? "auto" : "50px" }}
        transition={{ type: "just", duration: 0.3 }}
        className={cn(
          "overflow-hidden border border-[#202243]  px-5 pt-3  rounded-xl bg-[#0f1129] ",
          isOpen ? "py-3 pb-5 " : ""
        )}
      >
        <section className="relative">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="flex justify-between cursor-pointer items-center"
          >
            <h2 className="text-base font-semibold">
              {data.name || "New Object"}
            </h2>
            <button className="flex items-center gap-2 text-neutral-500">
              <ChevronDown
                size={18}
                className="transform transition-transform duration-300"
                style={{
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </button>
          </div>
          <button onClick={DeleteObj} className="absolute top-1 right-10">
            <Trash2 size={16} color="#f28282" strokeWidth={1.5} />
          </button>
        </section>

        <div className="mt-3 flex gap-6">
          <InputWithLabel
            onChange={(e) => updateObject({ name: e.target.value })}
            value={data.name}
            placeholder="Enter the object name (Eg: Contacts)"
            label="Object Name"
            hoverContent="Entered name should match the name of the object in the official documentation for the SaaS API."
          />

          <InputWithLabel
            onChange={(e) => updateObject({ destination: e.target.value })}
            value={data.destination}
            placeholder="Destination name (Eg: Ampersand)"
            label="Destination"
            hoverContent="The Destination name should be same as the name of the destination on the Ampersand dashboard."
          />
        </div>
        <div className="mt-5">
          <Scheduler onchange={(e) => updateObject({ schedule: e })}>
            <InputWithLabel
              onChange={(e) => updateObject({ schedule: e.target.value })}
              value={data.schedule}
              placeholder="Schedule (Eg: 0 0 * * *)"
              label="Schedule"
              hoverContent={`The schedule should be in the cron format. For example, "0 0 * * *".`}
            />
          </Scheduler>
        </div>

        <section className="mt-5">
          <ObjectFields data={data} actionType={actionType} />

          <div className="pt-7 flex items-center gap-2">
            <Checkbox
              id="isDisabled"
              checked={data.optionalFieldsAuto}
              onCheckedChange={() =>
                updateObject({
                  optionalFieldsAuto: !data.optionalFieldsAuto,
                })
              }
            />
            <label htmlFor="isDisabled" className="input_label mt-1">
              Optional Fields Auto
              <span className="text-neutral-400 px-2">
                (Allow users to pick from all fields in the object)
              </span>
            </label>
          </div>

          <div>
            <BackFill actionType={actionType} data={data} key={data.id} />
          </div>
        </section>
      </motion.section>
    </div>
  );
};

export default Form;
