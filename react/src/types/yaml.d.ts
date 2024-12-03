interface Provider {
  id: string;
  name: string;
}

interface Field {
  id: string;
  name: string;
  required: boolean;
  map?: boolean;
  mapToName?: string;
  mapToDisplayName?: string;
  prompt?: string;
}

interface CustomObject {
  id: string;
  name: string;
  destination: string;
  schedule: string;
  fields: Field[];
  backfill: "fullHistory" | number | null;
  optionalFieldsAuto: boolean;
}

type TactionType = "Read" | "Write" | "Subscribe";

interface Provider {
  apiKeyOpts: {
    attachmentType: string;
    docsURL: string;
    header: Record<string, string>;
  };
  authType: string;
  baseURL: string;
  displayName: string;
  media: {
    darkMode: Record<string, string>;
    regular: Record<string, string>;
  };
  name: string;
  providerOpts: never;
  support: {
    bulkWrite: Record<string, unknown>;
    proxy: boolean;
    read: boolean;
    subscribe: boolean;
    write: boolean;
  };
}

type Integration = {
  id: string;
  name: string;
  displayName: string;
  provider: string;
  proxy: boolean;
  Action: CustomObject[];
  isReadChecked: boolean;
  isWriteChecked: boolean;
  isSubscribeChecked: boolean;
  ReadObjects: CustomObject[];
  WriteObjects: CustomObject[];
  SubscribeObjects: CustomObject[];
};
