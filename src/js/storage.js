export function getUsers() {
    const date = localStorage.getItem('users');
    return date ? JSON.parse(date) : [];
}

export function registerUser(newUser) {
    const users = getUsers();

    const exists = users.find(user => user.email === newUser.email);
    if (exists) {
        return { success: false, message: "Correo electrónico ya registrado" };
    }

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    return { success: true, message: "Usuario registrado exitosamente" };
}

export function loginUser(email, password) {
    const users = getUsers();
    const foundUser = users.find(user => user.email === email && user.password === password);

    return foundUser || null;
}