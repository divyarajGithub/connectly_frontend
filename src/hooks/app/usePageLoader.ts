import { setFullPageLoader } from "@/Redux/app/appSlice"
import { useAppDispatch } from "@/Redux/store"



const usePageLoader = ()=>{
    const dispatch = useAppDispatch()

    const setPageLoader = (value : boolean)=>{
        dispatch(setFullPageLoader(value))
    }
    return {setPageLoader}
}

export default usePageLoader