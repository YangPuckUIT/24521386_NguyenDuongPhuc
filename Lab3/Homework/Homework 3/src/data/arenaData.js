export const drops = [
  {
    id: 'vip-pass',
    title: 'PVS Grand Finals VIP Pass',
    subtitle: 'Access the championship arena',
    priceVnd: 1500000,
    remainingStock: 48,
    dropEpochMs: Date.now() + 1000 * 60 * 60 * 5,
    type: 'ticket',
  },
  {
    id: 'gcoin-crate',
    title: '5,000 G-Coin Contraband Crate',
    subtitle: 'Exclusive championship loot',
    priceVnd: 499000,
    remainingStock: 120,
    dropEpochMs: Date.now() + 1000 * 60 * 60 * 8,
    type: 'crate',
  },
]

export const standings = [
  {
    squadId: 'te',
    squadName: 'The Expendables',
    wwcdCount: 4,
    placementPts: 72,
    killPts: 91,
  },
  {
    squadId: 'ces',
    squadName: 'Cerberus Esports',
    wwcdCount: 3,
    placementPts: 65,
    killPts: 86,
  },
  {
    squadId: 'ge',
    squadName: 'Genius Esports',
    wwcdCount: 2,
    placementPts: 59,
    killPts: 74,
  },
  {
    squadId: 'agg',
    squadName: 'AGG',
    wwcdCount: 1,
    placementPts: 48,
    killPts: 67,
  },
]

export const killFeed = [
  { id: 1, squad: 'TE', player: 'TE.Player01', action: 'ELIMINATED', target: 'CES.Player02', weapon: 'Beryl M762' },
  { id: 2, squad: 'CES', player: 'CES.Player01', action: 'KNOCKED', target: 'AGG.Player03', weapon: 'Mini14' },
  { id: 3, squad: 'GE', player: 'GE.Player02', action: 'ELIMINATED', target: 'TE.Player03', weapon: 'AKM' },
]