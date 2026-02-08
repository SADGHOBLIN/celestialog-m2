import { generateNoteId, getDayOfNote, formatNoteData, createPlaceholderNoteData } from "../assets/js/notes.js";

describe("generateNoteId", () => {
    test("returns a recent timestamp as a numeric string", () => {
        const id = generateNoteId();
        const numericId = Number(id);
        const now = Date.now();

        expect(typeof id).toBe("string");
        expect(numericId).not.toBeNaN();
        expect(numericId).toBeLessThanOrEqual(now);
    });
});

describe("getDayOfNote", () => {
    test("normalises a timestamp to midnight UTC", () => {
        const noteId = Date.UTC(2025, 0, 15, 14, 30).toString();

        expect(getDayOfNote(noteId)).toBe(Date.UTC(2025, 0, 15));
    });

    test("works correctly for todays date", () => {
        const now = Date.now();
        const today = new Date(now);

        const expectedResult = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());

        const noteId = now.toString();
        const result = getDayOfNote(noteId);

        expect(result).toBe(expectedResult);
    });
});

describe("formatNoteData", () => {
    test("returns a note object with the correct structure", () => {
        const noteId = "123";
        const title = "Testing title";
        const date = "08 Feb 2026";
        const moon = "FULL MOON";
        const content = "Test note content";

        const result = formatNoteData(noteId, title, date, moon, content);

        expect(result).toEqual({
            id: noteId,
            title: title,
            date: date,
            moon: moon,
            content: content
        });
    });
});

describe("createPlaceholderNoteData", () => {
    test("creates a placeholder note with the correct structure and placeholder information", () => {
        const now = Date.now();
        const missingId = now.toString();

        const expectedDate = new Date(now).toDateString();
        const result = createPlaceholderNoteData(missingId);

        expect(result).toEqual({
            id: missingId,
            title: "Inkless interval",
            date: expectedDate,
            moon: "RED MOON",
            content: "A silent page..."
        });
    });
});