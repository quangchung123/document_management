import get from 'lodash.get'
import {useAppSelector} from "@/store";

const UseGetStore = (path: string, data?: any) => {
    // eslint-disable-next-line
    let selector = useAppSelector(state => get(state, path) || get(data, path));
    return selector
};

export default UseGetStore;