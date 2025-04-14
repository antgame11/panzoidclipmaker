//Partially Generated with ChatGPT
//My attempt at creating a web app for these versions of the panzoid cm
const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const express = require('express');

const serverApp = express();
const PORT = 49329;

serverApp.use(express.static(path.join(__dirname, 'public')));
serverApp.listen(PORT, "127.69.69.240", () => {
  console.log(`Server running at http://127.69.69.240:${PORT}`);
});

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
    }
  });

  const template = [
    {
      label: 'File',
      submenu: [
        { 
            label: 'Save', 
            accelerator: 'CmdOrCtrl+S', 
            click: () => win.webContents.executeJavaScript("CM.templates.saveButton(); CM.save()")
        },
      ]
      
    },
    {
        label: 'Version',
        submenu: [
          { 
              label: 'Clip Maker 2',  
              click: () => win.loadURL(`http://127.69.69.240:${PORT}/gen2/clipmaker.html`)
          },
          { 
            label: 'Clip Maker 3',  
            click: () => win.loadURL(`http://127.69.69.240:${PORT}/gen3/clipmaker.html`)
        }
        ]
        
      },
      {
        label: 'Dev',
        submenu: [
          { 
              label: 'Open Devtools',  
              click: () => win.webContents.openDevTools()
          }
        ]
        
      }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  win.loadURL(`http://127.69.69.240:${PORT}`);
  win.setTitle("Clip Maker")
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
