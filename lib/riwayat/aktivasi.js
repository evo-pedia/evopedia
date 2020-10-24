// lib
import { HISTORY_ACTIVATION } from '../links';

// utils
import {
  getFetcher,
  getClientToken,
  convertDate,
} from '../../utils/data_helper';

export const title = 'Riwayat Aktivasi';

export const columns = [
  {
    name: 'ID',
    options: {
      filter: true,
      display: 'none',
    },
  },
  'Tanggal',
  'Jumlah Aktivasi',
];

export const data = [[1, '16 Maret 2020, 11:47', '650']];

export const options = {
  elevation: 0,
  responsive: 'standard',
  print: false,
  selectableRows: 'none',
  downloadOptions: {
    filename: 'riwayat_aktivasi.csv',
  },
};

export async function getData() {
  const token = getClientToken();
  const fetched = await getFetcher(HISTORY_ACTIVATION, token);
  const mapped = fetched.map(({ created_at, value }, idx) => [
    idx,
    convertDate(created_at),
    value,
  ]);

  return mapped;
}
