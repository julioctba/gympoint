import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '../../../services/api';

import { signInSuccess, signFailure } from './actions';

// eslint-disable-next-line consistent-return
export function* signIn({ payload }) {
  try {
    const { codigo } = payload;

    const response = yield call(api.get, `/students/${codigo}/login/mobile`);
    const { student } = response.data;

    yield put(signInSuccess(student));
  } catch (err) {
    Alert.alert(
      'Falha na autentição',
      'Houve um erro no login, Verifique seus dados'
    );
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
