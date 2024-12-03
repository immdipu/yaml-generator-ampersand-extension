import { useStore } from "./store/store";
import { nanoid } from "nanoid";
import { motion } from "framer-motion";
import { cn } from "../libs/utils";
import { X, Plus } from "lucide-react";

export default function EnhancedIntegrationButtons() {
  const {
    addIntegration,
    integrations,
    selectedIntegrationId,
    setIntegrationId,
    removeIntegration,
  } = useStore((state) => state);

  const handleAddIntegration = () => {
    const newIntegration: Integration = {
      id: nanoid(),
      name: "",
      displayName: "",
      provider: "",
      proxy: false,
      Action: [],
      isReadChecked: true,
      isWriteChecked: false,
      isSubscribeChecked: false,
      ReadObjects: [],
      WriteObjects: [],
      SubscribeObjects: [],
    };
    addIntegration(newIntegration);
  };

  console.log("selectedIntegrationId", selectedIntegrationId);

  return (
    <div className="pb-5  rounded-lg ">
      <div className="flex w-full items-start justify-between  mb-6">
        <h1 className="text-xl flex items-center text-neutral-50 font-medium mb-5">
          {/* <Logo invert={true} /> */}
          <span className="block -ml-3 ">YAML builder</span>
        </h1>

        <button
          onClick={handleAddIntegration}
          className="mt-2 bg-[#6122e7]  hover:bg-[#4f1eb8] border-[#4f1eb8] flex py-1 text-[14px]  hover:scale-[0.99] transition-all ease-linear duration-200 items-center font-HelveticaNeue font-light px-2 rounded-md  text-neutral-100 border hover:text-white "
        >
          <Plus className=" mr-2" /> Add new integration
        </button>
      </div>
      <motion.div
        className="w-full h-full flex gap-3 py-5 flex-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {integrations.map((integration, index) => (
          <motion.div
            key={index}
            className="relative group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => setIntegrationId(integration.id)}
              className={cn(
                "px-4 py-[6px] pr-10  bg-[#1b1739] font-DMSans rounded-[5px]  border  text-sm  transition-all duration-300 ease-in-out transform",
                selectedIntegrationId === integration.id
                  ? "  border-[#4f1eb8] text-white"
                  : "  border-[#1b1739] text-neutral-300"
              )}
            >
              {integration.name || `New Integration ${index + 1}`}{" "}
            </button>
            <motion.div
              className="absolute right-0 top-0  bottom-0 w-8 border border-red-500 bg-red-500 rounded-r-[5px]  opacity-0  group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.1 }}
              onClick={(e) => {
                e.stopPropagation();
                removeIntegration(integration.id);
              }}
            >
              <X className="h-4 w-4 text-white" />

              <span className="sr-only">Delete integration</span>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
