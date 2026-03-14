import { useAppDispatch } from "@/Redux/store"
import { hideSnackbar, showSnackbar } from "@/Redux/app/appSlice";

import { snackBarType } from "@/Redux/app/appSlice";

const useSnackbar = ()=>{
    const dispatch = useAppDispatch();
    
    const showToast = (type : snackBarType , message : string)=>{
        dispatch(showSnackbar({type : type , message : message}))
    }

    const hideToast = ()=>{
        dispatch(hideSnackbar())
    }

    return {showToast , hideToast}
}

export default useSnackbar