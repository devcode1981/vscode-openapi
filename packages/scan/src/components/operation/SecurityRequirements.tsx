import type { OasSecurityScheme } from "@xliic/common/oas30";
import { escapeFieldName } from "../../util";
import { SecurityHttpBasic } from "./SecurityHttpBasic";
import { SecurityGeneric } from "./SecurityGeneric";
import ErrorMessage from "./ErrorMessage";

export default function SecurityRequirements({
  name,
  schema,
}: {
  name: string;
  schema: Record<string, OasSecurityScheme>;
}) {
  if (!schema) {
    return null;
  }

  return (
    <>
      {Object.keys(schema).map((key) => {
        if (schema[key] === undefined) {
          return <ErrorMessage key={key} message={`Unable to find securitySchema '${key}'`} />;
        }
        if (schema[key]?.type === "http" && /^basic$/i.test(schema[key]?.scheme)) {
          return (
            <SecurityHttpBasic
              key={key}
              name={`${name}.${escapeFieldName(key)}`}
              schema={schema[key]}
              schemaKey={key}
            />
          );
        }
        return (
          <SecurityGeneric
            key={key}
            name={`${name}.${escapeFieldName(key)}`}
            schema={schema[key]}
            schemaKey={key}
          />
        );
      })}
    </>
  );
}
