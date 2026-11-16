import { Component, ViewChild } from "@angular/core";
import { VideocryptPlayerComponent } from "@codenkay/video-videocrypt-angular";
import type {
  DrmMode,
  PlaybackCredentialConfig,
} from "@codenkay/video-videocrypt-core";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [VideocryptPlayerComponent],
  template: `
    <h1>Videocrypt Angular sample</h1>
    <p>BFF: http://localhost:3001 (or demo :3000 with CORS).</p>
    <label>
      Mode
      <select [value]="drmMode" (change)="onMode($event)">
        <option value="auto">DRM auto</option>
        <option value="none">Clear</option>
      </select>
    </label>
    <input #videoInput placeholder="Video ID" value="demo-video" [disabled]="drmMode === 'none'" />
    <button type="button" (click)="play(videoInput.value)">Play</button>
    <button type="button" (click)="playerCmp?.getPlayer()?.play()">Host play</button>
    <button type="button" (click)="playerCmp?.getPlayer()?.pause()">Host pause</button>
    @if (lastWatchTime) {
      <p>watchTime: {{ lastWatchTime.toFixed(1) }}s</p>
    }
    @if (activeId) {
      <div style="height: 360px; margin-top: 1rem">
        <videocrypt-player
          #playerCmp
          [videoId]="activeId"
          [playback]="playback"
          [autoplay]="true"
          [drmMode]="drmMode"
          [deviceIdStorageKey]="'vc_device_id'"
          licenseUrl="http://localhost:3001/api/drm/license"
          [certUrlBuilder]="certUrlBuilder"
          (watchTime)="lastWatchTime = $event"
          (error)="onError($event)"
        />
      </div>
    }
    @if (error) {
      <p style="color: crimson">{{ error }}</p>
    }
  `,
})
export class AppComponent {
  @ViewChild("playerCmp") playerCmp?: VideocryptPlayerComponent;
  activeId: string | null = null;
  drmMode: DrmMode = "auto";
  lastWatchTime = 0;
  error = "";

  certUrlBuilder = (siteId: string) =>
    `http://localhost:3001/api/drm/cert?siteId=${encodeURIComponent(siteId)}`;

  playback: PlaybackCredentialConfig = {
    getSource: async (ctx) => {
      if (this.drmMode === "none") {
        return {
          fileUrl:
            "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
          protection: "none",
        };
      }
      const res = await fetch("http://localhost:3001/api/playback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          videoId: ctx.videoId,
          deviceType: ctx.dType,
          deviceId: ctx.deviceId,
          deviceName: ctx.deviceName,
          version: ctx.version,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "failed");
      return {
        fileUrl: json.fileUrl,
        token: json.token,
        siteId: json.siteId,
        protection: "drm",
      };
    },
  };

  onMode(event: Event) {
    this.drmMode = (event.target as HTMLSelectElement).value as DrmMode;
    this.activeId = null;
  }

  play(videoId: string) {
    this.error = "";
    this.activeId = this.drmMode === "none" ? "clear-demo" : videoId.trim();
  }

  onError(err: { message?: string }) {
    this.error = err?.message || "Player error";
  }
}
