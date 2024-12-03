import { useEffect, useState } from "react";
import { generateYAML } from "./YAMLGenerator";
import { useStore } from "./store/store";
import Prism from "prismjs";
import "prismjs/components/prism-yaml";
import "../assets/css/prism.css";
import { Copy, Download, Check, ArrowUp } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useYAMLIntegrationLoader } from "../hooks/useYAMLIntegrationLoader";

export default function YamlPreview() {
  const { integrations } = useStore((state) => state);
  const [yaml, setYAML] = useState<string>("");
  const [showCheck, setShowCheck] = useState<boolean>(false);
  const { LoadIntegration } = useYAMLIntegrationLoader();

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

  const downloadYAML = () => {
    const blob = new Blob([yaml], { type: "text/yaml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "amp.yaml";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const uploadYAML = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".yaml";
    fileInput.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const yaml = e.target?.result as string;
          try {
            LoadIntegration(yaml);
          } catch (e) {
            console.error(e);
          }
        };
        reader.readAsText(file);
      }
    };
    fileInput.click();
  };

  return (
    <div className="">
      <div className="flex justify-between ">
        <h2 className="text-2xl font-bold mb-2">YAML Preview</h2>
        <div className="flex gap-5 pr-5">
          <Button
            variant="outline"
            size="icon"
            title="Import YAML"
            onClick={uploadYAML}
            className="border-[#4d4486] hover:bg-[#050928]"
          >
            <ArrowUp className="h-4 w-4 text-neutral-400" />
            <span className="sr-only">Download YAML</span>
          </Button>

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
            title="Download YAML"
            className="border-[#4d4486] hover:bg-[#050928]"
          >
            <Download className="h-4 w-4 text-neutral-400" />
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
