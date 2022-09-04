import { filenames, writeJSONToFile } from '@/lib/db/db-utils';

import { readFakeData } from '../../fakeData';

export const resetDB = async () => {
  // failesafe against resetting production db!
  const safeToReset = process.env.NODE_ENV === 'test';
  if (!safeToReset) {
    console.log('WARNING: database reset unavailable outside test environment');
    return null;
  }

  const { fakeBands, fakeShows, fakeReservations, fakeUsers } =
    await readFakeData();
  // overwrite data in files
  await Promise.all([
    writeJSONToFile(filenames.bands, fakeBands),
    writeJSONToFile(filenames.reservations, fakeReservations),
    writeJSONToFile(filenames.shows, fakeShows),
    writeJSONToFile(filenames.users, fakeUsers),
  ]);
  return null;
};
