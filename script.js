document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
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

    // 📂 Contenido de las carpetas
    const folderData = [
         {
            name: "Semana 1",
            content: "Material introductorio.",
            files: [
                {
                    name: "Documento Semana 1.pdf",
                    url: "https://drive.google.com/open?id=1zuENLjGmE0nl7p7QYSBl8L0qK9-pSXR4&usp=drive_fs"
                }
            ]
        },
        {
            name: "Semana 2",
            content: "Ejercicios básicos.",
            files: []
        },
        {
            name: "Semana 3",
            content: "Teoría avanzada.",
            files: []
        },
        {
            name: "Semana 4",
            content: "Actividades y PDF de la semana 4.",
            files: [
                {
                    name: "Actividad Semana 4.pdf",
                    url: "https://drive.google.com/file/d/1HjsDhLEqZBaoi06MIJTdN_z-joiXfe3K/view?usp=drivesdk"
                }
            ]
        }
    ];

    // 🔧 Crear carpeta
    const createFolder = (folderNumber) => {
        const folderInfo = folderData[folderNumber - 1] || {
            name: `Carpeta ${folderNumber}`,
            content: "Sin contenido disponible.",
            files: []
        };

        const folder = document.createElement('div');
        folder.classList.add('folder');
        folder.innerHTML = `
            <h3>${folderInfo.name}</h3>
            <p>${folderInfo.content}</p>
            <button class="view-btn">Ver contenido</button>
            <div class="file-list" style="display:none;"></div>
        `;
        return folder;
    };

    // 🧱 Crear 16 carpetas
    for (let i = 1; i <= 16; i++) {
        const folder = createFolder(i);
        foldersContainer.appendChild(folder);
    }

    // 🔐 Login
    loginBtn.addEventListener('click', () => {
        const user = prompt('Ingresa tu nombre de usuario:');
        const password = prompt('Ingresa tu contraseña:');

        if (user === credentials.username && password === credentials.password) {
            adminPanel.style.display = 'block';
            userSettings.style.display = 'block';
            loginBtn.style.display = 'none';

            document.getElementById('username').value = credentials.username;
            document.getElementById('password').value = credentials.password;
        } else {
            alert('❌ Credenciales incorrectas');
        }
    });

    // ➕ Agregar carpeta
    document.getElementById('add-folder-btn').addEventListener('click', () => {
        const folderNumber = foldersContainer.children.length + 1;
        const newFolder = createFolder(folderNumber);
        foldersContainer.appendChild(newFolder);
    });

    // 🗑️ Eliminar carpeta
    document.getElementById('delete-folder-btn').addEventListener('click', () => {
        if (foldersContainer.children.length > 0) {
            foldersContainer.removeChild(foldersContainer.lastElementChild);
        } else {
            alert('⚠️ No hay carpetas para eliminar');
        }
    });

    // ✏️ Editar carpeta (nombre + descripción)
    document.getElementById('edit-folder-btn').addEventListener('click', () => {
        const folderNumber = prompt('¿Qué carpeta deseas editar? (Número)');
        const folder = foldersContainer.querySelector(`.folder:nth-child(${folderNumber})`);

        if (folder) {
            const currentName = folder.querySelector('h3').textContent;
            const currentDesc = folder.querySelector('p').textContent;

            const newName = prompt('Nuevo nombre de la carpeta:', currentName);
            const newDescription = prompt('Nuevo subtítulo o descripción:', currentDesc);

            if (newName) folder.querySelector('h3').textContent = newName;
            if (newDescription) folder.querySelector('p').textContent = newDescription;

            // Actualiza también el arreglo folderData
            if (folderData[folderNumber - 1]) {
                folderData[folderNumber - 1].name = newName;
                folderData[folderNumber - 1].content = newDescription;
            }

            alert(`✅ Carpeta ${folderNumber} actualizada correctamente.`);
        } else {
            alert('⚠️ Carpeta no encontrada');
        }
    });

    // 💾 Guardar usuario y contraseña
    saveUserBtn.addEventListener('click', () => {
        const newUser = document.getElementById('username').value;
        const newPass = document.getElementById('password').value;

        credentials.username = newUser;
        credentials.password = newPass;

        alert("✅ Usuario y contraseña actualizados");
    });

    // 👁️ Ver contenido (archivos Drive)
    foldersContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('view-btn')) {
            const folder = event.target.closest('.folder');
            const index = Array.from(foldersContainer.children).indexOf(folder);
            const folderInfo = folderData[index];
            const fileList = folder.querySelector('.file-list');

            if (fileList.style.display === 'none') {
                if (folderInfo && folderInfo.files.length > 0) {
                    fileList.innerHTML = folderInfo.files
                        .map(file => `<p>📄 <a href="${file.url}" target="_blank">${file.name}</a></p>`)
                        .join('');
                } else {
                    fileList.innerHTML = "<p>No hay archivos disponibles.</p>";
                }
                fileList.style.display = 'block';
            } else {
                fileList.style.display = 'none';
            }
        }
    });
});
