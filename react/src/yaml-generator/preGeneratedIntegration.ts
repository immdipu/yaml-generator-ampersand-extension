export const SalesforceIntegration = {
  id: "1",
  name: "mailmonkey-salesforce",
  displayName: "MailMonkey Salesforce",
  provider: "salesforce",
  proxy: false,
  Action: [],
  isReadChecked: true,
  isWriteChecked: true,
  isSubscribeChecked: false,
  ReadObjects: [
    {
      id: "1",
      name: "Read",

      fields: [
        {
          id: "1",
          name: "firstName",
          required: true,
        },
        {
          id: "2",
          name: "lastName",
          required: true,
        },
        {
          id: "3",
          name: "email",
          required: true,
        },
        {
          id: "4",
          name: "salutation",
          required: false,
        },
      ],
      schedule: "*/30 * * * *",
      destination: "contactWebhook",
      backfill: null,
      optionalFieldsAuto: false,
    },

    {
      name: "lead",
      destination: "leadWebhook",
      schedule: "*/30 * * * *",
      fields: [
        { id: "1", name: "firstName", required: true },
        { id: "2", name: "lastName", required: true },
        { id: "3", name: "email", required: true },
        { id: "4", name: "isConverted", required: false },
        {
          id: "5",
          name: "priority",
          mapToName: "priority",
          mapToDisplayName: "Priority Score",
          prompt: "Which field do you use to track the priority of a lead?",
          required: true,
          map: true,
        },
      ],
      id: "2",
      backfill: null,
      optionalFieldsAuto: true,
    },
  ],
  WriteObjects: [
    {
      id: "4",
      name: "lead",
      fields: [
        {
          id: "1",
          name: "firstName",
          required: true,
        },
        {
          id: "2",
          name: "lastName",
          required: true,
        },
        {
          id: "3",
          name: "email",
          required: true,
        },
        {
          id: "4",
          name: "company",
          required: false,
        },
      ],
      destination: "leadWebhook",
      backfill: null,
      optionalFieldsAuto: false,
      schedule: "*/30 * * * *",
    },
  ],
  SubscribeObjects: [],
};
