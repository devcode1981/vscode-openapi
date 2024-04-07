import { expect, test } from "vitest";
import { Scanconf } from "@xliic/scanconf";
import { BundledSwaggerOrOasSpec } from "@xliic/openapi";
import { compare } from "../compare";

const originalOas = (await import(
  "./oas/operation-added/original-oas.json"
)) as BundledSwaggerOrOasSpec;

const updatedOas = (await import(
  "./oas/operation-added/updated-oas.json"
)) as BundledSwaggerOrOasSpec;

const originalScanconf = (await import(
  "./oas/operation-added/original-scanconf.json"
)) as unknown as Scanconf.ConfigurationFileBundle; // FIXME scanconf seems to diverge from schema

const updatedScanconf = (await import(
  "./oas/operation-added/updated-scanconf.json"
)) as unknown as Scanconf.ConfigurationFileBundle; // FIXME scanconf seems to diverge from schema

test("compare equal", async () => {
  const changes = compare(originalOas, originalScanconf);
  expect(changes).toEqual([]);
});

test("find removed operation", async () => {
  const changes = compare(originalOas, updatedScanconf);
  expect(changes).toEqual([
    {
      operationId: "/foo:delete",
      type: "operation-removed",
    },
  ]);
});

test("find added operation", async () => {
  const changes = compare(updatedOas, originalScanconf);
  expect(changes).toEqual([
    {
      operationId: "/foo:delete",
      type: "operation-added",
      path: "/foo",
      method: "delete",
    },
  ]);
});
