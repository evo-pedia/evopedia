// lib
import { HISTORY_CONVERT } from '../links';

// utils
import {
  getFetcher,
  getClientToken,
  convertDate,
  convertBonusName,
} from '../../utils/data_helper';

export const title = 'Konversi Komisi';

export const columns = [
  {
    name: 'ID',
    options: {
      filter: true,
      display: 'none',
    },
  },
  'Tanggal',
  'Tipe',
  'Jumlah Komisi',
  'Nominal',
];

export const data = [
  [1, '16 Maret 2020, 11:47', 'Voucher', '1000'],
  [1, '16 Maret 2020, 12:48', 'PED Poin', '1000'],
];

export const options = {
  elevation: 0,
  responsive: 'standard',
  print: false,
  selectableRows: 'none',
  downloadOptions: {
    filename: 'komisi_konversi.csv',
  },
};

export async function getData() {
  const token = getClientToken();
  const fetched = await getFetcher(HISTORY_CONVERT, token);
  const mapped = fetched.map(({ created, tipe_bonus, value }, idx) => [
    idx,
    convertDate(created),
    convertBonusName(tipe_bonus),
    value,
  ]);

  return mapped;
}
