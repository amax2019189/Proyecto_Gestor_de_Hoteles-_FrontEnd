export const validateRole = (roleUser) => {
    return roleUser.length >= 4 && roleUser.length <= 10
}

export const roleValidateMessage = 'El rol debe de ser alguno de los siguientes admin, user, hotel'