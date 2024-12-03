import ProviderSelector from "./ProviderSelector";
import YAMLPreview from "./YAMLPreview";
import Action from "./actions/Action";
import InputWithLabel from "./ui/InputWithLabel";
import { useStore } from "./store/store";
import AddIntegrationButton from "./AddIntegrationButton";
import "../assets/css/fonts.css";
import "../assets/css/yamlGenerator.css";

export default function AppComponent({
  providers,
}: {
  providers: Record<string, Provider>;
}) {
  const { integrations, updateIntegration, selectedIntegrationId } = useStore(
    (state) => state
  );

  const selectedIntegration = selectedIntegrationId
    ? integrations.find((i) => i.id === selectedIntegrationId)
    : null;

  const handleUpdateIntegration = (field: keyof Integration, value: string) => {
    if (selectedIntegrationId) {
      updateIntegration(selectedIntegrationId, { [field]: value });
    }
  };

  return (
    <div className="flex h-screen py-12 px-10 overflow-hidden">
      <div className="w-1/2 p-4 pt-0 overflow-auto scrollbar">
        <section className="">
          <AddIntegrationButton />
        </section>

        {selectedIntegration && (
          <>
            <section className="flex gap-5 mb-5">
              <InputWithLabel
                label="Name"
                placeholder="Name of the integration"
                onChange={(e) =>
                  handleUpdateIntegration("name", e.target.value)
                }
                value={selectedIntegration.name}
                hoverContent="The name of the integration, only alphanumeric characters and dashes are allowed."
              />
              <InputWithLabel
                label="Display Name"
                placeholder="Display Name"
                hoverContent="The name of the integration as it will be displayed in the UI."
                value={selectedIntegration.displayName}
                onChange={(e) =>
                  handleUpdateIntegration("displayName", e.target.value)
                }
              />
            </section>

            <ProviderSelector
              providers={providers}
              selectedProvider={selectedIntegration.provider}
              onSelect={(provider) =>
                handleUpdateIntegration("provider", provider)
              }
            />

            <Action integrationId={selectedIntegration.id} />
          </>
        )}
      </div>
      <div className="w-1/2 p-4 rounded-2xl pl-10 pt-8 bg-[#17193a] border border-neutral-700/50 scrollbar overflow-auto">
        <YAMLPreview />
      </div>
    </div>
  );
}
