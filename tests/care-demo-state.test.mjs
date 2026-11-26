import assert from "node:assert/strict";
import { test } from "node:test";
import { isCareState, kitLabels, reviewLabels, visitSlots } from "../lib/care-demo.ts";
import schema from "../schemas/care-demo-state.schema.json" with { type: "json" };

const initial = { kitStatus: "delivered", firstVisitStatus: "ready_to_book" };
const savedAt = "2026-11-25T18:00:00Z";
const request = { reference: "KIT-1", receivedAt: savedAt, reviewStatus: "open" };

test("frontend labels cover exactly the contract's enum values", () => {
  const { kitStatus, visitSlot, request } = schema.properties;
  assert.deepEqual(Object.keys(kitLabels).sort(), [...kitStatus.enum].sort());
  assert.deepEqual(Object.keys(reviewLabels).sort(), [...request.properties.reviewStatus.enum].sort());
  assert.deepEqual(Object.keys(visitSlots).sort(), [...visitSlot.enum].sort());
});

test("accepts every kit, review, and visit state and both slots", () => {
  const kitStates = [
    initial,
    { kitStatus: "help_requested", request },
    { kitStatus: "help_requested", request: { ...request, reviewStatus: "in_review", reviewedAt: savedAt } },
    { kitStatus: "replacement_shipped", request: { ...request, reviewStatus: "replacement_shipped", reviewedAt: savedAt, shippedAt: savedAt } },
    { kitStatus: "replacement_received", request: { ...request, reviewStatus: "replacement_received", reviewedAt: savedAt, shippedAt: savedAt, resolvedAt: savedAt } },
  ];
  const visits = [
    { firstVisitStatus: "ready_to_book" },
    { firstVisitStatus: "booked", visitSlot: "tuesday" },
    { firstVisitStatus: "booked", visitSlot: "thursday" },
    { firstVisitStatus: "confirmed", visitSlot: "tuesday" },
    { firstVisitStatus: "confirmed", visitSlot: "thursday" },
  ];
  assert.deepEqual(new Set(kitStates.map(state => state.kitStatus)), new Set(schema.properties.kitStatus.enum));
  assert.deepEqual(
    new Set(kitStates.flatMap(state => state.request ? [state.request.reviewStatus] : [])),
    new Set(schema.properties.request.properties.reviewStatus.enum),
  );
  assert.deepEqual(new Set(visits.map(visit => visit.firstVisitStatus)), new Set(schema.properties.firstVisitStatus.enum));
  for (const kit of kitStates) {
    for (const visit of visits) {
      const state = { ...kit, ...visit };
      assert.ok(isCareState(state), JSON.stringify(state));
    }
  }
  assert.ok(isCareState({ ...initial, kitStatus: "help_requested" }));
});

test("rejects missing, unknown, and unexpected fields", () => {
  const invalid = [
    null,
    [],
    {},
    { kitStatus: "delivered" },
    { firstVisitStatus: "ready_to_book" },
    { ...initial, kitStatus: "unknown" },
    { ...initial, firstVisitStatus: "unknown" },
    { ...initial, extra: true },
    { ...initial, request: { ...request, extra: true } },
    { ...initial, request: { reviewStatus: "open", receivedAt: savedAt } },
    { ...initial, request: { reference: "KIT-1", reviewStatus: "open" } },
    { ...initial, request: { reference: "KIT-1", receivedAt: savedAt } },
    { ...initial, request: { ...request, reviewStatus: "unknown" } },
  ];
  for (const state of invalid) assert.equal(isCareState(state), false, JSON.stringify(state));
});

test("requires a valid slot only after booking", () => {
  assert.equal(isCareState({ ...initial, visitSlot: "tuesday" }), false);
  for (const firstVisitStatus of ["booked", "confirmed"]) {
    assert.equal(isCareState({ ...initial, firstVisitStatus }), false);
    assert.equal(isCareState({ ...initial, firstVisitStatus, visitSlot: "friday" }), false);
  }
});

test("asserts date-time format for every activity timestamp", () => {
  for (const field of ["receivedAt", "reviewedAt", "shippedAt", "resolvedAt"]) {
    for (const value of ["2026-11-25", "2026-11-25T18:00:00", "2026-02-30T18:00:00Z", null]) {
      assert.equal(isCareState({ ...initial, request: { ...request, [field]: value } }), false);
    }
    assert.ok(isCareState({ ...initial, request: { ...request, [field]: "2026-11-25T10:00:00-08:00" } }));
  }
});
