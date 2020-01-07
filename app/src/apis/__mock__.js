const timeout = (duration = 1000) => new Promise(r => setTimeout(r, duration));

export const mockDecode = async (password) => {
    await timeout();
    return password;
};