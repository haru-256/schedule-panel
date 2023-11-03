export const generateBatchId = (batchName: string): string => {
  const suffix = (+new Date()).toString(36);
  return `${batchName}-${suffix}`;
};

export const generateJobName = (batchId: string): string => {
  const suffix = (+new Date()).toString(36);
  // FIXME: cloud batchのjob uidは文字制限がある。もし、文字制限を超えた場合、末尾にrandomな20文字を付与できる用に、job名の末尾を打ち切る
  // 例: batch2-hogehoge-jo-0a7dfb84-12de-479c0
  return `${batchId}-job-${suffix}`;
};
