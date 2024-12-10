import { useEffect, useState } from "react";
import { generateYAML } from "./YAMLGenerator";
import { useStore } from "./store/store";
import Prism from "prismjs";
import "prismjs/components/prism-yaml";
import "../assets/css/prism.css";
import { Copy, Check, Save } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function YamlPreview() {
  const { integrations } = useStore((state) => state);
  const [yaml, setYAML] = useState<string>("");
  const [showCheck, setShowCheck] = useState<boolean>(false);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  useEffect(() => {
    setYAML(generateYAML(integrations));
  }, [integrations]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(yaml);
    setShowCheck(true);
    setTimeout(() => {
      setShowCheck(false);
    }, 3000);
  };

  return (
    <div className="">
      <div className="flex justify-between ">
        <h2 className="text-2xl font-bold mb-2">YAML Preview</h2>
        <div className="flex gap-5 pr-5">
          <Button
            variant="outline"
            className="border-[#4d4486] hover:bg-[#050928] relative"
            size="icon"
            title="Copy to clipboard"
            onClick={copyToClipboard}
          >
            <AnimatePresence mode="wait" initial={false}>
              {showCheck ? (
                <motion.div
                  key="check"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Check className="h-6 w-6 text-green-400" />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Copy className="h-4 w-4 text-neutral-400" />
                </motion.div>
              )}
            </AnimatePresence>
            <span className="sr-only">Copy to clipboard</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={downloadYAML}
            title="Save YAML"
            className="border-[#4d4486] hover:bg-[#050928]"
          >
            <Save className="h-4 w-4 text-neutral-400" />
            <span className="sr-only">Download YAML</span>
          </Button>
        </div>
      </div>

      <pre
        tabIndex={0}
        className="md:!overflow-hidden font-SFMono overflow-x-hidden language-yaml"
      >
        <code
          className="overflow-x-hidden lg:!text-[0.8rem] !break-words !text-wrap language-yaml"
          dangerouslySetInnerHTML={{
            __html: Prism.highlight(yaml, Prism.languages.yaml, "yaml"),
          }}
        />
      </pre>
    </div>
  );
}
