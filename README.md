# videocryptplayer-angular

Standalone Angular host for `@codenkay/video-videocrypt-angular` (port **4200**).

Demonstrates:

- DRM (`drmMode="auto"`) against nextjs BFF `:3001`
- Clear MP4 (`drmMode="none"`)
- `watchTime` output, `deviceIdStorageKey`, host play/pause

```bash
cd ../videocrypt-player && npm run build:packages
cd ../videocryptplayer-angular
npm install
npm start
```
