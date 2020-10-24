// lib
import { HISTORY_ADMIN } from '../links';

// utils
import {
  getFetcher,
  getClientToken,
  convertDate,
} from '../../utils/data_helper';

export const title = 'Transfer Admin';

export const columns = [
  {
    name: 'ID',
    options: {
      filter: true,
      display: 'none',
    },
  },
  'Tanggal',
  'Username Admin',
  'Tipe',
  'Jumlah',
];

export const data = [
  [1, '16 Maret 2020, 11:47', 'RULIAJAH', 'PED Poin', '100'],
];

export const options = {
  elevation: 0,
  responsive: 'standard',
  print: false,
  selectableRows: 'none',
  downloadOptions: {
    filename: 'komisi_admin.csv',
  },
};

export async function getData() {
  const token = getClientToken();
  const fetched = await getFetcher(HISTORY_ADMIN, token);
  const mapped = fetched.map(({ id, created, admin, tipe, nominal }) => [
    id,
    convertDate(created),
    admin,
    tipe,
    nominal,
  ]);

  return mapped;
}
