import Home from '../pages/index/home';
import Me from '../pages/index/me';

const config = {
    pages: [
        {
            name: 'home',
            component: Home,
            icon: 'home-o',
        },
        {
            name: 'setting',
            component: Me,
            icon: 'setting-o',
        },
    ],
    selectedColor: "#07c160",
    baseUrl: "/pages/index/index"
}

export default config;