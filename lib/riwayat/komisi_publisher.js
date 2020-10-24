// lib
import { HISTORY_PUBLISHER } from '../links';

// utils
import { getFetcher, getClientToken } from '../../utils/data_helper';

export const title = 'Transfer Publisher';

export const columns = [
  {
    name: 'ID',
    options: {
      filter: true,
      display: 'none',
    },
  },
  'Username',
  'Jumlah Komisi',
];

export const data = [[1, 'RULIAJAH', '150']];

export const options = {
  elevation: 0,
  responsive: 'standard',
  print: false,
  selectableRows: 'none',
  downloadOptions: {
    filename: 'komisi_publisher.csv',
  },
};

export async function getData() {
  const token = getClientToken();
  const fetched = await getFetcher(HISTORY_PUBLISHER, token);
  const mapped = fetched.map(({ username, bonus }, idx) => [
    idx,
    username,
    bonus,
  ]);

  return mapped;
}
