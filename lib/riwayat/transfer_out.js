// lib
import { HISTORY_TRANSFER_OUT } from '../links';

// utils
import {
  getFetcher,
  getClientToken,
  convertDate,
} from '../../utils/data_helper';

export const title = 'Data Keluar';

export const columns = [
  {
    name: 'ID',
    options: {
      filter: true,
      display: 'none',
    },
  },
  'Tanggal',
  'Username Penerima',
  'Username Pengirim',
  'Voucher',
  'PED Poin',
];

export const data = [[1, '16 Maret 2020, 11:47', 'PADULKEMID', '1000', '0']];

export const options = {
  elevation: 0,
  responsive: 'standard',
  print: false,
  selectableRows: 'none',
  downloadOptions: {
    filename: 'transaksi_keluar.csv',
  },
};

export async function getData() {
  const token = getClientToken();
  const fetched = await getFetcher(HISTORY_TRANSFER_OUT, token);
  const mapped = fetched.map(
    ({ id, created, receiver_username, sender_username, tipe, nominal }) => [
      id,
      convertDate(created),
      receiver_username,
      sender_username,
      tipe === 'evoucher' ? nominal : 0,
      tipe === 'peds' ? nominal : 0,
    ]
  );

  return mapped;
}
