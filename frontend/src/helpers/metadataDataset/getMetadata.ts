import type {
  Author,
  CompoundField,
  DsDescription,
  MetadataField,
  PrimitiveField,
} from "@/types/datasetInterface";

type MetadataFields = MetadataField[];

export function getTitle(fields: MetadataFields): string {
  const field = fields.find(
    (f) => f.typeName === "title" && f.typeClass === "primitive"
  ) as PrimitiveField;
  return field?.value || "";
}

export function getDescription(fields: MetadataFields): string {
  const field = fields.find(
    (f) => f.typeName === "dsDescription" && f.typeClass === "compound"
  ) as CompoundField<DsDescription>;
  return field?.value?.[0]?.dsDescriptionValue?.value || "";
}
export function getSubjects(fields: MetadataFields): string {
  const field = fields.find(
    (f) => f.typeName === "subject" && f.typeClass === "controlledVocabulary"
  ) as PrimitiveField;
  const subjects = Array.isArray(field?.value) ? field.value : [];
  return subjects.join(", ");
}
export function getAuthors(fields: MetadataFields): string {
  const field = fields.find(
    (f) => f.typeName === "author" && f.typeClass === "compound"
  ) as CompoundField<Author>;
  const authors = field?.value ?? [];

  return authors
    .map((a) => {
      const name = a.authorName?.value || "";
      const aff = a.authorAffiliation?.value
        ? ` (${a.authorAffiliation.value})`
        : "";
      return name + aff;
    })
    .join(", ");
}

export function getCitation(fields: MetadataFields, year: string): string {
  const authors = getAuthors(fields);
  const title = getTitle(fields);
  return `${authors}, ${year}, "${title}",`;
}
