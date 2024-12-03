import React from "react";
import Cron from "react-cron-generator";
import "../../assets/css/cronbuilder.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../ui/dialog";

const Scheduler = ({
  children,
  onchange,
}: {
  children: React.ReactNode;

  onchange: (e: string) => void;
}) => {
  const [state, setState] = React.useState({ value: "0 0 * * * *" });

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <button>{children}</button>
        </DialogTrigger>
        <DialogContent className="bg-[#0f1129] border-blue-900 border-opacity-45 max-w-[40rem] ">
          <DialogHeader>
            <DialogTitle>Select a schedule</DialogTitle>
          </DialogHeader>

          <section>
            <Cron
              onChange={(e) => {
                setState({ value: e });
                onchange(e);
              }}
              value={state.value}
              showResultText={true}
              showResultCron={true}
            />
          </section>

          <DialogClose>
            <button className="w-full font-medium duration-200 ease-linear transition-transform active:scale-95 bg-[#4f1eb8] py-2 rounded-md text-sm">
              Save
            </button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Scheduler;
