import { redirectTo } from "remax/wechat";
import { ROUTES } from "../../constants";

export default function() {
    redirectTo({
        url: ROUTES.SECRET_DETAIL
    })
    return null;
}