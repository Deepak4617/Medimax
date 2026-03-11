import { combineReducers } from "redux";
import * as auth from './auth';
import * as patient from './patient';
import * as doctor from './doctor';
import * as billing from './billing';
// import * as EncryptedKey from '../constants/encryptedRootReducerKeys';

export const rootReducer = combineReducers({

    authRegister: auth?.authRegisterSlice,
    authLogin: auth?.authLoginSlice,

    appoinmentCreate: patient?.appoinmentCreateSlice,
    getMyAppointments: patient?.getMyAppointmentsSlice,
    getAllPatients: patient?.getAllPatientsSlice,
    deletePatient: patient?.deletePatientSlice,

    getAllDoctors: doctor?.getAllDoctorsSlice,
    getAllAppointments: doctor?.getAllAppointmentsSlice,
    updateAppointmentStatusSlice: doctor?.updateAppoinmentsStatus,
    getDoctorAppoinmentsSlice: doctor?.getDoctorAppointments,
    addDoctors: doctor?.addDoctorsSlice,
    deleteDoctor: doctor?.deleteDoctorSlice,

    createBilling: billing?.createBillingSlice,
    getAllBills: billing?.getAllBillsSlice,
    payPatientBill: billing?.payPatientBillSlice



})