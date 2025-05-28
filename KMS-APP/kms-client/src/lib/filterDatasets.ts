import type { Dataset, Filters } from "../types/dataset";

export const filterDatasets = (
  datasets: Dataset[],
  filters: Filters
): Dataset[] => {
  return datasets.filter((dataset) => {
    const matchesKeyword =
      !filters.keyword ||
      dataset.name.toLowerCase().includes(filters.keyword.toLowerCase());
    const matchesCountry =
      !filters.country ||
      dataset.metadata?.country?.toLowerCase() ===
        filters.country.toLowerCase();
    const matchesLanguage =
      !filters.language ||
      dataset.metadata?.language?.toLowerCase() ===
        filters.language.toLowerCase();
    const matchesFormat =
      !filters.format ||
      dataset.metadata?.format?.toLowerCase() === filters.format.toLowerCase();
    const matchesOrganization =
      !filters.organization ||
      dataset.metadata?.organization?.toLowerCase() ===
        filters.organization.toLowerCase();
    const matchesTopic =
      !filters.topic ||
      dataset.metadata?.topic?.toLowerCase() === filters.topic.toLowerCase();
    const matchesLicense =
      !filters.license ||
      dataset.metadata?.license?.toLowerCase() ===
        filters.license.toLowerCase();

    return (
      matchesKeyword &&
      matchesCountry &&
      matchesLanguage &&
      matchesFormat &&
      matchesOrganization &&
      matchesTopic &&
      matchesLicense
    );
  });
};
