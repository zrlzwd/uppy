const path = require('path')
const fs = require('fs')
const router = require('router')
const budo = require('budo')
const S3 = require('aws-sdk/clients/s3')

// CONFIG: Set these to a valid region and bucket
const REGION = 'eu-west-2'
const BUCKET = 'uppy-test'
// Directory to store uploaded files in.
const DIRECTORY = 'aws-presigned-url-node'

const PORT = process.env.PORT || 8080

const s3 = new S3({
  region: REGION,
  signatureVersion: 'v4'
})
const app = router()
app.use(require('body-parser').json())

app.post('/s3-sign', (req, res, next) => {
  const { filename, contentType } = req.body

  s3.getSignedUrl('putObject', {
    Bucket: BUCKET,
    Key: `${DIRECTORY}/${filename}`,
    ACL: 'public-read',
    ContentType: contentType
  }, (err, url) => {
    if (err) return next(err)
    res.end(JSON.stringify({
      method: 'PUT',
      url,
      fields: {}
    }))
  })
})

app.get('/uppy.min.css', (req, res, next) => {
  fs.createReadStream(path.join(__dirname, '../../dist/uppy.min.css'))
    .on('error', next)
    .pipe(res)
})

// Start the development server, budo.
budo(path.join(__dirname, 'main.js'), {
  live: true,
  stream: process.stdout,
  port: PORT,
  middleware: app,
  browserify: {
    transform: [
      'babelify',
      ['aliasify', {
        replacements: {
          '^uppy/lib/(.*?)$': path.join(__dirname, '../../src/$1')
        }
      }]
    ]
  }
})
