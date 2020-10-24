// yup
import * as yup from 'yup';

// lib
import { CHECK_USER } from '../lib/links';

// utils
import { postFetcher, getClientToken } from './data_helper';

export const activationValidationSchema = yup.object({
  poin: yup
    .number()
    .required('Poin harus diisi!')
    .positive('Poin tidak boleh berupa angka negatif!')
    .integer('Poin tidak boleh berupa angka desimal!')
    .min(10, 'Poin harus lebih dari 10!'),
  sk: yup
    .boolean()
    .oneOf([true], 'Anda harus menyetujui syarat dan ketentuan!'),
});

export const quantityValidationSchema = yup.object({
  jenis: yup
    .string()
    .required('Jenis transfer harus diisi!')
    .oneOf(['peds', 'evoucher'], 'Jenis harus salah satu dari peds / voucher!'),
  jumlah: yup
    .number()
    .required('Jumlah harus diisi!')
    .positive('Jumlah tidak boleh berupa angka negatif!')
    .integer('Jumlah tidak boleh berupa angka desimal!')
    .moreThan(0, 'Jumlah harus lebih dari nol!'),
});

export const reviewValidationSchema = yup.object({
  username: yup
    .string()
    .test('checkUsername', 'Username tidak ada!', async (value) => {
      // first check
      if (value === undefined) return false;

      const token = getClientToken();
      const struct = {
        username: value.toUpperCase(),
      };

      try {
        await postFetcher(CHECK_USER, struct, token);
        return true;
      } catch (e) {
        return false;
      }
    })
    .required('Username penerima harus diisi!'),
  password: yup
    .string()
    .matches(
      /^(?:(?=.*?[A-Z])(?:(?=.*?[0-9])(?=.*?[-!@#$%^&*()_[\]{},.<>+=])|(?=.*?[a-z])(?:(?=.*?[0-9])|(?=.*?[-!@#$%^&*()_[\]{},.<>+=])))|(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-!@#$%^&*()_[\]{},.<>+=]))[A-Za-z0-9!@#$%^&*()_[\]{},.<>+=-]{8,20}$/,
      'Password harus mengandung minimal 1 simbol, 1 angka, 1 huruf kapital, panjang minimal sebanyak 8 karakter dan panjang maksimal sebanyak 20 karakter!'
    )
    .required('Password harus diisi!'),
});

export const phoneEditValidationSchema = yup.object({
  phone: yup
    .string()
    .matches(
      /^8[1-9]{1}[0-9]+$/,
      'Nomer telepon harus berupa ANGKA dan diawali oleh angka 8, bukan 0 / +62!'
    )
    .min(9, 'Nomor telepon minimal 9 angka!')
    .max(13, 'Nomer telepon maksimal 13 angka!')
    .required('Nomer telepon harus diisi!'),
});

export const emailEditValidationSchema = yup.object({
  email: yup
    .string()
    .email('Input harus berupa email!')
    .required('Email baru harus diisi!'),
});

export const passwordEditValidationSchema = yup.object({
  // TODO: add validation for oldPass later to check
  // if password true or not
  oldPass: yup.string().required('Password lama harus iisi!'),
  newPass: yup
    .string()
    .matches(
      /^(?:(?=.*?[A-Z])(?:(?=.*?[0-9])(?=.*?[-!@#$%^&*()_[\]{},.<>+=])|(?=.*?[a-z])(?:(?=.*?[0-9])|(?=.*?[-!@#$%^&*()_[\]{},.<>+=])))|(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-!@#$%^&*()_[\]{},.<>+=]))[A-Za-z0-9!@#$%^&*()_[\]{},.<>+=-]{8,20}$/,
      'Password baru harus mengandung minimal 1 simbol, 1 angka, 1 huruf kapital, panjang minimal sebanyak 8 karakter dan panjang maksimal sebanyak 20 karakter!'
    )
    .notOneOf(
      [yup.ref('oldPass')],
      'Password baru tidak boleh sama dengan password lama!'
    )
    .required('Password baru harus diisi!'),
});

export const loginValidationSchema = yup.object({
  username: yup.string().required('Username harus diisi!'),
  password: yup.string().required('Password harus diisi!'),
});

export const channelDetailValidationSchema = yup.object({
  email: yup
    .string()
    .email('Input harus berupa email!')
    .required('Email harus diisi!'),
  ytLink: yup
    .string()
    .matches(/youtube/, 'Input harus berupa link youtube!')
    .required('Link youtube harus diisi!'),
  ytChan: yup.string().required('Nama channel harus diisi!'),
});

export const channelLinksValidationSchema = yup.object({
  videos: yup.array().of(
    yup.object({
      video: yup
        .string()
        .matches(/youtube/, 'Input harus berupa link youtube!')
        .required('Link harus diisi!'),
    })
  ),
});

export const convertValidationSchema = yup.object({
  komisi: yup.string().required('Tipe komisi harus diisi!'),
  poin: yup
    .number()
    .required('Poin harus diisi!')
    .positive('Poin tidak boleh berupa angka negatif!')
    .integer('Poin tidak boleh berupa angka desimal!')
    .moreThan(0, 'Poin harus lebih dari nol!'),
  sk: yup
    .boolean()
    .oneOf([true], 'Anda harus menyetujui syarat dan ketentuan!'),
});

export const newStudentFormValidationSchema = yup.object({
  idNumber: yup
    .string()
    .matches(/^[0-9]+$/, 'NIK / Passport harus berupa ANGKA!')
    .min(12, 'NIK / Passport minimal 12 karakter!')
    .max(16, 'NIK / Passport maksimal 16 karakter!')
    .required('NIK / Passport harus diisi!'),
  name: yup.string().required('Nama harus diisi!'),
  phone: yup
    .string()
    .matches(
      /^8[1-9]{1}[0-9]+$/,
      'Nomer telepon harus berupa ANGKA dan diawali oleh angka 8, bukan 0 / +62!'
    )
    .min(9, 'Nomor telepon minimal 9 angka!')
    .max(13, 'Nomer telepon maksimal 13 angka!')
    .required('Nomer telepon harus diisi!'),
  mentor: yup.string().required('Username Mentor wajib diisi!'),
  email: yup
    .string()
    .email('Kolom harus berupa email!')
    .required('Email harus diisi!'),
  // username: yup
  //   .string()
  //   .test('checkUsername', 'Username sudah ada!', async (value) => {
  //     // first check
  //     if (value === undefined) return false;

  //     const token = getClientToken();
  //     const struct = {
  //       username: value.toUpperCase(),
  //     };

  //     try {
  //       await postFetcher(CHECK_USER, struct, token);
  //       return false;
  //     } catch (e) {
  //       return true;
  //     }
  //   })
  //   .required('Username harus diisi!'),
  password: yup
    .string()
    .matches(
      /^(?:(?=.*?[A-Z])(?:(?=.*?[0-9])(?=.*?[-!@#$%^&*()_[\]{},.<>+=])|(?=.*?[a-z])(?:(?=.*?[0-9])|(?=.*?[-!@#$%^&*()_[\]{},.<>+=])))|(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-!@#$%^&*()_[\]{},.<>+=]))[A-Za-z0-9!@#$%^&*()_[\]{},.<>+=-]{8,20}$/,
      'Password harus mengandung minimal 1 simbol, 1 angka, 1 huruf kapital, panjang minimal sebanyak 8 karakter dan panjang maksimal sebanyak 20 karakter!'
    )
    .required('Password harus diisi!'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Password tidak sama!')
    .required('Konfirmasi Password harus diisi!'),
  position: yup
    .string()
    .oneOf(['1', '0'], 'Posisi kelas hanya boleh A dan B!')
    .required('Posisi kelas harus diisi!'),
  sk: yup
    .boolean()
    .oneOf([true], 'Anda harus menyetujui syarat dan ketentuan!'),
});
