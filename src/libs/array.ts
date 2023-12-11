export function sortById(a: {"@id": string}, b: {"@id": string}) {
    return a["@id"].localeCompare(b["@id"]);
}