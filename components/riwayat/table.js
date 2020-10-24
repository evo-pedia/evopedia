// react
import { useEffect, useState } from 'react';

// @material-ui core
import Grid from '@material-ui/core/Grid';

// mui-datatables
import DataTable from 'mui-datatables';

// prop-types
import PropTypes from 'prop-types';

// lib
import * as TransferIn from '../../lib/riwayat/transfer_in';
import * as TransferOut from '../../lib/riwayat/transfer_out';
import * as KomisiAdmin from '../../lib/riwayat/komisi_admin';
import * as KomisiPublisher from '../../lib/riwayat/komisi_publisher';
import * as KomisiKonversi from '../../lib/riwayat/komisi_dikonversi';
import * as Aktivasi from '../../lib/riwayat/aktivasi';

export default function Table({ type }) {
  const [selectedLib, setSelectedLib] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      switch (type) {
        case 'transfer':
          setSelectedLib([
            {
              id: 1,
              lib: TransferIn,
              data: await TransferIn.getData(),
            },
            {
              id: 2,
              lib: TransferOut,
              data: await TransferOut.getData(),
            },
          ]);

          break;
        case 'komisi':
          setSelectedLib([
            {
              id: 1,
              lib: KomisiAdmin,
              data: await KomisiAdmin.getData(),
            },
            {
              id: 2,
              lib: KomisiPublisher,
              data: await KomisiPublisher.getData(),
            },
            {
              id: 3,
              lib: KomisiKonversi,
              data: await KomisiKonversi.getData(),
            },
          ]);

          break;
        case 'aktivasi':
          setSelectedLib([
            {
              id: 1,
              lib: Aktivasi,
              data: await Aktivasi.getData(),
            },
          ]);

          break;
        default:
          setSelectedLib([]);
          break;
      }
    };

    fetchData();
  }, []);

  return (
    <Grid container spacing={2} direction="column">
      {selectedLib.map(({ id, lib, ...data }) => (
        <Grid item xs key={id}>
          <DataTable {...lib} {...data} />
        </Grid>
      ))}
    </Grid>
  );
}

Table.propTypes = {
  type: PropTypes.string.isRequired,
};
