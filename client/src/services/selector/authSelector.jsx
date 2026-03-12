import { useSelector } from 'react-redux';

export const useAuthSelector = () => {
    const authRegisterResponse = useSelector((state) => state.authRegister);
    const authLoginResponse = useSelector((state) => state.authLogin);
    const appoinmentCreateResponse = useSelector((state) => state.appoinmentCreate);
    const getAllDoctorsResponse = useSelector((state) => state.getAllDoctors);
    const getAllAppointmentsResponse = useSelector((state) => state.getAllAppointments);
    const updateAppoinmentsStatusResponse = useSelector((state) => state.updateAppoinmentsStatus);
    const getMyAppoinmentsResponse = useSelector((state) => state.getMyAppointments);
    const getDoctorAppoinmentsResponse = useSelector((state) => state.getDoctorAppoinments);
    const getAllPatientsResponse = useSelector((state) => state.getAllPatients);
    const createBillingResponse = useSelector((state) => state.createBilling);
    const getAllBillsResponse = useSelector((state) => state.getAllBills);
    const payPatientBillResponse = useSelector((state) => state.payPatientBill);
    const addDoctorsResponse = useSelector((state) => state.addDoctors);
    const deleteDoctorResponse = useSelector((state) => state.deleteDoctor);
    const deletePatientResponse = useSelector((state) => state.deletePatient);


    return {
        authRegisterResponse,
        authLoginResponse,
        appoinmentCreateResponse,
        getAllDoctorsResponse,
        getAllAppointmentsResponse,
        updateAppoinmentsStatusResponse,
        getMyAppoinmentsResponse,
        getDoctorAppoinmentsResponse,
        getAllPatientsResponse,
        createBillingResponse,
        getAllBillsResponse,
        payPatientBillResponse,
        addDoctorsResponse,
        deleteDoctorResponse,
        deletePatientResponse
    }
}