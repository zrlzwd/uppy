# Uppy + AWS S3 Example

This example uses a server-side Node.js endpoint to sign uploads to S3.

## Running It

Configure AWS S3 credentials using [environment variables](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-environment.html) or a [credentials file in `~/.aws/credentials`](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-shared.html).
Configure a bucket name and region at the top of the `serve.js` file.

Then install npm dependencies using

```bash
npm install
```

and start the demo server using

```bash
npm start
```

The demo should now be available at http://localhost:8080.

Optionally, provide a port in the `PORT` environment variable if 8080 is in use:

```bash
PORT=8081 npm start
```
