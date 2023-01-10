import { CronJob } from 'cron';
import { DateTime } from 'luxon';

import type { GlobalContext } from '@/GlobalContext';
import BroadcastEventDataSource from '@/data_sources/BroadcastEventDataSource';
import BroadcastPubSub from '@/data_sources/BroadcastPubSub';
import PlaybillDataSource from '@/data_sources/PlaybillDataSource';
import { createCurrentPlaybill } from '@/util/playbill/data';

export async function createAndBroadcastShow(args: {
  startDate: Date;
  globalContext: GlobalContext;
}) {
  const { startDate, globalContext } = args;

  const playbillDataSource = new PlaybillDataSource({
    prismaClient: globalContext.prisma,
  });
  const broadcastEventDataSource = new BroadcastEventDataSource({
    prismaClient: globalContext.prisma,
  });
  const broadcastPubSub = new BroadcastPubSub();

  console.log(`Creating playbill at ${new Date()}.`);
  const playbill = await playbillDataSource.createPlaybill(
    createCurrentPlaybill(startDate)
  );

  console.log(
    `Broadcasting playbill scheduled to start at ${playbill.startDate}.`
  );
  broadcastPubSub.publishState({
    active: {
      playbill,
    },
    next: {
      startDate: getNextStartDate(),
    },
  });
}

export function getNextStartDate() {
  const candidate = DateTime.now()
    .setZone('America/New_York')
    .set({
      hour: 22,
      minute: 0,
      second: 0,
    })
    .toUTC();

  if (candidate.toMillis() < DateTime.now().toMillis()) {
    return candidate.plus({ days: 1 }).toJSDate();
  } else {
    return candidate.toJSDate();
  }
}

export function startPlaybillCron(args: { globalContext: GlobalContext }) {
  const { globalContext } = args;

  new CronJob(
    // 9:55pm on any day.
    //
    // Note that changing this value will require changes to `getNextStartDate`
    // as well.
    //
    // https://crontab.cronhub.io/
    '55 21 * * *',
    () =>
      createAndBroadcastShow({
        startDate: DateTime.now()
          .setZone('America/New_York')
          .set({
            hour: 22,
            minute: 0,
            second: 0,
          })
          .toUTC()
          .toJSDate(),
        globalContext,
      }),
    null,
    true,
    'America/New_York'
  );
}
