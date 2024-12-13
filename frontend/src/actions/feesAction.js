export const setFeesModal = (modal) => ({
    type: 'SET_FEES_MODAL',
    payload: modal,
});
export const setRefresh = (email) => ({
    type: 'SET_REFRESH',
    payload: email,
});

export const setResetPasswordModal = (email) => ({
    type: 'SET_RESET_PASSWORD_MODAL',
    payload: email,
});