import { generateNoteId } from "../assets/js/notes.js";

describe("generateNoteId", () => {
    test("generateNoteID returns a recent timestamp as a numeric string", () => {
        const id = generateNoteId();
        const numericId = Number(id);
        const now = Date.now();

        expect(typeof id).toBe("string");
        expect(numericId).not.toBeNaN();
        expect(numericId).toBeLessThanOrEqual(now);
    });
});