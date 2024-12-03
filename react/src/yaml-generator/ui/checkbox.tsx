import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "../../libs/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-6 w-6 shrink-0 rounded-md border-2 border-[#6122e7]   disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden",
      className
    )}
    {...props}
  >
    <AnimatePresence initial={false}>
      {props.checked && (
        <motion.div
          className="w-full h-full overflow-hidden   bg-[#6122e7]"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1],
            type: "spring",
            stiffness: 150,
            damping: 15,
          }}
        >
          <CheckboxPrimitive.Indicator
            className={cn(
              "flex items-center justify-center text-primary-foreground"
            )}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 15,
                mass: 1,
                duration: 0.3,
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffff"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-check"
              >
                <motion.path
                  d="M20 6 9 17l-5-5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={{ pathLength: 0, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    duration: 0.3,
                  }}
                />
              </svg>
            </motion.div>
          </CheckboxPrimitive.Indicator>
        </motion.div>
      )}
    </AnimatePresence>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
export { Checkbox };
