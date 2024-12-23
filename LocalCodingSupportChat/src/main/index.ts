import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import icon from '../../resources/app_icon.png?asset'
import { ChatModel } from './model/ChatModel'

const chatModel = new ChatModel()

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : { icon }),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('localcodingsupport')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

ipcMain.handle('chatApi:getChats', async () => chatModel.getChats())
ipcMain.handle('chatApi:getChatById', async (_, id: string) => chatModel.getChatById(id))
ipcMain.handle('chatApi:createNewChat', async (_, title: string) => chatModel.createNewChat(title))
ipcMain.handle('chatApi:editChatTitleOf', async (_, id: string, title: string) =>
  chatModel.editChatTitleOf(id, title)
)
ipcMain.handle('chatApi:queryChat', async (event, id: string, message: string) => {
  try {
    const iterable = await chatModel.queryChat(id, message)
    for await (const chunk of iterable) {
      event.sender.send('chatApi:queryChat:response', { err: false, end: false, id, chunk })
    }
    event.sender.send('chatApi:queryChat:response', { err: false, end: true, id, chunk: null })
  } catch {
    event.sender.send('chatApi:queryChat:response', { err: true, end: true, id, chunk: null })
  }
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
