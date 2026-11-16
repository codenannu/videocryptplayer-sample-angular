# Videocrypt Player — Angular sample

Public playground for the **headless** Angular adapter. Mounts `<videocrypt-player>` and drives playback via `getPlayer()` host controls.

| | |
|--|--|
| Port | **4200** |
| Sample version | **1.2.0** |
| Repo | [videocryptplayer-sample-angular](https://github.com/codenannu/videocryptplayer-sample-angular) |
| SDK | `@codenkay/video-videocrypt-angular` · `core` (**^1.2.0**) |
| Modes | **DRM auto** via Next BFF **:3001** · **clear** (`drmMode="none"`) |

## Runtime stack

| Layer | Version |
|-------|---------|
| Node.js | **>=20.9.0** |
| Angular | **19.2.25** (v19 LTS) |
| TypeScript | ~5.8.3 |
| zone.js | ~0.15.1 |
| Video.js | ^7.21.5 |
| SDK | `@codenkay/video-videocrypt-angular@^1.2.0` (+ core) |

> This sample is **standalone**. It does **not** require cloning a private SDK monorepo. Prefer **npm** packages. Full seek/quality chrome ships for React (`@codenkay/video-videocrypt-ui`) — not in this package.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).

## SDK packages

| Package | Role | Used here |
|---------|------|-----------|
| [`@codenkay/video-videocrypt-core`](https://www.npmjs.com/package/@codenkay/video-videocrypt-core) | DRM / clear engine | Yes |
| [`@codenkay/video-videocrypt-angular`](https://www.npmjs.com/package/@codenkay/video-videocrypt-angular) | Angular standalone headless component | **Primary** |
| [`@codenkay/video-videocrypt-react`](https://www.npmjs.com/package/@codenkay/video-videocrypt-react) | React shell | No |
| [`@codenkay/video-videocrypt-ui`](https://www.npmjs.com/package/@codenkay/video-videocrypt-ui) | React control chrome | No — see [React](https://github.com/codenannu/videocryptplayer-sample-react) / [Next](https://github.com/codenannu/videocryptplayer-sample-nextjs) samples |

## Related samples

| Sample | Repository | Port | Purpose |
|--------|------------|------|---------|
| React | [videocryptplayer-sample-react](https://github.com/codenannu/videocryptplayer-sample-react) | **5173** | Full React chrome |
| Next.js + BFF | [videocryptplayer-sample-nextjs](https://github.com/codenannu/videocryptplayer-sample-nextjs) | **3001** | Playback + DRM proxies |
| **This repo** | [videocryptplayer-sample-angular](https://github.com/codenannu/videocryptplayer-sample-angular) | **4200** | Angular headless playground |

## Quick start

```bash
git clone https://github.com/codenannu/videocryptplayer-sample-angular.git
cd videocryptplayer-sample-angular
npm install
npm start
```

Requires Node.js **>=20.9.0**. Open http://localhost:4200

## BFF mode

1. Run [videocryptplayer-sample-nextjs](https://github.com/codenannu/videocryptplayer-sample-nextjs) on port **3001**.
2. Select **DRM auto** and click Play.

No secrets in this Angular app — tokens stay on the Next BFF. This origin (`http://localhost:4200`) is allowlisted in the Next sample CORS helper.

## Install peers (into your own app)

```bash
npm install @codenkay/video-videocrypt-angular@^1.2.0 @codenkay/video-videocrypt-core@^1.2.0 video.js@^7.21.5 videojs-contrib-eme@^3.11.1
# Angular 17+ (sample uses 19.2 LTS) and rxjs ^7 as peers
```

```html
<videocrypt-player
  [videoId]="videoId"
  [playback]="playback"
  [drmMode]="'auto'"
  licenseUrl="http://localhost:3001/api/drm/license"
  [certUrlBuilder]="certUrlBuilder"
  (watchTime)="save($event)"
  (ready)="onReady($event)"
  (error)="onError($event)">
</videocrypt-player>
```
