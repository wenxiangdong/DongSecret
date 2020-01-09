export const ROUTES = {
    UPDATE_PASSWORD: () => '/pages/setting/update-password/index',
    INDEX: () => '/pages/index/index',
    SECRET_DETAIL: (/** @type {{id: string}} */props) => {
        const query = Object
            .keys(props)
            .map(key => `${key}=${props[key]}`)
            .join('&')
        return `/pages/secret/detail/index?${query}`;
    },
}

export const COLOR_LIST = [
    "#03A9F4",
    "#4CAF50",
    "#8BC34A",
    "#FFC107",
    "#FF9800",
    "#FF7043",
]