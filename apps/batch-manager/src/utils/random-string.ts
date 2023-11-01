export const generateBatchId = (batchName: string): string => {
  const suffix = (+new Date()).toString(36);
  return `${batchName}-${suffix}`;
};

export const generateJobId = (batchName: string): string => {
  const suffix = (+new Date()).toString(36);
  return `${batchName}-job-${suffix}`;
};
