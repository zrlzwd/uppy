const Uppy = require('@uppy/core')
const Dashboard = require('@uppy/dashboard')
const GoogleDrive = require('@uppy/google-drive')
const Dropbox = require('@uppy/dropbox')
const Instagram = require('@uppy/instagram')
const Url = require('@uppy/url')
const Webcam = require('@uppy/webcam')
const Tus = require('@uppy/tus')

const UPPY_SERVER = require('../env')

function uppyInit () {
  if (window.uppy) {
    window.uppy.close()
  }

  const opts = window.uppyOptions
  const dashboardEl = document.querySelector('.UppyDashboard')
  if (dashboardEl) {
    const dashboardElParent = dashboardEl.parentNode
    dashboardElParent.removeChild(dashboardEl)
  }

  const restrictions = {
    maxFileSize: 1000000,
    maxNumberOfFiles: 3,
    minNumberOfFiles: 2,
    allowedFileTypes: ['image/*', 'video/*']
  }

  const uppy = Uppy({
    debug: true,
    autoProceed: opts.autoProceed,
    restrictions: opts.restrictions ? restrictions : ''
  })

  uppy.use(Dashboard, {
    trigger: '.UppyModalOpenerBtn',
    inline: opts.DashboardInline,
    target: opts.DashboardInline ? '.DashboardContainer' : 'body',
    replaceTargetContent: opts.DashboardInline,
    note: opts.restrictions ? 'Images and video only, 2–3 files, up to 1 MB' : '',
    height: 470,
    showProgressDetails: true,
    metaFields: [
      { id: 'name', name: 'Name', placeholder: 'file name' },
      { id: 'caption', name: 'Caption', placeholder: 'add description' }
    ],
    browserBackButtonClose: opts.browserBackButtonClose
  })

  if (opts.GoogleDrive) {
    uppy.use(GoogleDrive, { target: Dashboard, serverUrl: UPPY_SERVER })
  }

  if (opts.Dropbox) {
    uppy.use(Dropbox, { target: Dashboard, serverUrl: UPPY_SERVER })
  }

  if (opts.Instagram) {
    uppy.use(Instagram, { target: Dashboard, serverUrl: UPPY_SERVER })
  }

  if (opts.Url) {
    uppy.use(Url, { target: Dashboard, serverUrl: UPPY_SERVER })
  }

  if (opts.Webcam) {
    uppy.use(Webcam, { target: Dashboard })
  }

  uppy.use(Tus, { endpoint: 'https://master.tus.io/files/', resume: true })

  uppy.on('complete', result => {
    console.log('successful files:')
    console.log(result.successful)
    console.log('failed files:')
    console.log(result.failed)
  })
}

uppyInit()
window.uppyInit = uppyInit
