import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    fileUrl: '',
};
export const urlFileSlice = createSlice({
    name: 'urlFile',
    initialState,
    reducers: {
        setUrlFile: (state, action) => {
            state.fileUrl = action.payload;
        },
    },
});

export const { setUrlFile } = urlFileSlice.actions;
export default urlFileSlice.reducer;
