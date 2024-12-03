/* eslint-disable @typescript-eslint/no-explicit-any */
import yaml from "js-yaml";

export function generateYAML(Integrations: Integration[]): string {
  const config = {
    specVersion: "1.0.0",
    integrations: Integrations.map((data) => {
      return {
        name: data.name.trim(),
        displayName: data.displayName.trim(),
        provider: data.provider,
        ...(data.isReadChecked && {
          read: generateReadSection(data.ReadObjects),
        }),
        ...(data.isWriteChecked && {
          write: generateWriteSection(data.WriteObjects),
        }),
        ...(data.proxy && {
          proxy: {
            enabled: true,
          },
        }),
      };
    }),
  };

  let yamlString = yaml.dump(config, { indent: 2, quotingType: '"' });
  const yamlArray = yamlString.split("\n");
  let integrationCount = 0;
  for (let i = 0; i < yamlArray.length; i++) {
    if (yamlArray[i].trim().startsWith("- name:")) {
      integrationCount++;
      if (integrationCount === 1) {
        continue;
      }
      yamlArray.splice(i, 0, "");
      i++;
    }
  }

  yamlString = yamlArray.join("\n");

  yamlString = addComments(yamlString);

  return yamlString;
}

function generateReadSection(objects: CustomObject[]) {
  return {
    objects: objects.map(generateObject),
  };
}

function generateWriteSection(objects: CustomObject[]) {
  return {
    objects: objects.map(generateObject),
  };
}

function generateObject(obj: CustomObject) {
  return {
    objectName: obj.name.trim(),
    destination: obj.destination.trim(),
    schedule: `${obj.schedule} `,
    ...generateFields(obj.fields, obj.optionalFieldsAuto),
    ...(obj.optionalFieldsAuto && { optionalFieldsAuto: "All" }),
    ...(obj.backfill && {
      backfill: {
        defaultPeriod: {
          ...(obj.backfill === "fullHistory" && { fullHistory: true }),
          ...(obj.backfill !== "fullHistory" && { days: obj.backfill }),
        },
      },
    }),
  };
}

function generateFields(fields: Field[], optionalFieldsAuto: boolean) {
  const requiredFields = fields.filter((f) => f.required);
  const optionalFields = fields.filter((f) => !f.required);

  const result: any = {};

  if (requiredFields.length > 0) {
    result.requiredFields = requiredFields.map((f) => {
      if (f.map) {
        return {
          mapToName: f.mapToName?.trim(),
          mapToDisplayName: f.mapToDisplayName?.trim(),
          prompt: f.prompt?.trim(),
        };
      }
      return { fieldName: f.name.trim() };
    });
  }

  if (optionalFields.length > 0 && !optionalFieldsAuto) {
    result.optionalFields = optionalFields.map((f) => {
      if (f.map) {
        return {
          mapToName: f.mapToName?.trim(),
          mapToDisplayName: f.mapToDisplayName?.trim(),
          prompt: f.prompt?.trim(),
        };
      }
      return { fieldName: f.name?.trim() };
    });
  }

  return result;
}

function addComments(yamlString: string): string {
  const comments = {
    requiredFields: "Always read these fields",
    optionalFields: "Customer can decide if they want us to read these fields.",
    optionalFieldsAuto:
      "All other fields are optional. Customers can pick from all of them",
  };

  const lines = yamlString.split("\n");
  const result = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();
    const match = line.match(/^\s*/);
    const indent = match ? match[0] : "";

    for (const [key, comment] of Object.entries(comments)) {
      if (trimmedLine.startsWith(key + ":")) {
        result.push(`${indent}# ${comment}`);
        break;
      }
      if (trimmedLine.startsWith("- mapToName:")) {
        result.push(`${indent}# ${comment}`);
        break;
      }
    }
    result.push(line);
  }

  return result.join("\n");
}
