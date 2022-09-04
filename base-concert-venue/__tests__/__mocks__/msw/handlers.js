import { rest } from 'msw';

import { readFakeData } from '@/__tests__/__mocks__/fakeData';
import { fakeUserReservations } from '@/__tests__/__mocks__/fakeData/userReservations';

const url = 'http://localhost:3000';

export const handlers = [
  rest.get(`${url}/api/shows/:showId`, async (req, res, ctx) => {
    const { fakeShows } = await readFakeData();
    const { showId } = req.params;

    // index / showId = 0 has seats available in fake data
    // index / showId = 1 has NO seats available
    return res(
      ctx.json({
        show: fakeShows[Number(showId)],
      })
    );
  }),
  rest.get(`${url}/api/users/:userId/reservations`, (req, res, ctx) => {
    const { userId } = req.params;

    // return fakeUserReservations if userId is 1; empty array otherwise
    const userReservations = Number(userId) === 1 ? fakeUserReservations : [];
    return res(ctx.json({ userReservations }));
  }),
];
