document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const adminPanel = document.getElementById('admin-panel');
    const foldersContainer = document.getElementById('folders-container');
    const userSettings = document.getElementById('user-settings');
    const saveUserBtn = document.getElementById('save-user-btn');

    // Usuario y contraseña iniciales
    let credentials = {
        username: "admin",
        password: "1234"
    };

    // Crear carpetas dinámicamente
    const createFolder = (folderNumber) => {
        const folder = document.createElement('div');
        folder.classList.add('folder');
        folder.innerHTML = `
            <h3>Carpeta ${folderNumber}</h3>
            <p>Contenido de la carpeta ${folderNumber}</p>
            <button>Ver contenido</button>
        `;
        return folder;
    };

    for (let i = 1; i <= 16; i++) {
        const folder = createFolder(i);
        foldersContainer.appendChild(folder);
    }

    // Simular Login
    loginBtn.addEventListener('click', () => {
        const user = prompt('Ingresa tu nombre de usuario:');
        const password = prompt('Ingresa tu contraseña:');

        if (user === credentials.username && password === credentials.password) {
            adminPanel.style.display = 'block';
            userSettings.style.display = 'block';
            loginBtn.style.display = 'none';

            // Mostrar credenciales actuales en los inputs
            document.getElementById('username').value = credentials.username;
            document.getElementById('password').value = credentials.password;
        } else {
            alert('❌ Credenciales incorrectas');
        }
    });

    // Botón: Agregar carpeta
    document.getElementById('add-folder-btn').addEventListener('click', () => {
        const folderNumber = foldersContainer.children.length + 1;
        const newFolder = createFolder(folderNumber);
        foldersContainer.appendChild(newFolder);
    });

    // Botón: Eliminar carpeta
    document.getElementById('delete-folder-btn').addEventListener('click', () => {
        if (foldersContainer.children.length > 0) {
            foldersContainer.removeChild(foldersContainer.lastElementChild);
        } else {
            alert('⚠️ No hay carpetas para eliminar');
        }
    });

    // Botón: Editar carpeta
    document.getElementById('edit-folder-btn').addEventListener('click', () => {
        const folderNumber = prompt('¿Qué carpeta deseas editar? (Número)');
        const folder = foldersContainer.querySelector(`.folder:nth-child(${folderNumber})`);
        if (folder) {
            const newContent = prompt('Nuevo contenido:');
            folder.querySelector('p').textContent = newContent;
        } else {
            alert('⚠️ Carpeta no encontrada');
        }
    });

    // Guardar cambios de usuario y contraseña
    saveUserBtn.addEventListener('click', () => {
        const newUser = document.getElementById('username').value;
        const newPass = document.getElementById('password').value;

        credentials.username = newUser;
        credentials.password = newPass;

        alert("✅ Usuario y contraseña actualizados");
    });
});
