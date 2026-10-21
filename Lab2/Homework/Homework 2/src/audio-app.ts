
import { AudioTaskQueue } from './audio-queue-controller';
import { AudioEngine } from './audio-engine';
import { AudioVisualizer } from './audio-visualizer';

type Track = {
  name: string;
  buffer: AudioBuffer;
};

export function initializeAudioApp(): void {
  const fileInput = document.querySelector<HTMLInputElement>('#audio-files');
  const playButton = document.querySelector<HTMLButtonElement>('#play-button');
  const stopButton = document.querySelector<HTMLButtonElement>('#stop-button');
  const cancelButton = document.querySelector<HTMLButtonElement>('#cancel-button');
  const status = document.querySelector<HTMLElement>('#audio-status');
  const playbackState = document.querySelector<HTMLElement>('#playback-state');
  const queueCount = document.querySelector<HTMLElement>('#queue-count');
  const queueList = document.querySelector<HTMLOListElement>('#queue-list');
  const canvas = document.querySelector<HTMLCanvasElement>('#audio-canvas');

  if (
    !fileInput || !playButton || !stopButton || !cancelButton ||
    !status || !playbackState || !queueCount || !queueList || !canvas
  ) {
    throw new Error('Required audio UI elements not found');
  }

  const engine = new AudioEngine();
  const queue = new AudioTaskQueue(engine.getContext());
  const visualizer = new AudioVisualizer(canvas, engine.getAnalyser());

  const tracks: Track[] = [];
  const objectUrls = new Set<string>();

  let currentTrackIndex = 0;
  let isPlaying = false;
  let isLoading = false;
  let sessionId = 0;

  function setStatus(message: string): void {
    status!.textContent = message;
  }

  function updateUI(): void {
    const remaining = Math.max(
      0,
      tracks.length - currentTrackIndex - (isPlaying ? 1 : 0)
    );

    queueCount!.textContent =
      `${String(remaining).padStart(2, '0')} PENDING`;

    playButton!.disabled = tracks.length === 0 || isLoading || isPlaying;
    stopButton!.disabled = !isPlaying;
    cancelButton!.disabled =
    !isLoading &&
    !isPlaying &&
    tracks.length === 0;

    playbackState!.textContent = isPlaying
      ? 'PLAYING'
      : isLoading
        ? 'PROCESSING'
        : 'STANDBY';

    queueList!.replaceChildren();

    if (tracks.length === 0) {
      const empty = document.createElement('li');
      empty.className = 'queue-empty';
      empty.textContent = isLoading
        ? 'Processing audio files...'
        : 'Your queue is empty.';
      queueList!.appendChild(empty);
      return;
    }

    tracks.forEach((track, index) => {
      const item = document.createElement('li');
      const name = document.createElement('span');
      const state = document.createElement('span');

      name.textContent = track.name;

      if (index < currentTrackIndex) {
        state.textContent = 'DONE';
      } else if (index === currentTrackIndex && isPlaying) {
        state.textContent = 'PLAYING';
      } else if (index === currentTrackIndex) {
        state.textContent = 'READY';
      } else if (index === currentTrackIndex + 1) {
        state.textContent = 'NEXT';
      } else {
        state.textContent = 'WAITING';
      }

      state.className = 'track-state';

      item.className = 'queue-item';
      item.append(name, state);
      queueList!.appendChild(item);
    });
  }

  async function playCurrentTrack(): Promise<void> {
    if (currentTrackIndex >= tracks.length) {
      isPlaying = false;
      visualizer.stop();

      setStatus('All tracks finished.');
      updateUI();
      return;
    }

    const track = tracks[currentTrackIndex];
    const playbackSession = sessionId;

    try {
      await engine.play(track.buffer);

      // Tránh cập nhật UI nếu người dùng đã chọn phiên khác.
      if (playbackSession !== sessionId) {
        engine.stop();
        return;
      }

      isPlaying = true;
      visualizer.start();

      setStatus(`Now playing: ${track.name}`);
      updateUI();
    } catch (error) {
      console.error('[APP] Playback failed:', error);
      isPlaying = false;
      visualizer.stop();
      setStatus(`Unable to play: ${track.name}`);
      updateUI();
    }
  }

  // Khi bài hát kết thúc tự nhiên, chuyển sang bài kế tiếp.
  engine.setOnTrackEnded(() => {
    if (!isPlaying) return;

    currentTrackIndex++;
    isPlaying = false;

    if (currentTrackIndex < tracks.length) {
      void playCurrentTrack();
    } else {
      visualizer.stop();
      setStatus('Playlist completed.');
      updateUI();
    }
  });

  fileInput.addEventListener('change', async () => {
    const files = Array.from(fileInput.files ?? []);

    if (files.length === 0) return;

    sessionId++;
    const currentSession = sessionId;

    queue.cancelPending();
    queue.cancelActive();

    engine.stop();
    visualizer.stop();

    tracks.length = 0;
    currentTrackIndex = 0;
    isPlaying = false;
    isLoading = true;

    for (const url of objectUrls) {
      URL.revokeObjectURL(url);
    }
    objectUrls.clear();

    setStatus(`Processing ${files.length} audio file(s)...`);
    updateUI();

    const tasks = files.map((file) => {
      const url = URL.createObjectURL(file);
      objectUrls.add(url);

      return {
        name: file.name,
        promise: queue.enqueue(url),
      };
    });

    const results = await Promise.allSettled(
      tasks.map((task) => task.promise)
    );

    if (currentSession !== sessionId) return;

    for (let i = 0; i < results.length; i++) {
      const result = results[i];

      if (result.status === 'fulfilled') {
        tracks.push({
          name: tasks[i].name,
          buffer: result.value,
        });
      }
    }

    isLoading = false;

    if (tracks.length > 0) {
      setStatus(`${tracks.length} track(s) ready. Press PLAY.`);
    } else {
      setStatus('No audio files could be decoded.');
    }

    updateUI();
  });

  playButton.addEventListener('click', () => {
    if (tracks.length === 0 || isPlaying || isLoading) return;

    if (currentTrackIndex >= tracks.length) {
      currentTrackIndex = 0;
    }

    void playCurrentTrack();
  });

  stopButton.addEventListener('click', () => {
    engine.stop();
    visualizer.stop();

    isPlaying = false;
    setStatus('Playback stopped.');
    updateUI();
  });

  cancelButton.addEventListener('click', () => {
  // Vô hiệu hóa kết quả của phiên xử lý cũ
  sessionId++;

  // Hủy tác vụ đang chạy và các tác vụ đang chờ
  queue.cancelPending();
  queue.cancelActive();

  // Dừng âm thanh và animation
  engine.stop();
  visualizer.stop();

  // Xóa danh sách nhạc
  tracks.length = 0;
  currentTrackIndex = 0;

  // Giải phóng các Object URL
  for (const url of objectUrls) {
    URL.revokeObjectURL(url);
  }

  objectUrls.clear();

  // Reset trạng thái
  isPlaying = false;
  isLoading = false;

  // Cho phép chọn lại cùng một file
  fileInput!.value = '';

  setStatus('Queue cleared. Ready for new audio.');
  updateUI();

  console.log('[QUEUE] All tasks cancelled and cleared');
});

  window.addEventListener('resize', () => {
    visualizer.resize();
  });

  window.addEventListener(
    'beforeunload',
    () => {
      sessionId++;

      queue.cancelPending();
      queue.cancelActive();

      visualizer.dispose();

      for (const url of objectUrls) {
        URL.revokeObjectURL(url);
      }

      void engine.dispose();
    },
    { once: true }
  );

  updateUI();
}
