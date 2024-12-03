/* eslint-disable @typescript-eslint/no-explicit-any */
import { useStore } from "../yaml-generator/store/store";
import yaml from "js-yaml";
import { nanoid } from "nanoid";

type YAMLField = {
  fieldName?: string;
  mapToName?: string;
  mapToDisplayName?: string;
  prompt?: string;
};

type YAMLObject = {
  objectName: string;
  destination?: string;
  schedule?: string;
  requiredFields?: Array<YAMLField>;
  optionalFields?: Array<YAMLField>;
  optionalFieldsAuto?: boolean;
  backfill: any;
};

type YAMLIntegration = {
  name: string;
  displayName: string;
  provider: string;
  module?: string;
  read?: {
    objects: Array<YAMLObject>;
  };
  write?: {
    objects: Array<YAMLObject>;
  };
  subscribe?: {
    objects: Array<YAMLObject>;
  };
  proxy?: boolean;
};

export const useYAMLIntegrationLoader = () => {
  const { addIntegration, setIntegrationId, clearAllIntegrations } = useStore(
    (state) => state
  );

  const LoadBackfill = (backfill: any): "fullHistory" | number | null => {
    if (backfill?.defaultPeriod?.fullHistory) {
      return "fullHistory";
    }

    if (backfill?.defaultPeriod?.days) {
      return backfill.defaultPeriod.days;
    }

    return null;
  };

  const LoadField = (field: YAMLField[]): any[] => {
    return field.map((f) => {
      return {
        id: nanoid(),
        name: f.fieldName || "",
        required: !!f.fieldName,
        map: !!f.mapToName,
        mapToName: f.mapToName || "",
        mapToDisplayName: f.mapToDisplayName || "",
        prompt: f.prompt || "",
      };
    });
  };

  const LoadObject = (object: YAMLObject[]): any[] => {
    return object.map((obj) => {
      return {
        id: nanoid(),
        name: obj.objectName,
        destination: obj.destination || "",
        schedule: obj.schedule || "",
        fields: LoadField(obj.requiredFields || []),
        backfill: LoadBackfill(obj?.backfill) || null,
        optionalFieldsAuto: !!obj.optionalFieldsAuto,
      };
    });
  };

  const LoadIntegration = (yamlString: string) => {
    try {
      const parsedYAML = yaml.load(yamlString) as {
        integrations: YAMLIntegration[];
      };

      if (parsedYAML?.integrations) {
        parsedYAML.integrations.forEach((integration) => {
          const newIntegration = {
            id: nanoid(),
            name: integration.name,
            displayName: integration.displayName,
            provider: integration.provider,
            proxy: integration?.proxy ? true : false,
            isReadChecked: !!integration.read,
            isWriteChecked: !!integration.write,
            ReadObjects: LoadObject(integration.read?.objects || []),
            WriteObjects: LoadObject(integration.write?.objects || []),
            isSubscribeChecked:
              LoadObject(integration.subscribe?.objects || []).length > 0,
            Action: [],
            SubscribeObjects: LoadObject(integration.subscribe?.objects || []),
          };

          clearAllIntegrations();
          addIntegration(newIntegration);
          if (newIntegration && newIntegration.id) {
            setIntegrationId(newIntegration.id as any);
          }
        });
      }
    } catch (error: any) {
      window.alert("Invalid YAML format");
    }
  };

  return { LoadIntegration };
};
