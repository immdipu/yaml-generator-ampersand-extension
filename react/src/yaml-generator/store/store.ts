import { SalesforceIntegration } from "../preGeneratedIntegration";
import { create } from "zustand";

export type Integration = {
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

export type State = {
  integrations: Integration[];
  selectedIntegrationId: string | null;
};

type Actions = {
  addIntegration: (integration: Integration) => void;
  updateIntegration: (id: string, updates: Partial<Integration>) => void;
  removeIntegration: (id: string) => void;
  setAction: (integrationId: string, Action: CustomObject[]) => void;
  setIsReadChecked: (integrationId: string, isReadChecked: boolean) => void;
  setIsWriteChecked: (integrationId: string, isWriteChecked: boolean) => void;
  setIsSubscribeChecked: (
    integrationId: string,
    isSubscribeChecked: boolean
  ) => void;
  AddReadObject: (integrationId: string, ReadObject: CustomObject) => void;
  AddWriteObject: (integrationId: string, WriteObject: CustomObject) => void;
  AddSubscribeObject: (
    integrationId: string,
    SubscribeObject: CustomObject
  ) => void;
  UpdateReadObject: (
    integrationId: string,
    ReadObject: Partial<CustomObject>
  ) => void;
  UpdateWriteObject: (
    integrationId: string,
    WriteObject: Partial<CustomObject>
  ) => void;
  UpdateSubscribeObject: (
    integrationId: string,
    SubscribeObject: Partial<CustomObject>
  ) => void;
  RemoveReadObject: (integrationId: string, id: string) => void;
  RemoveWriteObject: (integrationId: string, id: string) => void;
  RemoveSubscribeObject: (integrationId: string, id: string) => void;
  AddField: (
    integrationId: string,
    field: Field,
    actionId: string,
    actionType: TactionType
  ) => void;
  UpdateField: (
    integrationId: string,
    field: Partial<Field>,
    actionId: string,
    actionType: TactionType
  ) => void;
  RemoveField: (
    integrationId: string,
    fieldId: string,
    actionId: string,
    actionType: TactionType
  ) => void;
  setIntegrationId: (id: string) => void;
  clearAllIntegrations: () => void;
};

export const useStore = create<State & Actions>((set) => ({
  integrations: [SalesforceIntegration],
  selectedIntegrationId: "1",

  addIntegration: (integration) =>
    set((state) => ({
      integrations: [...state.integrations, integration],
    })),

  updateIntegration: (id, updates) =>
    set((state) => ({
      integrations: state.integrations.map((integration) =>
        integration.id === id ? { ...integration, ...updates } : integration
      ),
    })),

  removeIntegration: (id) =>
    set((state) => {
      if (state.selectedIntegrationId !== id) {
        return {
          integrations: state.integrations.filter(
            (integration) => integration.id !== id
          ),
        };
      }

      let newIntegration = null;
      const IndexOfIntegration = state.integrations.findIndex(
        (integration) => integration.id === id
      );
      if (IndexOfIntegration > 0) {
        newIntegration = state.integrations[IndexOfIntegration - 1].id;
      } else if (IndexOfIntegration < state.integrations.length - 1) {
        newIntegration = state.integrations[IndexOfIntegration + 1].id;
      } else {
        newIntegration = state.integrations[0].id;
      }

      return {
        integrations: state.integrations.filter(
          (integration) => integration.id !== id
        ),
        selectedIntegrationId: newIntegration,
      };
    }),

  setAction: (integrationId, Action) =>
    set((state) => ({
      integrations: state.integrations.map((integration) =>
        integration.id === integrationId
          ? { ...integration, Action }
          : integration
      ),
    })),

  setIsReadChecked: (integrationId, isReadChecked) =>
    set((state) => ({
      integrations: state.integrations.map((integration) =>
        integration.id === integrationId
          ? { ...integration, isReadChecked }
          : integration
      ),
    })),

  setIsWriteChecked: (integrationId, isWriteChecked) =>
    set((state) => ({
      integrations: state.integrations.map((integration) =>
        integration.id === integrationId
          ? { ...integration, isWriteChecked }
          : integration
      ),
    })),

  setIsSubscribeChecked: (integrationId, isSubscribeChecked) =>
    set((state) => ({
      integrations: state.integrations.map((integration) =>
        integration.id === integrationId
          ? { ...integration, isSubscribeChecked }
          : integration
      ),
    })),

  AddReadObject: (integrationId, ReadObject) =>
    set((state) => ({
      integrations: state.integrations.map((integration) =>
        integration.id === integrationId
          ? {
              ...integration,
              ReadObjects: [...integration.ReadObjects, ReadObject],
            }
          : integration
      ),
    })),

  AddWriteObject: (integrationId, WriteObject) =>
    set((state) => ({
      integrations: state.integrations.map((integration) =>
        integration.id === integrationId
          ? {
              ...integration,
              WriteObjects: [...integration.WriteObjects, WriteObject],
            }
          : integration
      ),
    })),

  AddSubscribeObject: (integrationId, SubscribeObject) =>
    set((state) => ({
      integrations: state.integrations.map((integration) =>
        integration.id === integrationId
          ? {
              ...integration,
              SubscribeObjects: [
                ...integration.SubscribeObjects,
                SubscribeObject,
              ],
            }
          : integration
      ),
    })),

  UpdateReadObject: (integrationId, ReadObject) =>
    set((state) => ({
      integrations: state.integrations.map((integration) => {
        if (integration.id === integrationId) {
          const index = integration.ReadObjects.findIndex(
            (obj) => obj.id === ReadObject.id
          );
          const updatedReadObjects = [...integration.ReadObjects];
          updatedReadObjects[index] = {
            ...updatedReadObjects[index],
            ...ReadObject,
          };
          return { ...integration, ReadObjects: updatedReadObjects };
        }
        return integration;
      }),
    })),

  UpdateWriteObject: (integrationId, WriteObject) =>
    set((state) => ({
      integrations: state.integrations.map((integration) => {
        if (integration.id === integrationId) {
          const index = integration.WriteObjects.findIndex(
            (obj) => obj.id === WriteObject.id
          );
          const updatedWriteObjects = [...integration.WriteObjects];
          updatedWriteObjects[index] = {
            ...updatedWriteObjects[index],
            ...WriteObject,
          };
          return { ...integration, WriteObjects: updatedWriteObjects };
        }
        return integration;
      }),
    })),

  UpdateSubscribeObject: (integrationId, SubscribeObject) =>
    set((state) => ({
      integrations: state.integrations.map((integration) => {
        if (integration.id === integrationId) {
          const index = integration.SubscribeObjects.findIndex(
            (obj) => obj.id === SubscribeObject.id
          );
          const updatedSubscribeObjects = [...integration.SubscribeObjects];
          updatedSubscribeObjects[index] = {
            ...updatedSubscribeObjects[index],
            ...SubscribeObject,
          };
          return { ...integration, SubscribeObjects: updatedSubscribeObjects };
        }
        return integration;
      }),
    })),

  RemoveReadObject: (integrationId, id) =>
    set((state) => ({
      integrations: state.integrations.map((integration) =>
        integration.id === integrationId
          ? {
              ...integration,
              ReadObjects: integration.ReadObjects.filter(
                (obj) => obj.id !== id
              ),
            }
          : integration
      ),
    })),

  RemoveWriteObject: (integrationId, id) =>
    set((state) => ({
      integrations: state.integrations.map((integration) =>
        integration.id === integrationId
          ? {
              ...integration,
              WriteObjects: integration.WriteObjects.filter(
                (obj) => obj.id !== id
              ),
            }
          : integration
      ),
    })),

  RemoveSubscribeObject: (integrationId, id) =>
    set((state) => ({
      integrations: state.integrations.map((integration) =>
        integration.id === integrationId
          ? {
              ...integration,
              SubscribeObjects: integration.SubscribeObjects.filter(
                (obj) => obj.id !== id
              ),
            }
          : integration
      ),
    })),

  AddField: (integrationId, field, actionId, actionType) =>
    set((state) => ({
      integrations: state.integrations.map((integration) => {
        if (integration.id === integrationId) {
          const objectKey = `${actionType}Objects` as keyof Integration;
          const objects = integration[objectKey] as CustomObject[];
          const updatedObjects = objects.map((obj) =>
            obj.id === actionId
              ? { ...obj, fields: [...obj.fields, field] }
              : obj
          );
          return { ...integration, [objectKey]: updatedObjects };
        }
        return integration;
      }),
    })),

  UpdateField: (integrationId, field, actionId, actionType) =>
    set((state) => ({
      integrations: state.integrations.map((integration) => {
        if (integration.id === integrationId) {
          const objectKey = `${actionType}Objects` as keyof Integration;
          const objects = integration[objectKey] as CustomObject[];
          const updatedObjects = objects.map((obj) => {
            if (obj.id === actionId) {
              const updatedFields = obj.fields.map((f) =>
                f.id === field.id ? { ...f, ...field } : f
              );
              return { ...obj, fields: updatedFields };
            }
            return obj;
          });
          return { ...integration, [objectKey]: updatedObjects };
        }
        return integration;
      }),
    })),

  RemoveField: (integrationId, fieldId, actionId, actionType) =>
    set((state) => ({
      integrations: state.integrations.map((integration) => {
        if (integration.id === integrationId) {
          const objectKey = `${actionType}Objects` as keyof Integration;
          const objects = integration[objectKey] as CustomObject[];
          const updatedObjects = objects.map((obj) =>
            obj.id === actionId
              ? {
                  ...obj,
                  fields: obj.fields.filter((field) => field.id !== fieldId),
                }
              : obj
          );
          return { ...integration, [objectKey]: updatedObjects };
        }
        return integration;
      }),
    })),

  setIntegrationId: (id) => set({ selectedIntegrationId: id }),
  clearAllIntegrations: () => set({ integrations: [] }),
}));
