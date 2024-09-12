export { formatDate } from "./date";
export { primaryItems } from "./navigationItems";
export const GET_STARTED_PROJECT_ID = "k17b2fkqe8k2dm3n59nc85rzm970fn69";
export const GET_STARTED_LABEL_ID = "jx721pm26fd43f6h237f88v3j170eyb1";
export const priorityMap = {
  highest: 4,
  high: 3,
  medium: 2,
  low: 1,
};

export const getPriorityLabel = (priority: number | undefined) => {
  const label =
    Object.keys(priorityMap).find(
      (key) => priorityMap[key as keyof typeof priorityMap] === priority
    ) || "Medium";
  return label.charAt(0).toUpperCase() + label.slice(1);
};
