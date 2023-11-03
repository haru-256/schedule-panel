// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy batches
  const batch1Name = 'batch1';
  const batch2Name = 'batch2';
  const batch1Id = `${batch1Name}-hogehoge`;
  const batch2Id = `${batch2Name}-hogehoge`;
  const imageURL =
    'us-central1-docker.pkg.dev/haru256-schedule-panel/batch/sample-batch';
  const batch1 = await prisma.batch.upsert({
    where: { id: batch1Id },
    update: {},
    create: {
      id: batch1Id,
      name: batch1Name,
      imageUrl: imageURL,
      machineType: 'e2-standard-2',
      owner: 'admin@haru256.dev',
      scheduledAt: '5 4 * * *',
    },
  });
  const batch2 = await prisma.batch.upsert({
    where: { id: batch2Id },
    update: {},
    create: {
      id: batch2Id,
      name: batch2Name,
      imageUrl: imageURL,
      machineType: 'e2-micro',
      owner: 'user@haru256.dev',
      scheduledAt: '5 0 * * *',
    },
  });

  // create two dummy jobs
  const job1Id = `${batch1Name}-job-fugafuga`;
  const job2Id = `${batch2Name}-job-fugafuga`;
  const job1 = await prisma.job.upsert({
    where: { id: job1Id },
    update: {},
    create: {
      id: job1Id,
      name: job1Id,
      batchId: batch1Id,
    },
  });
  const job2 = await prisma.job.upsert({
    where: { id: job2Id },
    update: {},
    create: {
      id: job2Id,
      name: job2Id,
      batchId: batch2Id,
    },
  });

  console.log({ batch1, batch2, job1, job2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
